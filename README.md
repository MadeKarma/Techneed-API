
# Techneed API 🚀🥶

Techneeds API is a project for developing an API using **ExpressJS** and **TypeScript** language for a computer equipment store application. This API provides endpoints for managing Products, Categories, and Users.

## Problem 🚁

The computer equipment store is facing difficulties in updating and synchronizing product data between their warehouse and the store. The solution to this issue is to create a REST API that connects the warehouse and the store, enabling efficient communication and data exchange between various parts of the system without the need for waiting.

## Features 🛸

### 1. Product Catalog
Users can browse a diverse catalog of computer equipment, including by category example processors, graphics cards and more.

### 2. User Accounts

Users can create accounts and log in.

### 3. Real-time Stock

The Rest API updates stock product in real-time.

## How to Run the Project 🪂

To run this project, follow these steps:

1. **Install Dependencies**
Ensure you have `Node.js` and `npm` installed. Then, run the following command in the project directory to install all dependencies:
	```
	 npm install
2. **Setup `.env`**
	Duplicate the `.env.example` file and name it `.env`.
	
3. **Seeding data**
	Run the following command in the project directory to generate dummy data:
	```
	 ts-node prisma/seeder.ts	 
You can run the project with 
```
 npm run dev

```

Check it out in my Postman API Documentation!
```
https://documenter.getpostman.com/view/26936790/2s9YXmWzwk#57b78f2c-1e36-4604-b038-11e54f40b175
