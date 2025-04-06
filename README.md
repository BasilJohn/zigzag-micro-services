# zigzagServer

Node.js Server with TypeScript & Mongodb

MongoDB Compass Setup Guide

Overview

MongoDB Compass is a graphical user interface (GUI) for MongoDB that allows you to interact with your MongoDB databases and perform CRUD (Create, Read, Update, Delete) operations, manage indexes, visualize data, and more.

This guide will help you connect to your MongoDB database using MongoDB Compass.


Prerequisites

Before using MongoDB Compass, ensure you have the following:
	•	MongoDB installed and running locally or on a server.
	•	MongoDB Compass installed on your machine. You can download it from [here](https://www.mongodb.com/try/download/compass).

Connecting to MongoDB Using MongoDB Compass

1. Install MongoDB Compass
	•	Go to the MongoDB Compass [download](https://www.mongodb.com/try/download/compass) page.
	•	Select the version that matches your operating system.
	•	Download and install MongoDB Compass following the on-screen instructions.

2. Open MongoDB Compass
	•	After installation, open MongoDB Compass.
	•	You’ll be presented with the connection screen.

3. Connection String Format

MongoDB Compass uses a connection string to connect to a MongoDB server. A typical connection string looks like this:

Local
---------------------------------
mongodb://localhost:27017/zigzag

4. Enter Connection Details in Compass

	•	Hostname: Enter localhost or the server IP address.
	•	Port: Use the default MongoDB port: 27017.
    •	Click Connect after entering your connection details.

5. Explore the Database
	•	After connecting, MongoDB Compass will show a list of available databases.
	•	Select a database to view collections, documents, and indexes.

6. Perform CRUD Operations
	•	Create: Insert new documents into collections.
	•	Read: Browse, filter, and search for documents.
	•	Update: Modify existing documents with MongoDB queries.
	•	Delete: Remove individual documents or entire collections.   


🔥 Contributing

Feel free to submit issues or create a pull request.

📝 License

This project is open-source and available under the MIT License.

