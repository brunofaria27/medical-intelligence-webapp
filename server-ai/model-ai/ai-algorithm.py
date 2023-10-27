import tensorflow as tf
import os

from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adamax
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Identificando as GPUs disponíveis para paralelização
gpus = tf.config.experimental.list_physical_devices('GPU')
print(gpus)
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True) # Alocação de memória da GPU com crescimento dinâmico
            print(f"Nome da GPU: {gpu.name}")
        #Estratégia para distribuir o treinamento do modelo em várias GPUs
        strategy = tf.distribute.MirroredStrategy()
        print('Número de dispositivos: {}'.format(strategy.num_replicas_in_sync))
    except RuntimeError as e:
        print(e)
else:
    print(tf.test.is_built_with_cuda())
    print("Nenhuma GPU disponível.")

# Definir o tamanho da imagem
img_size = (150, 150)

# Diretórios de treinamento, validação e teste
train_dir = r'../images/train'
val_dir = r'../images/val'
test_dir = r'../images/test'

# Número de classes
class_count = len(os.listdir(train_dir))

# Criar geradores de dados de treinamento e validação
batch_size = 32
train_datagen = ImageDataGenerator(
    horizontal_flip=True,
    preprocessing_function=preprocess_input
)

train_gen = train_datagen.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical'
)

valid_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input
)

valid_gen = valid_datagen.flow_from_directory(
    val_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False  # Não embaralhar os dados de validação
)

# Criar modelo
model = tf.keras.applications.efficientnet.EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(img_size[0], img_size[1], 3),
    pooling='max'
)

model.trainable = True
x = model.output
x = BatchNormalization(axis=-1, momentum=0.99, epsilon=0.001)(x)
x = Dense(256, activation='relu')(x)
x = Dropout(rate=.4, seed=123)(x)
output = Dense(class_count, activation='softmax')(x)
model = Model(inputs=model.input, outputs=output)

model.compile(
    Adamax(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Treinar o modelo
epochs = 10  # Defina o número desejado de épocas
history = model.fit(
    train_gen,
    epochs=epochs,
    validation_data=valid_gen
)

# Salvar o modelo treinado
model.save("modelo_treinado.h5")
