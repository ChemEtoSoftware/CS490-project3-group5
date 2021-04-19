# pylint: disable=C0301
"""
unitTests without mocking:

1. This files tests the format funcitonality in Python.
2. Removing a user from the list of active users found in app.py on socket logout
"""
import unittest
from api_request_url import api
from user_remove import user_remove

INPUT_PARAMETER = "pop"
EXPECTED_OUTPUT = "https://app.ticketmaster.com/discovery/v2/events.json?&keyword=pop"

class InGameTestCase(unittest.TestCase):
    """ success outputs and tests """
    def setUp(self):
        """ success outputs """
        self.success_test_parameters = [
            {
                INPUT_PARAMETER : "pop",
                EXPECTED_OUTPUT : "https://app.ticketmaster.com/discovery/v2/events.json?&keyword=pop"
            },
            {
                INPUT_PARAMETER : "",
                EXPECTED_OUTPUT : "https://app.ticketmaster.com/discovery/v2/events.json?"
            },
            {
                INPUT_PARAMETER : "pop corn",
                EXPECTED_OUTPUT : "https://app.ticketmaster.com/discovery/v2/events.json?&keyword=pop corn"
            }
        ]
    def test_add_user_success(self):
        """ success tests """
        for test in self.success_test_parameters:
            actual_result = api(test[INPUT_PARAMETER])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result.index(test[INPUT_PARAMETER]), expected_result.index(test[INPUT_PARAMETER]))
            self.assertEqual(len(actual_result), len(expected_result))

KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

class UsersRemoveTestCase(unittest.TestCase):
    '''Unit test to remove a variable from a list'''
    def setUp(self):
        self.success_test_params = [{
            KEY_INPUT: 'Ivana',
            KEY_EXPECTED: ['Xavier', 'Pranavi', 'Kevin', 'Naman', 'David'],
        }, {
            KEY_INPUT: 'Xavier',
            KEY_EXPECTED: ['Ivana', 'Pranavi', 'Kevin', 'Naman', 'David'],
        }, {
            KEY_INPUT: 'David',
            KEY_EXPECTED: ['Ivana', 'Xavier', 'Pranavi', 'Kevin', 'Naman'],
        }]

        self.failure_test_params = [{
            KEY_INPUT: 'Naman',
            KEY_EXPECTED: ['Xavier', 'Pranavi', 'Kevin', 'Naman', 'David' '', ''],
        }, {
            KEY_INPUT: 'Kevin',
            KEY_EXPECTED: ['Kevin', 'Ivana', ''],
        }, {
            KEY_INPUT: 'Pranavi',
            KEY_EXPECTED: 'User',
        }]

    def test_user_remove_success(self):
        '''Success case for test'''
        for test in self.success_test_params:

            actual_result = user_remove((test[KEY_INPUT]))
            #print(actual_result)
            expected_result = test[KEY_EXPECTED]

            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result[0], expected_result[0])

    def test_user_remove_failure(self):
        '''Failure case for test'''
        for test in self.failure_test_params:

            actual_result = user_remove((test[KEY_INPUT]))
            expected_result = test[KEY_EXPECTED]

            self.assertNotEqual(len(actual_result), len(expected_result))
            self.assertNotEqual(actual_result[0], expected_result[0])


if __name__ == '__main__':
    unittest.main()
    