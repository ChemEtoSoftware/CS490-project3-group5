# pylint: disable=C0301
"""
unitTests without mocking:

1. This files tests the format funcitonality in Python.
2. Removing a user from the list of active users found in app.py on socket logout
"""
import unittest
from api_request_url import api
from user_remove import user_remove
from get_lat_long import get_lat_long

INPUT_PARAMETER = "pop"
EXPECTED_OUTPUT = "https://app.ticketmaster.com/discovery/v2/events.json?&keyword=pop"

class ApiUrl(unittest.TestCase):
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
    def test_add_parameter_success(self):
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

INPUT_DICT = "input"
OUTPUT = "output"

class GetStateCode(unittest.TestCase):
    """ success outputs and tests """
    def setUp(self):
        """ success outputs """
        self.success_test_parameters = [
            {
                INPUT_DICT : [40.7067838, -74.0101468],
                OUTPUT : 'NY'
            },
            {
                INPUT_DICT : [40.573504, -74.382711],
                OUTPUT : 'NJ'
            },
            {
                INPUT_DICT : [30.3321838, -81.655651],
                OUTPUT : 'FL'
            }
        ]

        self.failure_test_parameters = [
            {
                INPUT_DICT : [40.7067838, -74.0101468],
                OUTPUT : 'New York'
            },
            {
                INPUT_DICT : [40.573504, -74.382711],
                OUTPUT : 'N J'
            },
            {
                INPUT_DICT : [30.3321838, -81.655651],
                OUTPUT : 'FL Florida'
            }
        ]

    def test_get_state_code_success(self):
        """ success tests """
        for test in self.success_test_parameters:
            actual_result = get_lat_long(test[INPUT_DICT])
            expected_result = test[OUTPUT]
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(len(actual_result), len(expected_result))

    def test_get_state_code_failure(self):
        """ failure tests """
        for test in self.failure_test_parameters:
            actual_result = get_lat_long(test[INPUT_DICT])
            expected_result = test[OUTPUT]
            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(len(actual_result), len(expected_result))


if __name__ == '__main__':
    unittest.main()
    