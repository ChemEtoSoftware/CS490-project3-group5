# Project 3

This is an event discovery app - EventGuru! We aim to deliver an event discovery and searching app accessible form the browser. 
This app will provide uses with the ability to view events, look up the event venue on a map, bookmark events, and interact (like and comment on) 
with events. We have yet to see an event searching app that allows for user interaction in the way we hope to deliver this project. The flow of 
our application will be more natural and straigtforward in comparison to other event discover application. We built our web app using Flask in the 
backend and React/Js in the front end, tying it together with endpoint client-server communication. The app features the Google login and registration
authentication and is deployed on Herolu. It has a separate databse hosted on Heroku for app feature functionalities (bookmarks, comments, likes)
and user information (user's name, Google ID, email).

## Heroku App Link

[Click here to view our web applicaition!](https://damp-mesa-15975.herokuapp.com/)

## Copy this repo

1. On your GitHub account, create a new repository
2. In the terminal of your home directory, clone this repo: `git clone https://github.com/ChemEtoSoftware/CS490-project3-group5.git`
3. Change the current working directory into the cloned directory and you should see all of these project files
4. Connect this cloned repo to your GitHub repo from Step 1: `git remote set-url origin https://www.github.com/{your-username}/{your-repo-name}`
5. Push the local repo to the remote repo: `git push origin main`

## Requirements

In your terminal:

1. `pip install python-dotenv`
2. `pip install requests`
3. `pip install -U Flask`
4. `npm install -g heroku`
5. `pip install -U flask-cors`
6. `pip install flask-socketio`
7. `npm install semantic-ui-react`
8. `npm install react-google-login`
9. `npm install`
10. `pip install -r requirements.txt`
11. `cd` into react-starter directory. Run `npm install socket.io-client --save`
12. `pip install pylint`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## API Setup

1. Register this web application as a project on your TicketMaster Developer account: [Follow the link here](https://developer-acct.ticketmaster.com/user/login?destination=user)
2. Register this web application as a project on your Google Developer account: [Follow the link here](https://developers.google.com/identity/sign-in/web/sign-in)
3. Add your local testing environment URL as an authorized redirect URI and an authorized JavaScript origin URL in your app on the Google Cloud Platform.
4. Put these variables in a `.env` file as follows: 
   `export GOOGLE_CLIENT_ID="YOUR_CLIENT_ID"`
   `export GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET"`
   `export APIKEY='YOUR_API_KEY'`
   
## Database Setup

1. `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`
2. `sudo service postgresql initdb`
3. `sudo service postgresql start`
4. `sudo -u postgres createuser --superuser $USER` If you get an error saying "could not change directory", that's okay! It worked!
5. `sudo -u postgres createdb $USER` If you get an error saying "could not change directory", that's okay! It worked!
6. Make a new user:
   a) `psql` (if you already quit out of psql)
   b) Type this with your username and password (DONT JUST COPY PASTE): `create user some_username_here superuser password 'some_unique_new_password_here'`; e.g. create user pranavi superuser password 'mysecretpassword123';
   c) \q to quit out of sql
7. Save your username and password in a sql.env file with the format SQL_USER= and SQL_PASSWORD=.
8. To use SQL in Python: pip install psycopg2-binary
9. In your terminal: `pip install Flask-SQLAlchemy==2.1`

## Heroku Setup

1. Create an account on Heroku: [Sign up for a free account](https://signup.heroku.com/login)
2. Login and fill creds: heroku login -i
3. Create a new Heroku app: heroku create
4. Create a new remote DB on your Heroku app: heroku addons:create heroku-postgresql:hobby-dev (If that doesn't work, add a -a {your-app-name} to the end of the command, no braces)
5. See the config vars set by Heroku for you: heroku config. Copy paste the value for `DATABASE_URL`
6. Set the value of `DATABASE_URL` as an environment variable by entering this in the terminal: `export DATABASE_URL='copy-paste-value-in-here'`

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Heroku Deployment

1. Add and commit all of the files using git
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/python`
4. Push all code to Heroku: `git push heroku main`
5. Go to your [Heroku dashboard](https://dashboard.heroku.com/apps) and open your application's settings
6. Run your application in you terminal: `heroku open`

## Linting
1. Pylint:
   a) E1101 - This is used when a variable is accessed for an nonexistant member. The inferencing mechanism makes it hard for Pylint to always refer to the right types, especially when using SQLAlchemy in our scenario.
   b) C0413 - This is used when the code and imports are mixed up. It is necessary for us to import models only after creatign a db variable to prevent circular imports in the set up of our DB.
   c) W1508 - This is whed when env manipulations functions does not return None or str values. In the case that we enter env variables not in string format, we can make sure this error does not stop the code from functioning properly. 
   d) R0903 - This is used when a class has too few public methods. Since we need only a limited number of public menthods for the web app to run as expected, it is not necessary for us to add unecessary lines of code to the server side of the application.
   e) W0603 - This is used when the code contains global statements at the module level. For us to maintain our data and esaily access it across several methods, it is important for us to declare globar variables and maintain memory of DB data on the server side. 
   f) W0702 - This is used when an except clause does not specify exception types to catch. Since we do not know what types of errors the API will respond with for the get requests, we have to assume that any and all errors can come in; catcing all of these errors is important for us to know so that we can inform the user about entering invalud inputs.
   g) C0301 - This is used when a line of code is too long. Since we wanted to run an unmocked test on the request url being sent to the TicketMaser API, we need to use the base url, which exceeds the length limit; disabling this error is important for us to run the unmocked tests.
2. Eslint:
   a) label-has-associated-control - This enforces that a label tag has a text label and an associated control. For us to layout our elements in an attractive form on the web app, it is important for us to put the labels and associated input text tags in separete containers; this feature is limiting how we layout all the elements on the page.
   b) label-has-for - This enforces that a label tag has an associated control. Some of the labels displayed on our web app are not associated with any other user interactions tags or elements on the page; this feature is limiting how we layout all the elements on the page.
   c) no-underscore-dangle - This enforces that there are no dangling underscores in identifiers. In order for us to extract the right data from the API response json object, we must serch through a key called `_embedded`; this feature is limiting what keys we search through in the json object that is returend from the API.
   d) `App.test.js` ignored, unit tests were not linted following Project 2 Milestone 3 specifications. `.eslintrc.js`  is ignored, as hidden files should not be linted, as they are not code that is executed at runtime.

## Known Problems

1. We have to still beautify our web application. A lot of the componenets and features of the app are currenlty in rigid containers but we are hoping to fix that by the end of Sprint 2.
2. The event page is still a work in progress because a lot of the features to be displayed on the page are Sprint 2 user stories. Thus, the event page looks unlike the design mockups from our project specs.
3. After clicking on an event div to bookmark, a user is unable to run a new search query, as the event div is not replaced by new results. To show the results, the user must refresh the page.

## Technical Issues 

1. We had a hard time working with GitHub and integrating all of our code together. We ran into a few merging problems because several people were pushing and pulling code at the same time. We resolved these issues by having meetings several times throughout the week as a group or with just a few people from the group and discussing the problems and action items together.
2. We also had a hard time with a few dependencies that we each had to install on our local environments to test the app in its fullest functionality. For example, semantic-ui-reaact and react-google-login posed many problems when we tested each others working components on our local environments.
