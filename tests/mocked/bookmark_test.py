"""Tests functions that modify DB"""
import os
import sys
import unittest
from unittest.mock import patch
sys.path.append(os.path.abspath('../../'))
from app import on_bookmark
import models


INPUT = "id, event_id"
EXPECTED_OUTPUT = "expected"
ID = 'id'
EVENT_ID = 'event_id'

class AddBookmarkToDB(unittest.TestCase):
    """Tests that the add_to_db function is working properly"""
    def setUp(self):
        self.success_test_params = [
            {
                INPUT:  {ID : '234', EVENT_ID : '567'},
                EXPECTED_OUTPUT: [{ID : '1234', EVENT_ID : '1234'},
                                 {ID : '234', EVENT_ID : '567'}]
            },
            {
                INPUT: {ID : '678', EVENT_ID : '907'},
                EXPECTED_OUTPUT: [{ID : '1234', EVENT_ID : '1234'},
                                  {ID : '678', EVENT_ID : '907'}]
            },
            {
                INPUT : {ID : '1234', EVENT_ID : '5678'},
                EXPECTED_OUTPUT: [{ID : '1234', EVENT_ID : '1234'},
                                  {ID : '1234', EVENT_ID : '5678'}]
            }
        ]
        initial_person = models.Bookmark(id = '1234', event_id = '1234')
        self.initial_db_mock = [initial_person]
    def mocked_add(self, user):
        """Mocks db.session.add"""
        self.initial_db_mock.append(user)
    def mocked_commit(self):
        """Mocks db.session.commit"""
    
    def test_add_to_db(self):
        """Tests the add functions. Mocks everything"""
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_add):
                with patch('app.DB.session.commit', self.mocked_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_query_all
                        actual_result = on_bookmark(test[INPUT])
                        expected_result = test[EXPECTED_OUTPUT]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result, expected_result)