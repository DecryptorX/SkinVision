import torch
from PIL import Image
import torchvision.transforms as transforms
from model_loader import load_model

transform = transforms.Compose([
    transforms.Resize((384,384)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

def predict_image(image):
    model = load_model()

    img = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(img)

    probs = torch.softmax(output, dim=1)

    top3_prob, top3_idx = torch.topk(probs, 3)

    top3_prob = top3_prob[0].tolist()
    top3_idx = top3_idx[0].tolist()

    return top3_idx, top3_prob
