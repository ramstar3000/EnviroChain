# Plot data about info.

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
data['Week Number'] = (data.index // 7000).astype(int)


# PLot data

# PLot evengy consumption by week number

# plt.plot(data['Week Number'], data['Energy Consumption'])
# plt.xlabel('Week Number')
# plt.ylabel('Energy Consumption')

# plt.show()

# Plot moving average
window_size = 5000
data['Energy Consumption MA'] = data['Energy Consumption'].rolling(window_size).mean()

plt.plot(data['Week Number'], data['Energy Consumption MA'])

plt.xlabel('Day Number')
plt.ylabel('Energy Consumption')
plt.show()