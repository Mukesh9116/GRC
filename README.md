# GRS

## Step 1 - 
    create a folder named - "grs"
## Step 2 - 
    create a react project with bootstrap , axios , react-router-dom 
## Step 3 - 
    create server folder for handling backend in the parent folder "grs"

# Server
    1. initializing the node app using npm init -y
    2. install all require packages .

## Express
    use for logic and creating rest api
        npm i express

## Mongoose
    use for mongoDB database handling 
        npm i mongoose

## dotenv
    dotenv use for storing the hidden or sensitve credentials like db connection , network code etc.
    npm i dotenv

## bcrypt.js
    it is used for hashing the pass in the encrypted way .      
    npm i bcrypt.js

## nodemon
    it is used for handle the server start action in the real time
    npm i nodemon

## nodemailer
    used for implement the email sending functionality to a user .
    npm i nodemailer  

## jsonwebtoken


# npm i express mongoose dotenv bcryptjs nodemon nodemailer     


# SCHEMA

## new Admin Schema
    name
    email
    password

## College Schema
    name
    description
    status   
    timestamps

## Session Schema
    name
    status   
    timestamps 

## Complaint Type
    name
    description
    status
    timestamp    

# Client

## Pages
    1. Home.jsx
    2. AdminLogin.jsx
    3. UserLogin.jsx
    4. UserRegister.jsx
        name , fname , email , mobile , college (select) , course (select) , session (select), enrollment number(text),password , dob , gender , adress 
    5. Folder
        admin
    6. Folder
        user    
    