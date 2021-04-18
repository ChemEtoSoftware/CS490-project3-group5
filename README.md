# EventGuru - Flask & React App

## Requirements

1. `npm install`
2. `pip install -r requirements.txt`
3. `pip install flask-socketio`
4. `pip install flask-cors`
5. `cd` into CS490-project3-group5 directory. Run `npm install socket.io-client --save`
6. `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`
7. `pip install psycopg2-binary`
8. `pip install Flask-SQLAlchemy==2.1`
9. `npm install --save-dev --save-exact prettier`
10. `pip install yapf`
11. `npm info "eslint-config-airbnb@latest" peerDependencies`
12. `pip install pylint`
13. `npm install semantic-ui-react semantic-ui-css`
14. `npm install node-fetch`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application

1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Databases Setup

1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes to all prompts.
2. Initialize PSQL database: `sudo service postgresql initdb`
3. Start PSQL: `sudo service postgresql start`
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` If you get an error saying "could not change directory", that's okay! It worked!
5. Make a new database: `sudo -u postgres createdb $USER` If you get an error saying "could not change directory", that's okay! It worked!
6. Make sure your user shows up:
   1. `psql`
   2. `\du`look for ec2-user as a user
   3. `\l` look for ec2-user as a database
7. Make a new user:
   1. `psql` (if you already quit out of psql)
   2. Type this with your username and password (DONT JUST COPY PASTE): `create user some_username_here superuser password 'some_unique_new_password_here';` e.g.  `create user ivana superuser password 'mysecretpassword123';`
   3. `\q` to quit out of sql
8. Save your username and password in a sql.env file with the format `SQL_USER=` and `SQL_PASSWORD=`
9. To use SQL in Python: `pip install psycopg2-binary`
10. `pip install Flask-SQLAlchemy==2.1`

## Deploy to Heroku

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Login and fill creds: `heroku login -i`
4. Create a new Heroku app: `heroku create`
5. Create a new remote DB on your Heroku app: `heroku addons:create heroku-postgresql:hobby-dev`
   (If that doesn't work, add a `-a {your-app-name}` to the end of the command, no braces)
6. See the config vars set by Heroku for you: `heroku config`. Copy paste the value for DATABASE_URL
7. Set the value of `DATABASE_URL` as an environment variable by entering this in the terminal: `export DATABASE_URL='copy-paste-value-in-here'`
8. Also create a .env file and inside it add: `DATABASE_URL='copy-paste-value-in-here'`
9. Push to Heroku: set up automatic push in github.