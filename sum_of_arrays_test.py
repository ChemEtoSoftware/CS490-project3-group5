"""This module tests the sum_of_arrays function from app"""
import unittest
from app import sum_of_arrays

ARRAY_INPUT = "username"
EXPECTED_OUTPUT = "expected"

class OrderAppendTestCase(unittest.TestCase):
    """Class is purely just for testing this function"""
    def setUp(self):
        self.success_test_params = [
            {
                ARRAY_INPUT: [['X', 'X', 'O', 'O', '', '', '', 'X', 'O'], ['', '', '', '', '', '', '', '', '']],
                EXPECTED_OUTPUT: ['X', 'X', 'O', 'O', '', '', '', 'X', 'O']
            },
            {
                ARRAY_INPUT: [['X', 'X', 'O', 'O', 'O', '', '', 'X', 'O'], ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'X', 'X']],
                EXPECTED_OUTPUT: ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'X', 'X']
            },
            {
                ARRAY_INPUT: [['', '', '', '', '', '', '', '', ''], ['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X']],
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
    