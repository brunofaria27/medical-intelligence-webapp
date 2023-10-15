from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

import os
import sys

from processment import process_image

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
cors = CORS(app, support_credentials=True)

@app.route('/predict', methods=['POST'])
@cross_origin(supports_credentials=True)
def image_upload():
    if 'image' not in request.files:
        print('No file part')
        return jsonify({'message': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        print('No selected file')
        return jsonify({'message': 'No selected file'}), 400
    if file:
        CLASS_MAPPING = {0: 'Actinic keratosis', 1: 'Basal cell carcinoma', 2: 'Benign keratosis', 3: 'Dermatofibroma', 4: 'Melanocytic nevus', 5: 'Melanoma', 6: 'Squamous cell carcinoma', 7: 'Vascular lesion'}
        IMAGE_SIZE = (224, 224)
        MODEL_PATH = './treined-model/skin_disease_model.h5'

        filename = secure_filename(file.filename)
        image_path = f'./uploads/{filename}'
        print(f'File received: {filename}')
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        classification = process_image(image_path, MODEL_PATH, IMAGE_SIZE, CLASS_MAPPING)
        os.remove(f'./uploads/{filename}')
        return jsonify({'classification': classification}), 200

if __name__ == '__main__':
    app.run()
