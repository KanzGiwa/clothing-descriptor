from flask import Flask, request, jsonify
from flask_cors import CORS
from model import extract_features, generate_description
import os
import traceback
import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/api/describe', methods=['POST'])
def describe():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    img_file = request.files['image']
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
            img_file.save(tmp.name)
            preds = extract_features(tmp.name)
            description = generate_description(preds)
        os.remove(tmp.name)
        return jsonify({'description': description})
    except Exception as e:
        traceback.print_exc()
        # Attempt to remove temp file if it exists
        try:
            if 'tmp' in locals() and os.path.exists(tmp.name):
                os.remove(tmp.name)
        except Exception:
            pass
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
