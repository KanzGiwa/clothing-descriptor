# Clothing-Descriptor

A web application that generates trendy clothing descriptions and hashtags from uploaded images using deep learning.

## Features

- Upload an image of clothing.
- Get an AI-generated description and relevant hashtags.
- Clean, modern React frontend.
- Python backend powered by TensorFlow and Flask.

## Folder Structure

```text
clothing-describer/
│
├── backend/
│   ├── app.py         # Flask API server for image analysis
│   ├── model.py       # Deep learning model and description logic
│   └── ...            # Other backend files
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js     # Main React component
│       └── index.js   # React entry point
│   └── package.json
│   └── ...            # Other frontend files
│
└── README.md
```

## How It Works

This project uses a **React** frontend for a seamless user experience and a **Flask** backend to handle image processing and AI inference.

- Users upload a clothing image via the React UI.
- The image is sent to the Flask backend (`/api/describe` endpoint).
- The backend uses a pre-trained MobileNetV2 model (via TensorFlow/Keras) to extract features and generate a description and hashtags.
- The description and hashtags are returned to the frontend and displayed to the user.

## Getting Started

### Backend (Flask + TensorFlow)

1. Install dependencies:
   ```
   pip install flask flask-cors tensorflow pillow
   ```
2. Start the backend server:
   ```
   cd backend
   python app.py
   ```
   The backend will run at `http://localhost:5000`.

### Frontend (React)

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start the React development server:
   ```
   npm start
   ```
   The frontend will run at `http://localhost:3000`.

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Upload a clothing image (JPG, JPEG, or PNG).
3. Click "Generate Description" to receive an AI-generated description and hashtags for your clothing item.
4. Use the "Reset" button to clear the form and upload a new image.

## Technologies Used

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Flask, Flask-CORS, TensorFlow/Keras, Pillow
- **Model:** MobileNetV2 (pre-trained on ImageNet)

## Notes

- The React frontend communicates with the Flask backend via the `/api/describe` endpoint.
- Make sure both servers are running for full functionality.
- For production, build the React app with `npm run build` and serve it with a production server.
- The backend currently uses a simple image classifier and generates basic descriptions; you can extend `model.py` for more advanced features.

## License

MIT License

## Author

Created by Kanzg.

