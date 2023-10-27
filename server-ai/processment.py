import os
import numpy as np
import tensorflow as tf

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

image_size = (150, 150)

CLASS_MAPPING = {0: 'Actinic keratosis', 1: 'Basal cell carcinoma', 2: 'Benign keratosis', 3: 'Dermatofibroma', 4: 'Melanocytic nevus', 5: 'Melanoma', 6: 'Squamous cell carcinoma', 7: 'Vascular lesion'}

def process_image(image_path, model_path):
    if not os.path.exists(model_path):
        return 'Nenhum modelo de inteligência artificial encontrado.'

    # Load the model
    model = load_model(model_path)

    # Load and preprocess the image
    process_image = image.load_img(image_path, target_size=image_size)
    process_image = image.img_to_array(process_image)
    process_image = np.expand_dims(process_image, axis=0)
    process_image = preprocess_input(process_image)

    # Make a prediction
    prediction = model.predict(process_image)
    predicted_class = np.argmax(prediction, axis=1)
    predicted_probability = np.max(prediction)
    predicted_class_name = CLASS_MAPPING[predicted_class[0]]
    predicted_probability_str = str(predicted_probability)

    return predicted_class_name, predicted_probability_str
