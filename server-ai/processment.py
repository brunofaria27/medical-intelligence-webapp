import os
import numpy as np
import tensorflow as tf

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


def process_image(image_path, model_path, image_size, CLASS_MAPPING):
    if not os.path.exists(model_path):
        return 'Nenhum modelo de inteligência artificial encontrado.'
    model = load_model(model_path)
    process_image = image.load_img(image_path, target_size=image_size)
    process_image = image.img_to_array(process_image)
    process_image = np.expand_dims(process_image, axis=0)
    process_image = process_image / 255.0
    prediction = model.predict(process_image)
    predicted_class = np.argmax(prediction, axis=1)
    return CLASS_MAPPING[predicted_class[0]]
