"""This module tests regular_append function of app"""
import unittest
import os
import sys
sys.path.append(os.path.abspath('../../'))
from helpers import regular_append, ordered_append, sum_of_arrays
import models

ARRAY_INPUT = "username"
EXPECTED_OUTPUT = "expected"
KEVIN = models.Person(username='Kevin', score=100, letter=None)
JOE = models.Person(username='Joe', score=101, letter=None)
IRENE = models.Person(username='Irene', score=99, letter=None)

class RegularAppendTestCase(unittest.TestCase):
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
class OrderAppendTestCase(unittest.TestCase):
    """Class is purely just for testing this function"""
    def setUp(self):
        self.success_test_params = [
            {
                ARRAY_INPUT: [KEVIN, JOE, IRENE],
                EXPECTED_OUTPUT: [{'username' : 'Kevin', 'score' : 100},
                                  {'username' : 'Joe', 'score' : 101},
                                  {'username' : 'Irene', 'score' : 99}]
            },
            {
                ARRAY_INPUT: [IRENE, JOE, KEVIN],
                EXPECTED_OUTPUT: [{'username' : 'Irene', 'score' : 99},
                                  {'username' : 'Joe', 'score' : 101},
                                  {'username' : 'Kevin', 'score' : 100}]
            },
            {
                ARRAY_INPUT: [JOE, KEVIN, IRENE],
                EXPECTED_OUTPUT: [{'username' : 'Joe', 'score' : 101},
                                  {'username' : 'Kevin', 'score' : 100},
                                  {'username' : 'Irene', 'score' : 99}]
            }
        ]

    def test_ordered_append(self):
        """Tests out all the test cases on the function"""
        for test in self.success_test_params:
            actual_result = ordered_append(test[ARRAY_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result[0], expected_result[0])
            self.assertEqual(actual_result[1], expected_result[1])
            self.assertEqual(actual_result[2], expected_result[2])
class SumOfArrayTestCase(unittest.TestCase):
    """Class is purely just for testing this function"""
    def setUp(self):
        self.success_test_params = [
            {
                ARRAY_INPUT: [
                    ['X', 'X', 'O', 'O', '', '', '', 'X', 'O'],
                    ['', '', '', '', '', '', '', '', '']
                ],
                EXPECTED_OUTPUT: ['X', 'X', 'O', 'O', '', '', '', 'X', 'O']
            },
            {
                ARRAY_INPUT: [
                    ['X', 'X', 'O', 'O', 'O', '', '', 'X', 'O'],
                    ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'X', 'X']
                ],
                EXPECTED_OUTPUT: ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'X', 'X']
            },
            {
                ARRAY_INPUT: [
                    ['', '', '', '', '', '', '', '', ''],
                    ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X']
                ],
                EXPECTED_OUTPUT: ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X']
            }
        ]

    def test_sum_of_arrays(self):
        """Tests out all the test cases on the function"""
        for test in self.success_test_params:
            actual_result = sum_of_arrays(test[ARRAY_INPUT][0], test[ARRAY_INPUT][1])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result, expected_result)
if __name__ == '__main__':
    unittest.main()
    