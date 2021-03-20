"""All the helper functions for the main functions
in app.py"""
def sum_of_arrays(arr1, arr2):
    """This function is purely for comparing if the previously held array is greater
    than the one currently passed. This is to prevent a new user who logged in
    from ruining the game"""
    sum1 = 0
    sum2 = 0
    for i in range(0, 9):
        if arr1[i] == 'X' or arr1[i] == 'O':
            sum1 += 1
        if arr2[i] == 'X' or arr2[i] == 'O':
            sum2 += 1
    if sum1 > sum2:
        return arr1
    return arr2
def regular_append(query_arr):
    """This function is just for appending to an array
    called users that gets returned"""
    users = []
    for person in query_arr:
        users.append(person.username)
    return users
def ordered_append(object_arr):
    """This function is for appending objects to array
    in ordered fashion."""
    ordered_users = []
    for score in object_arr:
        ordered_users.append({
            'username': score.username,
            'score': score.score})
    return ordered_users
def add_to_db(user, DB, models):
    """This function is purely just for adding the user to the db"""
    new_user = models.Person(username=user, score=100)
    DB.session.add(new_user)
    DB.session.commit()
    all_people = models.Person.query.all()
    users = regular_append(all_people)
    return users
    