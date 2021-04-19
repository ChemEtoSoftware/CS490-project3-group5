"""Tests functions that modify DB"""
import unittest
from unittest.mock import patch
import sys
import os
sys.path.append(os.path.abspath('../../'))
from app import on_bookmark, Bookmarks

INPUT = "id, event_id"
EXPECTED_OUTPUT = "expected"
ID = 'id'
EVENT_ID = 'event_id'

FIRST_ADDITION = Bookmarks(id='234', event_id='567')
SECOND_ADDITION = Bookmarks(id='678', event_id='907')
THIRD_ADDITION = Bookmarks(id='1234', event_id='5678')
INITIAL_PERSON = Bookmarks(id='1234', event_id='1234')
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
                EXPECTED_OUTPUT: [INITIAL_PERSON, SECOND_ADDITION]
            },
            {
                INPUT : {ID : '1234', EVENT_ID : '5678'},
                EXPECTED_OUTPUT: [INITIAL_PERSON, THIRD_ADDITION]
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
                        self.assertEqual(actual_result, expected_result)
if __name__ == '__main__':
    unittest.main()
    