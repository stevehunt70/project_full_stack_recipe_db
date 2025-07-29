# project - full stack recipe database

## create a full stack recipe application:
  - create a REST API to handle server requests
  - serve the web page statically using Express
  - use CRUD to enhance user experience

user must be able to:
  - Register as a user with a password or
  - login using their saved password
  - Create / write a recipe
  - Read existing recipes
  - Update recipes
  - Delete recipes

### Installation
install libraries using:
  - npm i express
  - npm i sequelize
  - npm i jsonwebtoken
  - npm i dotenv
  - npm i bcrypt
  - npm i mysql
  - npm i nodemon

### creation and population of mysql database
(no need for seed to be used as population by sql commands)
  - run mysql -u username -p (changing username for your actual user name)
  - input your password
  - run the following to create the database 'source db/schema.sql'
  - run the following to populate that database tables 'source db/data.sql'

### Creation of js files for Routes and Models