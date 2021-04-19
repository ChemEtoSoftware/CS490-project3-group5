# pylint: disable=C0301
"""
unitTests without mocking:

This files tests the format funcitonality in Python.
"""
import unittest
from api_request_url import api


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

if __name__ == '__main__':
    unittest.main()
    