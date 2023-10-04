from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

import os
import sys

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
        filename = secure_filename(file.filename)
        print(f'File received: {filename}')
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # TODO: Aqui botar a função para classificar a imagem enviada e trocar o retorno para o resultado da classificação
        return jsonify({'message': 'File received and saved'}), 200

if __name__ == '__main__':
    app.run()
