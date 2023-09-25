import tensorflow as tf

# Carregue e pré-processe o conjunto de dados CIFAR-10
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0  # Normalização

# Defina o tamanho do lote (batch size) e crie um objeto Dataset
batch_size = 64
train_dataset = tf.data.Dataset.from_tensor_slices((x_train, y_train)).shuffle(60000).batch(batch_size)

# Crie o modelo
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])

# Compile o modelo
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Treine o modelo usando mini lotes
num_epochs = 10
for epoch in range(num_epochs):
    for batch_x, batch_y in train_dataset:
        model.train_on_batch(batch_x, batch_y)

# Avalie o modelo no conjunto de teste
test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=2)
print(f"Acurácia no conjunto de teste: {test_accuracy*100:.2f}%")