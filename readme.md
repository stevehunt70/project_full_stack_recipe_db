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

or use pip install - r requirements.txt

### creation and population of mysql database
(no need for seed to be used as population is by sql commands)
  - run mysql -u username -p (changing username for your actual user name)
  - input your password
  - run the following to create the database 'source db/schema.sql'
  - run the following to populate that database tables 'source db/data.sql'

### Connection string
Create a connection.js file to connect to the mysql database 'recipe_db'. This will read the id and password from the .env file which WILL NOT load up to GitHub as it is part of the .gitignore set up.

### Creation of js files for Routes and Models
create all models/routes .js files for using the CRUD method (GET, POST, PUT, DELETE).
One for each of the tables within the mysql database and calling them through index.js

### Creation of API call within the routes/api folder
Two main calls one for the recipe and one for the category. Everything else is linked through the api/recipe.js

### Authorisation through Middleware using JWT (jsonwebtoken)
This will verify the token used when logging in to the recipe website in oreder to retrieve the data

### Links
GitHub: https://github.com/stevehunt70/project_full_stack_recipe_db.git
YouTube: 