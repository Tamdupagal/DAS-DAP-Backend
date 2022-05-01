# Digital Adoption Program (DAP)
#### _from Digital Aided Solutions_

This readme file is an introduction to how the application backend works and various requirements that are needed to run it.

## Table of Content 
## Table of Content 
- [Features](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#features)
    1. [NodeJS](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#nodejs)
    2. [Express](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#express)
    3. [MongoDB](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#mongodb)
- [How to run our Application](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#how-to-run-our-application)
    1. [GitHub Repository](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#github-repository)
    2. [Run Script](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#run-script)
    3. Available API End-Points
        - [User Authorization ](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#user-authorization)
        - [ Save/Store TaskFlow ](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#savestore-taskflow)
        - [ View All TaskFlows ](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#view-all-taskflows)
  
- [Future Updates](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#future-updates)

## Features
- Built on [Node.js](https://nodejs.org/en/)/[Express](https://expressjs.com) Framework.
- Uses [MongoDB](https://www.mongodb.com/) (Document Based Database).
- Hosted via [E2E](https://www.e2enetworks.com/) Instance.

### NodeJS
>As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

#### Installation 

Node can be installed by visiting the below link and follow the steps displayed by the installer.
[Node.js](https://nodejs.org/en/) official documentation+link. 

#### Sample Code and Run Script

Using your favourite code editor,
- Copy the below code in an new file.
- Save it as a .js file.
- Run it by typing "node --filename--.js" in the Terminal

```sh
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Express
#### _Fast, unopinionated, minimalist web framework for Node.js_
>Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 

#### Installation 

Assuming you’ve already installed Node.js, create a directory to hold your application, and make that your working directory.
``` sh
$ mkdir myapp
$ cd myapp
```
Use the npm init command to create a package.json file for your application. For more information on how package.json works, see Specifics of npm’s package.json handling.

``` sh
$ npm init
```
This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

``` sh
entry point: (index.js)
```
Enter app.js, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

Now install Express in the myapp directory and save it in the dependencies list. For example:
``` sh
$ npm install express
```

To install Express temporarily and not add it to the dependencies list:
```sh
$ npm install express --no-save
```
### Sample Code and Run Script

Using your favourite code editor,
- Copy the below code in an new file.
- Save it as a .js file.
- Run it by typing "node --filename--.js" in the Terminal

```sh
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### MongoDB
#### _Build faster, Build smarter_
>MongoDB is a document database designed for ease of application development and scaling.

#### Features

Run MongoDB with
- [MongoDB Atlas](https://www.mongodb.com/cloud?tck=docs_server) fully managed in the cloud,
- the source available and free-to-use [MongoDB Community](https://www.mongodb.com/docs/manual/administration/install-community/), or
- the [MongoDB Enterprise](https://www.mongodb.com/docs/manual/administration/install-community/) Advanced subscription.

## How to run our Application
### GitHub Repository
 Using the following link, please clone the repository to your local machine and proceed using the commands provided below.
 
 ```
 https://github.com/iHaroon29/DAS-DAP-Backend
 ```
### Run Script
Navigate to the folder where you have cloned the above repository and enter the following command in the terminal.

```sh
npm install 
<!-- This will install all required dependencies -->
npm run dev 
<!--Use this to run in DEV ENV-->
npm start 
<!--Use this to run in PROD ENV-->
```

### Available API's 

- [X] User Authorization 
- [X] Save/Store TaskFlow 
- [X] View All TaskFlows 

## User Authorization 
This API end point returns a valid JWT token on successfull user authorization along with the type of user assigned so said credential.

### Request URL 
Type of Request- POST
```
https://dap.digitalaidedschool.com:5000/Login
```

### Request Body 
The following JSON should be sent as a POST call via POSTMAN or Client-Side HTTP request.
```sh
{
  "email": "valid-email-id",
  "password": "valid-password-assosiated-with-email"
}
```

### Response - on Success
Response on successful authorization of user.
``` sh
{
    "status": 200,
    "auth": true,
    "token": "---JWT-TOKEN---",
    "typeOfUser": "[Admin/User]"
}
```
> **_NOTE:_**  It is mandatory to save the Token in the Authorization Headers  as "**Bearer Token_Value**" for those who are working on the Client-Side to authenticate subsequent requests.

### Response - on Failure
Response on failed authorization of user.
```sh
{
    "status": 401,
    "auth": false,
    "data": "Invalid Email or Password"
}
```
## Save/Store TaskFlow
This API end point is used to Save/Store TaskFlows created by the Admin via the Extension.

### Request URL 
Type of Request- POST
```
https://dap.digitalaidedschool.com:5000/Extension/Dashboard/Tasks/createTaskFlow
```

### Request Body 
The following JSON should be sent as a POST call via POSTMAN or Client-Side HTTP request.
```sh
{
    "applicationName":"--name of the application--",
    "applicationURL": "--valid URL of the application--",
    "applicationTaskFlowUseCase":"--name of the taskFlow--",
    "taskList":[
                {
                    "stepNumber": 1,
                    "title":"title-1",
                    "targetURL":"--Current Tab URL--",
                    "indexValueOfTag":"2",
                    "lenghtOfCollection":"6",
                    "htmlTag":"<p>Hello</p>",
                    "taskMessage": "Click on create button"
                },
                {
                    "stepNumber": 2,
                    "title":"title-2",
                    "targetURL":"--Current Tab URL--",
                    "indexValueOfTag":"3",
                    "lenghtOfCollection":"10",
                    "htmlTag":"<h1>Hello</h1>",
                    "taskMessage": "Click on create button"
                   
                }
            ]
}
```

### TaskFlow Model
The following is the TaskFlow Model created at the Server.

```sh
{
     "taskID": "-- Random Sequence unique for every taskflow",
     "applicationID":"--applicationName-- + --Random Sequence--",
     "applicationName": "--applicationName--",
     "applicationURL": "--req.body.applicationURL--",
     "applicationFLowURL":"--applicationURL--+--applicationTaskFlowUseCase--",
     "applicationTaskFlowUseCase": "--applicationTaskFlowUseCase--",
     "taskList": "--taskList--",
}
```

### Response - on Success
Response on successful taskflow save.
``` sh
{
    status: 200,
    Message: 'Task Flow published!' 
}
```
### Response - on Failure
Response on failed taskflow save.
```sh
{ 
    status: "--Appropriate Status Code", 
    message: "--Appropriate Failure Message--" 
}
```
## View All TaskFlows
This API end point is used to View All TaskFlows created by the Admin via the Extension.

### Request URL 
Type of Request- GET
```
https://dap.digitalaidedschool.com:5000/Extension/Dashboard/Tasks/viewAllTaskFlow
```
### Request Body 
This being a GET request, No body needs to be attached to the HTTP Request. Our Future updates include Admin based TaskFlow fetching were TaskFlows specifically created by said Admin will be fetched upon requests based on Query Params. 

### Response - on Success
Response on Successful Fetch.
``` sh
{
    status: 200,
    Message: '--Array of TaskFlows--' 
}
```
### Response - on Failure
Response on Failed Fetch.
``` sh
{ 
    status: "--Appropriate Status Code", 
    message: "--Appropriate Failure Message--" 
}
```

## Future Updates
- [ ] Session Re-Authentication (In Developement)
- [ ] View a TaskFlow (Tested but not Integrated)
- [ ] Update particular TaskFlow (Tested but not Integrated)
- [ ] Create a User/Admin (Tested but not Integrated)
- [ ] View a User/Admin (Tested but not Integrated)
- [ ] View all User/Admin (Tested but not Integrated)
- [ ] Update a User/Admin (Pre-Planning)
