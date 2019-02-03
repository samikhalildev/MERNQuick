# MERNQuick

MERNQuick is a boilerplate setup for building powerful full stack JavaScript applications using the MERN stack.
This project gives you a head start on building your next big idea. It has a complete backend service with full CRUD functionality and authentication. The client side has a full React and Redux setup with examples to get you started quickly.

## The MERN stack
MERN consists of 4 popular technologies: 
- MongoDB: A NoSQL database used to store data as a JSON document
- Express: A serverside framework on top of NodeJS for handling routing of http requests
- React/Redux: A front end framework/library that provides a dynamic and interactive user interfaces
- NodeJS: A serverside JavaScript language for the server

## Single Page Applications (SPAs)
MERN is one of the most popular stack for Single Page Applications (SPAs). 

In traditional web applications, the server usually renders the web page depending on the web request.
In SPAs the whole application lives on a single web page that is sent from the server once I.e. the client only gets one HTML page from the server.

React is where the magic of SPAs happens. We create components of UI's and render them on the page depending on the URL route.
When the state of our app changes, React listens for these changes and is able to change the data on the page without interacting with the DOM API itself.

# Installation
Make sure you have [NodeJS](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed. 

- Clone this project: 
    ```sh 
    git clone https://github.com/samikhalildev/MERNQuick.git 
    ``` 
- Rename directory to your app name: 
    ```sh 
    mv MERNQuick my-app 
    ``` 
- Navigate into the directory: 
    ```sh 
    cd MERNQuick 
    ``` 
- Install all Node dependencies: 
    ```sh 
    npm install 
    ``` 
- Install all React dependencies: 
    ```sh 
    npm run client-install 
    ``` 
- Run client and server concurrently: 
    ```sh 
    npm run dev 
    ```
# Questions
Email me sami.khalil.dev@gmail.com

