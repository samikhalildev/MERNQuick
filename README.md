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

## React
React is where the magic of SPAs happens. React allows us to create components of UI's and render them on the page depending on the URL route.

#### Components: 
A component is a React class that renders HTML. When the state changes, React listens for these changes and will automatically update the DOM. 

App.js is the meeting place for all React components.


#### There are two ways of using data in React:
- State: managed within the component (similar to variables declared inside a function). Use state when data needs to dynamic.
- Props: short for properties, passed to a component (similar to a function parameter). Use props when data doesn't need to be dynamic.


# Installation
Make sure you have [NodeJS](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed. 

1. Clone this project: 
    ```sh 
    git clone https://github.com/samikhalildev/MERNQuick.git 
    ``` 
2. Rename directory to your app name: 
    ```sh 
    mv MERNQuick my-app 
    ``` 
3. Navigate into the directory: 
    ```sh 
    cd MERNQuick 
    ``` 
4. Install all Node dependencies: 
    ```sh 
    npm install 
    ``` 
5. Install all React dependencies: 
    ```sh 
    npm run client-install 
    ``` 
6. Run client and server concurrently: 
    ```sh 
    npm run dev 
    ```
# Questions
Email me sami.khalil.dev@gmail.com

