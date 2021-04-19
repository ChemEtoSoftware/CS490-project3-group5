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

from app import on_login
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INITIAL_USER = {
    "id"
}

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'Test_one',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Test_one'],
            },
            {
                KEY_INPUT: 'Test_two',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Test_two'],
            },
            {
                KEY_INPUT: 'Test_three',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Test_three'],
            },
        ]
        initial_player = Players(username=INITIAL_USERNAME, wins=100,loss=100)
        self.db_mock_init = [initial_player.username]
    
    def mocked_db_session_add(self, username):
        self.db_mock_init.append(username.username)
    
    def mocked_db_session_commit(self):
        return self.db_mock_init
    

    def test_add_user_success(self):
        print('Start of testing add_user_to_database')
        for test in self.success_test_params:
            self.db_mock_init = [INITIAL_USERNAME]
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    add_user(test[KEY_INPUT])
                    actual_result = self.db_mock_init
                    expected_result = test[KEY_EXPECTED]
                    
                    print("\tA:",actual_result)
                    print("\tE:",expected_result)
                    print("\tM DB:",self.db_mock_init)
                    
                    # print("before asserts")
                    self.assertEqual(len(actual_result), len(expected_result))
                    for i in range(len(actual_result)):
                        self.assertEqual(actual_result[i], expected_result[i])
                    # print("after asserts")
            print('end of test\n')

if __name__ == '__main__':
    unittest.main()
