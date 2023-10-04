import numpy as np
import os
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.optimizers import Adam

# Defina os caminhos para os conjuntos de dados de treinamento, teste e validação
train_data_dir = '../images/train'
test_data_dir = '../images/test'
valid_data_dir = '../images/val'

# Defina os parâmetros
batch_size = 32
image_size = (224, 224)
epochs = 10

# Use o ImageDataGenerator para pré-processar os dados
train_datagen = ImageDataGenerator(
    rescale=1.0/255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

test_datagen = ImageDataGenerator(rescale=1.0/255)

train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical'
)

validation_generator = test_datagen.flow_from_directory(
    valid_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical'
)

# Verifique se o modelo treinado já existe
model_path = '../treined-model/skin_disease_model.h5'

if not os.path.exists(model_path):
    print('Modelo treinado ainda não existe!')
    # Defina o modelo de rede neural convolucional
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Flatten(),
        Dense(128, activation='relu'),
        # Altere para o número de classes que você possui
        Dense(8, activation='softmax')
    ])

    # Compile o modelo
    model.compile(
        loss='categorical_crossentropy',
        optimizer=Adam(learning_rate=0.0001),
        metrics=['accuracy']
    )

    # Treine o modelo
    model.fit(
        train_generator,
        steps_per_epoch=len(train_generator),
        epochs=epochs,
        validation_data=validation_generator,
        validation_steps=len(validation_generator)
    )

    # Salve o modelo treinado
    model.save(model_path)
else:
    print('Modelo treinado existe -> Carregando modelo...')
    # Carregue o modelo treinado
    model = load_model(model_path)

# Carregue uma imagem de teste
test_image_path = '../images/train/Basal cell carcinoma/ISIC_0024345.jpg'
test_image = image.load_img(test_image_path, target_size=image_size)
test_image = image.img_to_array(test_image)
test_image = np.expand_dims(test_image, axis=0)
# Realize o mesmo pré-processamento que foi feito nos dados de treinamento
test_image = test_image / 255.0

# Faça a previsão usando o modelo treinado
prediction = model.predict(test_image)

# Converta a saída para a classe prevista
predicted_class = np.argmax(prediction, axis=1)

# Mapeie a classe prevista para a classe real (você pode ter um dicionário de mapeamento)
class_mapping = {0: 'Actinic keratosis', 1: 'Basal cell carcinoma', 2: 'Benign keratosis', 3: 'Dermatofibroma',
                 4: 'Melanocytic nevus', 5: 'Melanoma', 6: 'Squamous cell carcinoma', 7: 'Vascular lesion'}
predicted_class_name = predicted_class

print(f'A imagem é classificada como: {predicted_class_name}')
