# Project 3

This is an event discovery app - EventGuru! We aim to deliver an event discovery and searching app accessible form the browser. 
This app will provide uses with the ability to view events, look up the event venue on a map, bookmark events, and interact (like and comment on) 
with events. We have yet to see an event searching app that allows for user interaction in the way we hope to deliver this project. The flow of 
our application will be more natural and straigtforward in comparison to other event discover application. We built our web app using Flask in the 
backend and React/Js in the front end, tying it together with endpoint client-server communication. The app features the Google login and registration
authentication and is deployed on Herolu. It has a separate databse hosted on Heroku for app feature functionalities (bookmarks, comments, likes)
and user information (user's name, Google ID, email).

## Heroku App Link

1. [Click here to view our unpolished web applicaition! (Sprint 1)](https://damp-mesa-15975.herokuapp.com/)
2. [Click here to view our polished web applicaition! (Sprint 2)](https://evening-ocean-01062.herokuapp.com/)

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
13. `pip install ratelimit`
14. `npm install react-leaflet`
15. `npm install -D @types/leaflet`
16. `pip install ratelimiter`
17. `pip install geocoder`
18. `pip install geopy`
19. `pip install -Iv uszipcode==0.2.4`
20. `npm install react-icons --save`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## API Setup

1. Register this web application as a project on your TicketMaster Developer account: [Follow the link here](https://developer-acct.ticketmaster.com/user/login?destination=user)
2. Register this web application as a project on your Google Developer account: [Follow the link here](https://developers.google.com/identity/sign-in/web/sign-in)
3. Add your local testing environment URL as an authorized redirect URI and an authorized JavaScript origin URL in your app on the Google Cloud Platform.
4. Put these variables in a `.env` file as follows: 
   `export GOOGLE_CLIENT_ID="YOUR_CLIENT_ID"` <-- From Google Cloud Platfrom
   `export GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET"` <-- From Google Cloud Platfrom
   `export APIKEY='YOUR_API_KEY'` <-- From Ticketmaster Developer Account
   
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

## Database Initialization

1. In the terminal, run python to open an interactive session
2. One by one, add the following lines: 
`from app import DB` 
`import models`
`DB.create_all()`
`admin = models.Users(id='0', email='admin@gmail.com', firstName='admin', familyName='user', imageURL='www.example.com')`
`DB.session.add(admin)`
`DB.session.commit()`
3. To make sure this worked, run the following line in the same interactive session (If you see the admin as a Users entry, then it worked!): models.Users.query.all()
4. To make sure that this user was added to the Heroku database, connect to it using heroku pg:psql
5. To see all tables, run the command \d; the person table should be in there
6. To query the data in the person table, run the query SELECT * FROM users; the admin user should be in there

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Heroku Deployment

1. Add and commit all of the files using git
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Add python buildpack: `heroku buildpacks:add --index 2 heroku/python`
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

1. Upon login, users will have to wait 5-10 seconds to see any events or components pop us. This delay is caused by the geolocator functionality. To generate a list of local events for each user, the program gets the user's longitude and latitutde coordinates, converts the coordinates to an address to extract the zipcode, uses the zipcode to generate the associated state code (2-letter form of the state), and sends a request url to the TicketMaster API to get the list of local events. This whole process takes a significantly visible amount of time. This explains why there is a waiting time between logging in and seeing local events pop up. The web applicaiton fully functions even if the user diables location sharing, but this particular feature of generating local events will not work if the user doesn't allow locaiton sharing.
2. Once events show up after logging in, users will see alist of local events as well as a map at the bottom of the web application. At first glance, the map will look empty and will not have any visible markers. However, users must zoom out on the map (click the minus sign) to see markers for events listed on the landing page after login. Upon clicking a marker, users can then see which marker is associated with which listed event.
3. After clicking on an event div, users will have the ability to like or dislike an event; once either like or dislike is clicked, the user cannot undo the click and cannot add another like or dislike in the same session. However, if a user goes back home and clicks on the same event div again, the user can once again click on the like or dislike button for that same event.
4. If a user wants to add a comment to an event, they cannot add the same comment to the same event. If a user tries to add the same comment more than once to the same event, a key error will show up. The key generated and stored for each comment is a MD5 hash made from the user's name and comment; so if the same comment is enetered by the smae user for the same event, there will be a repititon in the list of keys and will cause the program to break.

## Technical Issues 

1. We had a hard time working with GitHub and integrating all of our code together. We ran into a few merging problems because several people were pushing and pulling code at the same time. We resolved these issues by having meetings several times throughout the week as a group or with just a few people from the group and discussing the problems and action items together.
2. We also had a hard time with a few dependencies that we each had to install on our local environments to test the app in its fullest functionality. For example, semantic-ui-reaact and react-google-login posed many problems when we tested each others working components on our local environments.
