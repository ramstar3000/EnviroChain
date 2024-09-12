# PolkaHackathon - Constant development
Enviro-Chain develops a decentralized platform for smart environmental monitoring and optimization to help residential and commercial spaces improve environmental quality and energy efficiency by integrating real-time environmental parameters with blockchain technology for data integrity and security, and using machine learning for predictive analytics and optimization.

For the presentation slides: https://www.canva.com/design/DAGLf247Ucs/Cur30IIEmBXqn_S9ZMCSTw/edit?utm_content=DAGLf247Ucs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

# Validation Routines
To view the validation routines you can look in the public folder and view the add_csv_to_chain.js and the validate_username.js files. Here you can see the validation routines for the username and the csv file. This uses the polka chain and you need to  add your mnemonic inside.

# Additional moonbase support
The moonbase code was generated from the moonbase substrate in python as seen in the folder and that has been referred to in the JS files!!!

# Running instructions

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Information

Enviro-Chain is a decentralized platform designed for smart environmental monitoring and optimization in residential and commercial spaces. Our system integrates with various environmental parameters, such as air quality, temperature, and humidity, and leverages machine learning for predictive analytics and optimization. The primary goal of Enviro-Chain is to improve environmental quality and enhance energy efficiency, addressing the growing need for sustainable and intelligent building management. What It Does Enviro-Chain collects real-time data from sensors deployed in different environments. This data includes critical environmental metrics like air quality, temperature, and humidity. Our platform processes this data using advanced machine learning algorithms to provide predictive analytics and optimization recommendations. Users can access insights and actionable information through a user-friendly interface, enabling them to make informed decisions to improve environmental conditions and reduce energy consumption. Problems It Solves Environmental Quality Management: By continuously monitoring environmental parameters, Enviro-Chain helps maintain optimal conditions, improving health and comfort for occupants. Energy Efficiency: The platform identifies patterns and inefficiencies in energy use, providing recommendations to reduce consumption and lower costs. Data Integrity and Security: Using blockchain technology, Enviro-Chain ensures that the collected data is immutable, transparent, and securely stored, addressing concerns about data tampering and privacy. Scalability and Cost: The use of sharding on the Polkadot network enhances scalability, allowing the system to handle large amounts of data efficiently while keeping transaction costs low.


# Technical Details

## How Polkadot Blockchain is Used 

### Sharding for Scalability: 
    Enviro-Chain leverages Polkadot's sharding technology to divide the network into smaller, manageable pieces that can process transactions in parallel. This approach significantly enhances the scalability of the platform, allowing it to handle large volumes of environmental data without compromising performance. Low Transaction Costs: By utilizing Polkadot's scalable infrastructure, Enviro-Chain ensures that transaction costs remain low. This economic viability is crucial for storing and managing vast amounts of sensor data. Immutable, Decentralized, and Transparent 
    
### Storage:
    Data collected by Enviro-Chain sensors is stored on the Polkadot blockchain, ensuring immutability and transparency. This decentralized storage solution prevents data tampering and provides a trustworthy record of environmental conditions. User Authentication and Identity Verification: Each sensor and user in the Enviro-Chain network is assigned a unique identity on the Polkadot network. User logins are verified using the signatureVerify function, which ensures secure authentication and prevents unauthorized access. Security: The Polkadot network's robust security model protects against various types of attacks, ensuring that the data collected by Enviro-Chain is secure and reliable. 

## Non-Blockchain Technology used: 

### Machine Learning (ML): Data Preprocessing: Cleaning and organizing collected data to make it suitable for ML models. Feature Engineering: Extracting relevant features from raw data to improve model accuracy. Predictive Analytics: Using supervised and unsupervised ML algorithms to analyze data and predict future trends. We initially use a NN model for prediction, then a Linear regression and GPT model. Finally, we used othe models

### Optimization Algorithms: Implementing algorithms to provide recommendations for improving environmental conditions and energy efficiency. 

### Data Visualization: Dashboards: User-friendly interfaces displaying real-time data, insights, and trends. Reporting Tools: Generating detailed reports on environmental conditions and energy usage for users

