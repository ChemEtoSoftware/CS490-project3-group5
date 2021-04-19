'''util function for unmocked test'''
def user_remove(name):
    '''testing the function to remove a variable from the list'''
    list_of_active_users = ['Ivana', 'Xavier', 'Pranavi', 'Kevin', 'Naman', 'David']
    list_of_active_users.remove(name)
    return list_of_active_users
    