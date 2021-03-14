"""This module tests regular_append function of app"""
import unittest
from app import regular_append
import models

ARRAY_INPUT = "username"
EXPECTED_OUTPUT = "expected"
KEVIN = models.Person(username='Kevin', score=100, letter=None)
JOE = models.Person(username='Joe', score=101, letter=None)
IRENE = models.Person(username='Irene', score=99, letter=None)

class OrderAppendTestCase(unittest.TestCase):
    """Class is purely just for testing this function"""
    def setUp(self):
        self.success_test_params = [
            {
                ARRAY_INPUT: [KEVIN, JOE, IRENE],
                EXPECTED_OUTPUT: ['Kevin', 'Joe', 'Irene']
            },
            {
                ARRAY_INPUT: [IRENE, JOE, KEVIN],
                EXPECTED_OUTPUT: ['Irene', 'Joe', 'Kevin']
            },
            {
                ARRAY_INPUT: [JOE, KEVIN, IRENE],
                EXPECTED_OUTPUT: ['Joe', 'Kevin', 'Irene']
            }
        ]

    def test_regular_append(self):
        """Tests out all the test cases on the function"""
        for test in self.success_test_params:
            actual_result = regular_append(test[ARRAY_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result[0], expected_result[0])
            self.assertEqual(actual_result[1], expected_result[1])
            self.assertEqual(actual_result[2], expected_result[2])
if __name__ == '__main__':
    unittest.main()
    