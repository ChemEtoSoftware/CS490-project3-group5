# Project 2

## Milestone 1
This was a struggle to get running, but I finally managed. Logging out ended up not working. I had problems with setting the user as X or O, but I was able to get it done by passing setUserLetter as a function and modifying the states like that.
I'd initially tried just doing it from inside onLogin, but the states update asynchronously, so I had to create a separate function for this to work. I also had an issue with getting the conditionals setup, initially. 
I tried using an if else statement and just putting the code in those huge blocks, but then I couldn't declare my functions normally. This also wouldn't work because of how isLoggedIn is updated asynchronously.
So, after reading through the provided documentation, I realized I could just choose what's rendered by using variables. It made it work finally.

What I would do to improve is to definitely made it prettier. It sure is ugly to look at. But it works.