[![Maintainability](https://api.codeclimate.com/v1/badges/6403406123b488233b81/maintainability)](https://codeclimate.com/github/koechkevin/sms-management-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6403406123b488233b81/test_coverage)](https://codeclimate.com/github/koechkevin/sms-management-api/test_coverage)
[![Build Status](https://travis-ci.org/koechkevin/sms-management-api.svg?branch=master)](https://travis-ci.org/koechkevin/sms-management-api)
#### sms-management-api

The documentation for this api can be accessed [here](https://manage-sms.herokuapp.com/docs/#/)

## Setup
 - Libraries, tools and Frameworks
    - Node js - Javascript runtime environment
    - Express js - A Javascript web applications framework.
    - Babel 7 - A Javascript transpiler that transforms the latest versions to browser compatible versions.
- Clone the repository - `$ git clone https://github.com/koechkevin/sms-management-api.git` 
- Change into the project directory - `$ cd sms-management-api`
- Install the dependencies - `$ yarn install`
    - Please provide the following environment variables
    
    ```
        DATABASE_HOST - your database host name
        DATABASE_NAME - The name of your database
        DATABASE_PASSWORD - password
        DATABASE_USER - your username on the database
        TEST_DATABASE - This a database name you will run the tests against
        PORT - the port number your application will run on. This defaults to 3000 if its not provided
    ```
    
  #### Production
    - Transpile the code and bundle by running `$ yarn build`
    - Run the server `$ yarn start`

  #### Development
     - Start the api with `$ yarn start:dev`. This uses the default port you provided on environment variables
     - Run any available migrations - `$ yarn migrate`
     
  #### Testing
    - Run the tests using `$ yarn test`
