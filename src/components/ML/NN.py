import pandas as pd
import numpy as np
import torch 
import matplotlib.pyplot as plt



# Load the data

data = pd.read_csv('futuristic_city_traffic.csv')

city = 'SolarisVille'
important_rows = ['Energy Consumption', 'Traffic Density', 'Day Of Week', 'Random Event Occurred'   ]

# Filter the data for this city
data = data[data['City'] == city]

# Filter the data for the important rows
data = data[important_rows]
print(data.head())

# Map the 'Day of Week' column to numbers
data['Day Of Week'] = data['Day Of Week'].map({'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6})

# Add week numbers to the data
data['Week Number'] = (data.index // 7).astype(int)


# Convert the data to a tensor
data_tensor = torch.tensor(data.values)

# Convert all rows in the data to floats
data_tensor = data_tensor.float()

# Training split
training_split = 0.8
training_size = int(len(data_tensor) * training_split)

# Split the data into training and testing sets
training_data = data_tensor[:training_size]
testing_data = data_tensor[training_size:]


# Create a neural network to predict the  energy consumption by week number
X = training_data[:, 1:] # Traffic Density, Day Of Week, Random Event Occurred, Week Number
y = training_data[:, 0] # Energy Consumption


# Model as a linear regression model
model = torch.Linear

# Define the loss function and optimizer
loss_fn = torch.nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Train the model
for t in range(1000):
    y_pred = model(X)
    loss = loss_fn(y_pred, y)
    if t % 100 == 99:
        print(t, loss.item())
    
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# Test the model
X_test = testing_data[:, 1:]
y_test = testing_data[:, 0]

y_pred = model(X_test)

# Calculate the loss
loss = loss_fn(y_pred, y_test)
print('Test loss:', loss.item())

# The model is trained to predict the energy consumption based on the traffic density, day of week, random event occurred, and week number.
# The model is a neural network with 2 layers.

# Plot the predictions

# PLot energy consumption by each week
plt.plot(y_test, label='Actual')
plt.plot(y_pred.detach().numpy(), label='Predicted')

plt.xlabel('Week')
plt.ylabel('Energy Consumption')

plt.legend()
plt.show()

# Save the model
torch.save(model, 'model.pt')



# Print the data
print(data_tensor)