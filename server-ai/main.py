from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

import os

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
        MODEL_PATH = './trained-model/Skin Disease Clssification-81.32.h5'

        filename = secure_filename(file.filename)
        image_path = f'./uploads/{filename}'
        print(f'File received: {filename}')
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        classification, accuracy = process_image(image_path, MODEL_PATH)
        os.remove(f'./uploads/{filename}')
        return jsonify({'classification': classification, 'accuracy': accuracy}), 200

if __name__ == '__main__':
    app.run()
