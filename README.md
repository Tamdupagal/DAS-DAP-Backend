# Digital Adoption Program (DAP)

#### _from Digital Aided Solutions_

This readme file is an introduction to how the application backend works and various requirements that are needed to run it.

## Table of Content

- [Features](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#features)

1. [NodeJS](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#nodejs)

2. [Express](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#express)

3. [MongoDB](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#mongodb)

- [How to run our Application](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#how-to-run-our-application)

1. [GitHub Repository](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#github-repository)

2. [Run Script](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#run-script)

## 3. Available API End-Points

- [User Authorization ](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#user-authorization)

- [ Save/Store TaskFlow ](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#savestore-taskflow)

- [ View All TaskFlows ](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#view-all-taskflows)

- [Future Updates](https://github.com/iHaroon29/DAS-DAP-Backend/blob/Developer/README.md#future-updates)

### Super Admin Routes
- [Create Admin](#create-admin)
- [Update Issue](#update-issue)
- [View Issue](#view-issue)

### Authorization Routes
- [User Admin Login](#user-admin-login)
- [Extension Dashboard Logout](#extension-dashboard-logout)
- [Admin Dashboard Logout](#admin-dashboard-logout)

### Extension Dashboard Routes
- [Create Task Flow](#create-task-flow)
- [Update TaskFlow](#update-task-flow)
- [Delete Particular TaskFlow](#delete-particular-task-flow)
- [Fetch TaskFlows based on Application Domain](#view-task-flow-based-on-application-domain)
- [View Particular Task Flow in an application](#view-particular-task-flow)
<!-- - [View All FeedBack Questions](#view-all-feedback-questions) -->
<!-- - [Submit Response for FeedBack](#submit-response-for-feedback) -->
<!-- - [View All Announcements Copy](#view-all-announcements-copy) -->
<!-- - [View particular Announcement Copy ](#view-particular-announcement-copy) -->
<!-- - [View Announcement By User](#view-announcement-by-user) -->
<!-- - [Submit Announcement Response Copy](#submit-announcement-response-copy) -->
<!-- - [View particular user-EXT](#view-particular-user-ext) -->
<!-- - [View Announcement By User Copy](#view-announcement-by-user-copy) -->
<!-- - [Report New Issue](#report-new-issue) -->

### Admin Dashboard Routes
- [View All TaskFlows](#view-all-task-flow)
- [View Particular Task Flow](#view-particular-task-flow)
- [Create a User Admin](#create-a-user-or-admin)
- [View all created users](#view-all-created-users)
- [View particular user](#view-particular-user)
<!-- - [Create FeedBack](#create-feedBack)
- [View FeedBack Questions](#view-feedBack-questions)
- [View FeedBack Responses](#view-feedBack-responses)
- [Create new announcement Copy](#create-new-announcement-copy)
- [View All Announcements](#view-all-announcements)
- [View Announcement By User Copy](#view-announcement-by-user-copy)
- [View Announcement responses all](#view-announcement-responses-all)
- [View particular Announcement Copy](#view-particular-announcement-copy) -->

### Analytics Routes
- [pushing Analytics](#pushing-analytics)

## Features

- Built on [Node.js](https://nodejs.org/en/)/[Express](https://expressjs.com) Framework.

- Uses [MongoDB](https://www.mongodb.com/) (Document Based Database).

- Hosted via [E2E](https://www.e2enetworks.com/) Instance.

### NodeJS

> As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

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

> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

#### Installation

Assuming you’ve already installed Node.js, create a directory to hold your application, and make that your working directory.

```sh

$ mkdir myapp

$ cd myapp

```

Use the npm init command to create a package.json file for your application. For more information on how package.json works, see Specifics of npm’s package.json handling.

```sh

$ npm init

```

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```sh

entry point: (index.js)

```

Enter app.js, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

Now install Express in the myapp directory and save it in the dependencies list. For example:

```sh

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

> MongoDB is a document database designed for ease of application development and scaling.

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

- [x] User Authorization

- [x] Save/Store TaskFlow

- [x] View All TaskFlows

- [x] Delete TaskFlow

## User Authorization

This API end point returns a valid JWT token on successfull user authorization along with the type of user assigned so said credential.

### Request URL

Type of Request- POST

```

https://dap.digitalaidedschool.com:5000/Auth/:databaseID/Login

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

```sh

{

"status": 200,

"auth": true,

"token": "---JWT-TOKEN---",

"typeOfUser": "[Admin/User]",

"databaseID": -- database-id--,

"email": -- emailID--

}

```

> **_NOTE:_** It is mandatory to save the Token in the Authorization Headers as "**Bearer Token_Value**" for those who are working on the Client-Side to authenticate subsequent requests.

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

"applicationName":  "test4",

"applicationURL":  "www.test.com",

"applicationDomain":"test.dap.com",

"applicationTaskFlowUseCase":  "",

"taskList":  [

{

"stepNumber":  1,

"title":  "title-1",

"targetURL":  "www.test.com",

"htmlTag":  "<p>Hello</p>",

"cssSelector":  "test",

"customURL":"test.com",

"taskMessage":  "Click on create button",

"targetClickOffsetX":  10,

"targetClickOffsetY":  20

},

{

"stepNumber":  2,

"title":  "title-2",

"targetURL":  "www.test.com",

"cssSelector":  "test",

"customURL":"test.com",

"htmlTag":  "<h1>Hello</h1>",

"taskMessage":  "Click on create button",

"targetClickOffsetX":  10,

"targetClickOffsetY":  20

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

```sh

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

```sh

{

status: 200,

Message: '--Array of TaskFlows--'

}

```

### Response - on Failure

Response on Failed Fetch.

```sh

{

status: "--Appropriate Status Code",

message: "--Appropriate Failure Message--"

}

```

## Delete TaskFlow

This being a DELETE request, No body needs to be attached to the HTTP Request.

### Response - on Success

Response on Successful Fetch.

```sh

{

status: 200,

Message: '--Array of TaskFlows--'

}

```

### Response - on Failure

Response on Failed Fetch.

```sh

{

status: "--Appropriate Status Code",

message: "--Appropriate Failure Message--"

}

```

# Create Admin

This API end point returns a message with a successfully created admin otherwise show the error occured during the process


## Request URL

Type Of Request - POST 


```
https://dap.digitalaidedschool.com:5000/SuperAdmin/Dashboard/Companies/new


```

## Request Body


```

{
    companyName: "Your-company-name",

    companyEmail: "company-valid-email",

    companyUserEmail: "company-valid-email-id",

    companyUserName:"company-admin-name",

    companyPassword: "valid-password-assosiated-with-email"

}
```

## Response - on Success

Response on successfully creation of Admin

```sh
{
    status:200,

    message:"company-name has joined DAS-DAP succesfully!!"

}
```


## Response - on Failure

Response on failed creation of admin

```sh
{

status:400,

message:"must have required property 'property-name'"

}

```
# Update Issue

This API end point is used to update the issue by issueId

Type Of Request - PUT


```
https://dap.digitalaidedschool.com:5000/SuperAdmin/dashboard/issues/search?issueId=


```

## Request Body

```sh

isFixed:true

```

## Response - On Success

Response on success issue updation

```sh

status: 200,

message: "Issue with reference-id ${issueId} has been Updated!",

```

## Response - On Failure

Response on failed issue updation

```sh

status: 400,

message: "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"

```


# View Issue

This API end point is used to view issue by ID

Type Of Request - GET

## Request URL

```
https://dap.digitalaidedschool.com:5000/SuperAdmin/dashboard/issues/search?page=

```
## Response - On Success

Response on success issue view

```sh

status: 200, 
 
result: Array

```

## Response - On Failure

Response on Failed issue view 

```sh

status: 400, 

message: 'Error Message'

```

# User Admin Login <a name="user-admin-login"></a>

This API end point returns a valid JWT token on successfull user authorization along with the type of user assigned so said credential.

### Request URL

Type of Request- POST

```

https://dap.digitalaidedschool.com:5000/Auth/:databaseID/Login

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

```sh

{

"status": 200,

"auth": true,

"token": "---JWT-TOKEN---",

"typeOfUser": "[Admin/User]",

"databaseID": -- database-id--,

"email": -- emailID--

}

```

> **_NOTE:_** It is mandatory to save the Token in the Authorization Headers as "**Bearer Token_Value**" for those who are working on the Client-Side to authenticate subsequent requests.

### Response - on Failure

Response on failed authorization of user.

```sh

{

"status": 401,

"auth": false,

"data": "Invalid Email or Password"

}

```

# Extension Dashboard Logout

This API end point Logout the user/admin and return the JWT token to empty string 

## Request URL 

Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/Extension/Dashboard/:databaseID/Logout

```

## Response - On Success

Response on successfull Logout

```sh

status: 200, 

canLogout: true, 

token: ''

```

## Response - On Failure

Response on Failed Logout

```sh

status: 400, 

canLogout: true, 

token: ''

```


# Admin Dashboard Logout

This API end point Logout the user/admin and return the JWT token to empty string 

## Request URL 

Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/Admin/Dashboard/:databaseID/Logout

```

## Response - On Success

Response on successfull Logout

```sh

status: 200, 

canLogout: true, 

token: ''

```

## Response - On Failure

Response on Failed Logout

```sh

status: 400, 

canLogout: true, 

token: ''

```

# Create Task Flow

This API endpoint is used to create a taskflow and returns a information about your applicationTaskFlowUseCase

## Request URL 
Type Of Request - POST

```
https://dap.digitalaidedschool.com:5000/extension/dashboard/:databaseID/tasks/

```

## Request Body
The following JSON should be sent as a POST call via POSTMAN or Client-Side HTTP request.


```sh

applicationName: "Your-application name",

applicationDomain: "valid-application-domain",

applicationTaskFlowUseCase: "valid-task-flow-use-case",
   
taskList: [
        {
            stepNumber: Number,
            title: "String",
            targetUrl: "valid-url",
            skippable: Boolean,
            cssSelector: "valid-css-selecter",
            customUrl: "valid-url",
            taskMessage: "information-about-button",
            targetClickOffsetX: Number,
            targetClickOffsetY: Number,
            backgroundOpacity: "String",
            highlightBorderWeight: "String",
            actionType: "String"
        }
    ]

```

## Response - On Success
Response on successfull taskflow

```sh
{

status: 201,

message: "Taskflow named ${applicationTaskFlowUseCase} has been published!",

}


```

## Response - On Failure

Response on failed due to following reason <br>
1. Due to duplicate applicationTaskFlowUseCase on that response will be
 

```sh
{

status: 422

message:"${applicationTaskFlowUseCase} in ${applicationDomain} already exists.",

}

```

2. Due to validation error

```sh
{

status:400,

message:"validation-error-message"

}
```

# Update Task Flow
This API endpoint is used to update the taskflow with the help of applicationTaskFlowUseCase and applicationDomain available in the query

## Request URL 
Type Of Request - PUT

```sh

https://dap.digitalaidedschool.com:5000/extension/dashboard/:databaseID/tasks/search?applicationTaskFlowUseCase=&applicationDomain=

```

## Request Body

```sh

{
     taskList:[
                {
                    stepNumber: Number,
                    title:"String",
                    targetURL:"valid-url",
                    indexValueOfTag:"Number",
                    lenghtOfCollection:"Number",
                    htmlTag:"<p>html-tag</p>",
                    taskMessage: "information-about-your-flow"
                },
            ]
}

```

## Response - On Success
Response On Successfull Updation Task Flow

```sh

{

    status: 200,

    message: "TaskFlow(s) has been Updated!"

}


```

## Response - On Failure
Response On Failed Updation TaskFlow

```sh

{
    status: 400,

    message: "error-message"
}


```
# View Particular Task Flow
This API endpoint is used to get the particular taskflow with the help of applicationTaskFlowUseCase and applicationDomain available in the query

## Request URL 
Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/extension/dashboard/:databaseID/tasks/search?applicationTaskFlowUseCase=&applicationDomain=

```
## Response - On Success
Response On SuccessFull View Of Particlar Task Flow

```sh

{

status:200,

result: [{"Array Of Object"}],

totalCount:Number

}


```
## Response - On Failure
Response on Failed View Of Particular Task Flow

```sh

{

status:400,

message:"Error Message"

}

```

# Delete Particular Task Flow 
This endpoint is used to delete the particular task flow with the help of applicationTaskFlowUseCase and applicationDomain available in query

## Request URL 
Type Of Request - DELETE

 ```

https://dap.digitalaidedschool.com:5000/extension/dashboard/:databaseID/tasks/search?applicationTaskFlowUseCase=&applicationDomain=

 ```
## Response - On Success
Response on successfull deletion of taskflow

```sh

{
    status:200,

    message: "${applicationTaskFlowUseCase} from ${applicationDomain} has been deleted.",
}

```
## Response - On Failure
Response on failed deletion Of taskflow

```sh

status:400,

message:"`${applicationTaskFlowUseCase} in ${applicationDomain} doesn't exist.`"

```

# View Task Flow Based On Application Domain
This API endpoint is used to get the taskflow based on the applicationDomain available in the query

## Request URL 
Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/extension/dashboard/:databaseID/tasks/search?applicationDomain=&page=

```
## Response - On Success
Response on successfull view of the taskflow

```sh

{

status:200,

result:[{"Array Of Object"}],

totalCount:Number

}

```
## Response - On Failure 
Response on the failed view of task flow

```sh

status:400,

message:"${applicationDomain} doesn't exist."


```

# View All Task Flow
This API endpoint is ued to get all the taskflow available

## Request URL 
Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/admin/dashboard/:databaseID/tasks/

```

## Response - On Success
Response on successfull view on task flow
```sh

status:200,

result [{"Array Of Object"}],

totalCount:Number

```
## Response - On Failure
Response On Failed view on task flow
```sh

status:400,

message:"`${applicationTaskFlowUseCase} in ${applicationDomain} doesn't exist.`"

```

# Create A User or Admin
This API endpoint is used to create the admin or user for the company

## Request URL
Type Of Request - POST

```
https://dap.digitalaidedschool.com:5000/admin/dashboard/:databaseID/users/

```

## Requst Body


```sh

{
    userName: "valid-username",
    email: "valid-email",
    password: "valid-password"
}

```

## Response - On Success
Response on successfull creation of user or admin 

```sh

{
    status: 200,
    message: "${userName} has joined "
}


```

## Response - On Failure
Response on failed creation of user or admin

```sh

{
    satus: 400,
    message: "${email} already exists."
}

```

# View All Created Users
This endpoint is ued to view all the user available in the company

## Request URL 
Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/admin/dashboard/:databaseID/users/

```
## Response - On Success
Response on successfull view of all the user

```sh
{

status:200,

result: [{"Array Of Object"}],

totalCount:Number

}
```

## Response - On Failure

```sh

{

status:400,

message:"Error Message"

}

```

# View Particular User
This API endpoint is used to get the particular user based on the email or userId
## Request URL
Type Of Request - GET

```

https://dap.digitalaidedschool.com:5000/admin/dashboard/:databaseID/users/search?email=&userId=

```

## Response - On Success
Response on successfully getting the particular user based on userId or email

```sh
{

status:200,

result:[{
            _id: "id-generated-by-mongodb",
            userName: "valid-username",
            email: "valid-email",
            typeOfUser: "User-or-Admin",
            createdAt: "date-on-creation",
            updatedAt: "update-on-creation",

}],

totalCount:Number

}


```

## Response - On Failure
Response on filed to getting the particular user based on userId or email

```sh
{

status:400,

message:"user of this ${email} doesn't exist"

}

```
# Pushing Analytics
This API endpoint is used to push the analytics details 
with the help to two variables applicationTaskFlowUseCase
and applicationDomain

## Request URL
Type Of Request - PUT

```

https://dap.digitalaidedschool.com:5000/extension/dashboard/:databaseID/analytics/save

```
## Request Body

```sh
{ 

applicationTaskFlowUseCase:"String",

applicationDomain:"valid-doamin",

isCompleted:Boolean,

email:"vali-email"

}

```

## Response - On Success
Response on getting successfull updation of analytics

```sh

{

status: 200, 

message: "Pushed Analytics Successfully"

}

```

## Response - On Failure
Response On getting failed updation on pushing analytics

```sh

{

status: 500, 

message: 'Updation Not Possible,Please contact Support! ',

}


```



## Future Updates

- [ ] Session Re-Authentication (In Developement)

- [ ] Update particular TaskFlow (Tested but not Integrated)

- [ ] Create a User/Admin (Tested but not Integrated)

- [ ] View a User/Admin (Tested but not Integrated)

- [ ] View all User/Admin (Tested but not Integrated)

- [ ] Update a User/Admin (Pre-Planning)
