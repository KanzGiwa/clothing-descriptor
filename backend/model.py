from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
import numpy as np
#streamlit run app.py
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
    scores = [p[2] for p in preds]
    main_label = labels[0]
    main_score = scores[0]

    # Choose a template based on confidence and label
    if main_score > 0.7:
        desc = f"This looks like a classic {main_label}, ideal for making a statement."
    elif "shirt" in main_label or "t-shirt" in main_label or "jersey" in main_label:
        desc = f"A comfortable {main_label} that's perfect for casual outings."
    elif "dress" in main_label or "gown" in main_label:
        desc = f"An elegant {main_label} that adds a touch of sophistication."
    elif "coat" in main_label or "jacket" in main_label or "blazer" in main_label:
        desc = f"A stylish {main_label} to keep you warm and fashionable."
    elif "jean" in main_label or "pant" in main_label or "trouser" in main_label or "shorts" in main_label:
        desc = f"Trendy {main_label} for a relaxed and modern look."
    elif "shoe" in main_label or "sneaker" in main_label or "boot" in main_label:
        desc = f"Step out in style with these {main_label}s."
    else:
        desc = f"A unique {main_label} that stands out in any wardrobe."

    # Add secondary label if confidence is close
    if len(labels) > 1 and scores[1] > 0.2:
        desc += f" It also has elements of a {labels[1]}."

    hashtags = " ".join([f"#{label.replace(' ', '')}" for label in labels])
    full_desc = desc + " " + hashtags
    print("[DEBUG] Generated description:", full_desc)
    return full_desc

