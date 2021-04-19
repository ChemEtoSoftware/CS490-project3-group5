import unittest
import unittest.mock as mock
from unittest.mock import patch
import sys
import copy
import os

sys.path.append(os.path.abspath('../../'))
from app import DB
from app import Users
import models

from app import db_add_user
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

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

if __name__ == '__main__':
    unittest.main()
