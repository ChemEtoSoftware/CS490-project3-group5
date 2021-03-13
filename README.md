# Project 2

## Milestone 2
1. If you want to clone this repo, just remember that you need to have all the libraries in requirements.txt. That means sql_alchemy, flask_sql_alchemy, socketio, etc. All are required for this program to run.
2. First run "npm run start" on a terminal window, then "python app.py" on another terminal window (provided this isn't being run through Heroku). If you want to remove a user from the database, make sure to click logout.
3. If you're going to run this on heroku, you need to setup a postgressql database on the heroku end. I'd recommend deleting any apps from the directory that were previously open. 
4. Initialize your DB from the terminal.

* A known problem is how ugly my code is, and its lack of modularity. Given more time for this milestone, I'd have split up all the functions and components further into separate files. It would have helped my program look a lot better.
* Another thing I'd like to have fixed was the issue with the program incrementing/decrementing the user's score by 2 instead of one. I ran console logs, and both users show they only emit to the socket once, but the socket prints twice for each user. 

* Issues I ran into were numerous. This biggest pain was re-rendering. I figured I should give my useEffects arguments to prevent them constantly re-rendering anytime a state was updated. I also tried to make my code more conditional, so that 
* it wasn't constantly re-rendering everything. I also kept having timeout issues on the server end, because of a function I had that was supposed to update a user's letter to X or O. I realized I could just write that code inside the login
* function instead. My winner function is similar to what that function was like, in that it queries the DB and sends data to the client. I believe it stopped having timeout issues because I gave my useEffects arguments for when to re-render. 

IMPORTANT:
    The program stores a previous board just in case a spectator logs in during a game. If you close all tabs with the server running, then open up new tabs and log in as different users, the old board will display. Hit reset just to
    override this issue. Have to edit this file so that git will push to heroku