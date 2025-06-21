from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
import numpy as np

model = MobileNetV2(weights='imagenet')

def extract_features(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = model.predict(x)
    return decode_predictions(preds, top=3)[0]

def generate_description(preds):
    labels = [p[1].replace('_', ' ') for p in preds]
    desc = f"A trendy {labels[0]} perfect for everyday wear. "
    hashtags = " ".join([f"#{label.replace(' ', '')}" for label in labels])
    return desc + hashtags
