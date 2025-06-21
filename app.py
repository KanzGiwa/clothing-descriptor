import streamlit as st
from model import extract_features, generate_description
from PIL import Image
import os

st.set_page_config(page_title="Clothing Description Generator", layout="centered")
st.title("👕 Clothing Description Generator")

uploaded_file = st.file_uploader("Upload an image of clothing", type=["jpg", "jpeg", "png"])

if uploaded_file:
    with open("temp.jpg", "wb") as f:
        f.write(uploaded_file.read())
    
    st.image(Image.open("temp.jpg"), caption="Uploaded Image", use_column_width=True)

    with st.spinner("Analyzing..."):
        preds = extract_features("temp.jpg")
        description = generate_description(preds)

    st.subheader("📝 Generated Description:")
    st.success(description)
