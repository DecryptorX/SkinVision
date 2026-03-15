from PIL import Image
from predict import predict_image

img = Image.open("skin3.png").convert("RGB")

idx, prob = predict_image(img)

print(idx)
print(prob)
