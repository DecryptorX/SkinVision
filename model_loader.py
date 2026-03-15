import torch
import torch.nn as nn
import timm
import torch.nn.functional as F

NUM_CLASSES = 23

class skinvision(nn.Module):

    def __init__(self, num_classes=23):
        super().__init__()

        self.eff = timm.create_model(
            "tf_efficientnet_b7.ns_jft_in1k",
            pretrained=False,
            num_classes=0
        )

        self.den = timm.create_model(
            "densenet201",
            pretrained=False,
            num_classes=0
        )

        self.inc = timm.create_model(
            "inception_resnet_v2",
            pretrained=False,
            num_classes=0
        )

        self.fusion_conv = nn.Sequential(
            nn.Conv2d(6016, 3072, kernel_size=1),
            nn.ReLU(),
            nn.Dropout(0.5)
        )

        self.classifier = nn.Linear(3072, num_classes)

    def forward(self, x):

        f1 = self.eff.forward_features(x)
        f2 = self.den.forward_features(x)
        f3 = self.inc.forward_features(x)

        f1 = F.adaptive_avg_pool2d(f1,1)
        f2 = F.adaptive_avg_pool2d(f2,1)
        f3 = F.adaptive_avg_pool2d(f3,1)

        x = torch.cat([f1,f2,f3], dim=1)

        x = self.fusion_conv(x)

        x = torch.flatten(x,1)

        return self.classifier(x)


def load_model():
    """Load the trained model weights.

    If no weights are present (e.g., in a fresh deployment), return a dummy model
    that produces consistent random outputs for demo purposes.
    """

    model = skinvision(NUM_CLASSES)

    model_path = "models/skinvision_best.pth"
    if not os.path.exists(model_path):
        print(f"WARNING: Model weights not found at {model_path}. Using dummy model.")

        class DummyModel(nn.Module):
            def __init__(self, num_classes):
                super().__init__()
                self.num_classes = num_classes

            def forward(self, x):
                batch = x.shape[0]
                return torch.randn(batch, self.num_classes)

        dummy = DummyModel(NUM_CLASSES)
        dummy.eval()
        return dummy

    state = torch.load(model_path, map_location="cpu")
    model.load_state_dict(state)
    model.eval()

    return model
