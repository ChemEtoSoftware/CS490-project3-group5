import unittest
import unittest.mock as mock
from unittest.mock import patch
import sys
import copy
import os

sys.path.append(os.path.abspath('../../'))
from app import on_bookmark, Users, Bookmarks
import models

from app import db_add_user
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'
INPUT = "id, event_id"
EXPECTED_OUTPUT = "expected"
ID = 'id'
EVENT_ID = 'eventID'

FIRST_ADDITION = Bookmarks(id='234', event_id='567')
SECOND_ADDITION = Bookmarks(id='678', event_id='907')
THIRD_ADDITION = Bookmarks(id='1234', event_id='5678')
INITIAL_PERSON = Bookmarks(id='1234', event_id='1234')

initial_user = Users(id="1234567", email="54321@email.com", firstName="NameFirst", familyName="NameLast", imageURL="url.img.jpg")
expected_user = Users(id="7654321", email="12345@email.com",firstName="firstname",familyName="lastname",imageURL="https://lh3.googleusercontent.com/754321")
class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {
                    "googleId": "7654321",
                    "email": "12345@email.com",
                    "givenName": "firstname",
                    "familyName": "lastname",
                    "imageUrl": "https://lh3.googleusercontent.com/754321",
                },
                KEY_EXPECTED: [initial_user, expected_user],
            },
        ]
        # initial_user = Users(id=INITIAL_ID, email="54321@email.com", firstName="NameFirst", familyName="NameLast", imageURL="url.img.jpg")
        self.db_mock_init = [initial_user]
        
    def mocked_db_session_add(self, user):
        self.db_mock_init.append(user)
    
    def mocked_db_session_commit(self):
        # return self.db_mock_init
        pass
    def mocked_user_query_all(self):
        return self.db_mock_init

    def test_add_user_success(self):
        print('Start of testing add_user_to_database')
        for test in self.success_test_params:
            self.db_mock_init = [initial_user]
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('app.Users.query') as mocked_query:
                        mocked_query.all= self.mocked_user_query_all
                        print(self.db_mock_init)
                        db_add_user(test[KEY_INPUT])
                        actual_result = self.db_mock_init
                        expected_result = test[KEY_EXPECTED]
                        print("\tA:",actual_result)
                        print("\tE:",expected_result)
                        print("\tM DB:",self.db_mock_init)
                        # print("before asserts")
                        self.assertEqual(len(actual_result), len(expected_result))
                    # print("after asserts")
            print('end of test\n')
class AddBookmarkToDB(unittest.TestCase):
    """Tests that the add_to_db function is working properly"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:  {ID : '234', EVENT_ID : '567'},
                EXPECTED_OUTPUT: [INITIAL_PERSON, FIRST_ADDITION]
            },
            {
                INPUT: {ID : '678', EVENT_ID : '907'},
                EXPECTED_OUTPUT: [INITIAL_PERSON, FIRST_ADDITION, SECOND_ADDITION]
            },
            {
                INPUT : {ID : '1234', EVENT_ID : '5678'},
                EXPECTED_OUTPUT: [INITIAL_PERSON, FIRST_ADDITION, SECOND_ADDITION, THIRD_ADDITION]
            }
        ]
        self.initial_db_mock = [INITIAL_PERSON]
    def mocked_add(self, user):
        """Mocks db.session.add"""
        self.initial_db_mock.append(user)
    def mocked_commit(self):
        """Mocks db.session.commit"""
    def mocked_query_all(self):
        """Mocks query all"""
        return self.initial_db_mock
    def test_add_to_db(self):
        """Tests the add functions. Mocks everything"""
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_add):
                with patch('app.DB.session.commit', self.mocked_commit):
                    with patch('app.Bookmarks.query') as mocked_query:
                        mocked_query.all = self.mocked_query_all
                        actual_result = on_bookmark(test[INPUT])
                        expected_result = test[EXPECTED_OUTPUT]
                        self.assertEqual(len(actual_result), len(expected_result))
                        # self.assertEqual(actual_result, expected_result)
if __name__ == '__main__':
    unittest.main()
