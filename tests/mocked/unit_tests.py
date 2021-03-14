"""Tests functions that modify DB"""
import os
import sys
import unittest
from unittest.mock import patch
sys.path.append(os.path.abspath('../../'))
from app import on_winner, add_to_db
import models

INPUT = "user"
EXPECTED_OUTPUT = "expected"
FIRST_USER = 'user1'
USERNAME = 'username'
STATUS = 'status'
SCORE = 'score'
LETTER = 'letter'

class AddToDbTestCase(unittest.TestCase):
    """Tests that the add_to_db function is working properly"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:  'Kevin',
                EXPECTED_OUTPUT: [FIRST_USER, 'Kevin']
            },
            {
                INPUT: 'Irene',
                EXPECTED_OUTPUT: [FIRST_USER, 'Kevin', 'Irene'],
            },
            {
                INPUT : 'Joe',
                EXPECTED_OUTPUT: [FIRST_USER, 'Kevin', 'Irene', 'Joe']
            }
        ]
        initial_person = models.Person(username=FIRST_USER, score=100, letter='X')
        self.initial_db_mock = [initial_person]
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
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_query_all
                        actual_result = add_to_db(test[INPUT])
                        expected_result = test[EXPECTED_OUTPUT]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result, expected_result)
class WinnerTestCase(unittest.TestCase):
    """Tests that the add_to_db function is working properly"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:  {USERNAME : 'Kevin', STATUS : 'winner'},
                EXPECTED_OUTPUT: [{USERNAME : 'Kevin', SCORE : 101, LETTER : 'X'},
                                  {USERNAME : 'Joe', SCORE : 101, LETTER : 'O'},
                                  {USERNAME : 'Irene', SCORE : 100, LETTER : 'X'}]
            },
            {
                INPUT: {USERNAME : 'Irene', STATUS : 'loser'},
                EXPECTED_OUTPUT: [{USERNAME : 'Kevin', SCORE : 101, LETTER : 'X'},
                                  {USERNAME : 'Joe', SCORE : 101, LETTER : 'O'},
                                  {USERNAME : 'Irene', SCORE : 99, LETTER : 'X'}]
            },
            {
                INPUT : {USERNAME : 'Joe', STATUS : 'winner'},
                EXPECTED_OUTPUT: [{USERNAME : 'Joe', SCORE : 102, LETTER : 'O'},
                                  {USERNAME : 'Kevin', SCORE : 101, LETTER : 'X'},
                                  {USERNAME : 'Irene', SCORE : 99, LETTER : 'X'}]
            }
        ]
        KEVIN = models.Person(username='Kevin', score=100, letter='X')
        JOE = models.Person(username='Joe', score=101, letter='O')
        IRENE = models.Person(username='Irene', score=100, letter='X')
        self.initial_db_mock = [KEVIN, JOE, IRENE]
    def mocked_add(self, user):
        """Mocks db.session.add"""
        pass
    def mocked_commit(self):
        """Mocks db.session.commit"""
        pass
    def mocked_query(self, username):
        """Mocks query all"""
        for person in self.initial_db_mock:
            if person.username==username:
                return person
    def ordered_mocked_query(self, desc):
        """Mocks query ordering"""
        return sorted(self.initial_db_mock, key = lambda i : i.score, reverse=True)
    def test_on_winner(self):
        """Tests the add functions. Mocks everything"""
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_add):
                with patch('app.DB.session.commit', self.mocked_commit):
                    with patch('app.DB.session.query') as mocked_db_query:
                        mocked_db_query.return_value.filter_by = self.mocked_query
                        mocked_db_query.return_value.order_by = self.ordered_mocked_query
                        actual_result = on_winner(test[INPUT])
                        expected_result = test[EXPECTED_OUTPUT]
                        print(actual_result)
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result, expected_result)
if __name__ == '__main__':
    unittest.main()
    