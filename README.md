## Tool Share

Web app for listing and sharing tools with nearby users.

Click here for live site deployment
https://tool-share.herokuapp.com/

## Clone/Deploy instructions

1. `git clone`
2. cd into directory
3. `npm install`
4. Set up Heroku + Mongolab
5. Add following line to your shell configurations

  #MongoDB - Heroku - access URI
  export MONGOLAB_URI='put in URI here'
  for instructions you can find it from https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri

6. `npm start` for local deployment

##Coding standards
.jscsrc - Using AirBnB standard
https://github.com/airbnb/javascript

.jshintrc - Credit to felixge
https://github.com/felixge/node-style-guide

##Application structure
/models - Mongo Schemas

/helpers - test categories and tool names

/public/javascripts - front end js

/routes - express routing for key functionality. express-resources a key npm package

/views - view engine templates created using Jade

