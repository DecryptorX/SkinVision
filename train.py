import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from tqdm import tqdm

from model_loader import skinvision

torch.backends.cudnn.benchmark = True
scaler = torch.amp.GradScaler("cuda")
# device (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# training parameters
BATCH_SIZE = 2
EPOCHS = 10
LR = 0.0003

# transforms
train_transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

test_transform = transforms.Compose([
    transforms.Resize((384,384)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

# datasets
train_dataset = ImageFolder(r"D:\Ishan\dataset\train", transform=train_transform)
test_dataset = ImageFolder(r"D:\Ishan\dataset\test", transform=test_transform)


# dataloaders
train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

NUM_CLASSES = len(train_dataset.classes)

# model
model = skinvision(NUM_CLASSES).to(device)

# loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=LR)

best_acc = 0

for epoch in range(EPOCHS):

    print(f"\nEpoch {epoch+1}/{EPOCHS}")

    model.train()
    total_loss = 0

    for images, labels in tqdm(train_loader):
    
        # move data to GPU
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        # mixed precision
        with torch.amp.autocast("cuda"):
            outputs = model(images)
            loss = criterion(outputs, labels)

        scaler.scale(loss).backward()
        scaler.step(optimizer)
        scaler.update()

        total_loss += loss.item()

    print("Training Loss:", total_loss)

    # evaluation
    model.eval()

    correct = 0
    total = 0

    with torch.no_grad():

        for images, labels in test_loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            _, predicted = torch.max(outputs, 1)

            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    accuracy = correct / total

    print("Validation Accuracy:", accuracy)

    # save best model
    if accuracy > best_acc:

        best_acc = accuracy

        torch.save(
            model.state_dict(),
            "models/skinvision_best.pth"
        )

        print("Saved new best model!")
