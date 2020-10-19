# SDSppt-college-example
an example/demo for the SDS(software development skills) - sem-3 - ppt on jwt

This has been made with REST api in mind. You can test it in applications like [Postman](https://www.postman.com/downloads/)

### Prerequisites
- This app has been tested in windows and the provided links are for windows only
- [Nodejs](https://nodejs.org/en/download/) (has been tested on 12.18.4)
  downloading the LTS version is recommended
- NPM, its included with nodejs install
- [Mongodb](https://www.mongodb.com/try/download/community)
  you can also use mongo atlas, just specify the appropriate DB_STRING env variable

### Steps to reproduce demo
- execute the following commands in your terminal
- start your mongodb server(locally)
`mongod`
- open a seperate terminal for further steps
- clone the repo by executing this:
`git clone https://github.com/Pika-Pool/SDSppt-college-example`
- cd into project folder
`cd SDSppt-college-example`
- set the environment variables
  - `set DB_STRING=<your db_string>`
    example:
    `set DB_STRING=mongodb://localhost:27017/<database_name>`
    required
  - `set SECRET=<your secret>`
    required
  - `set PORT=<prefered_port>`
    defaults to 3000
- install dependancies
`npm install`
- start the server
`npm start`

### Valid routes available
- /users/dashboard(GET)
- /auth/login(POST)
- /auth/register(POST)
