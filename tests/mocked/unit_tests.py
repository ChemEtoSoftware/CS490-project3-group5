'''Mocked Unit Tests'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import sys
import copy
import os

sys.path.append(os.path.abspath('../../'))
from app import on_bookmark, Users, Bookmarks, Comments, LikesDislikes
import models

from app import db_add_user, db_add_comment
from app import  add_event_id, mock_on_likes_dislikes
KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'
INPUT = "id, event_id"
EXPECTED_OUTPUT = "expected"
ID = 'id'
EVENT_ID = 'eventID'

FIRST_ADDITION = Bookmarks(id='234', event_id='567')
SECOND_ADDITION = Bookmarks(id='678', event_id='907')
THIRD_ADDITION = Bookmarks(id='1234', event_id='5678')
INITIAL_PERSON = Bookmarks(id='1234', event_id='1234')

initial_user = Users(id="1234567", email="54321@email.com", firstName="NameFirst", familyName="NameLast", imageURL="url.img.jpg")
expected_user = Users(id="7654321", email="12345@email.com",firstName="firstname",familyName="lastname",imageURL="https://lh3.googleusercontent.com/754321")
class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {
                    "googleId": "7654321",
                    "email": "12345@email.com",
                    "givenName": "firstname",
                    "familyName": "lastname",
                    "imageUrl": "https://lh3.googleusercontent.com/754321",
                },
                KEY_EXPECTED: [initial_user, expected_user],
            },
        ]
        # initial_user = Users(id=INITIAL_ID, email="54321@email.com", firstName="NameFirst", familyName="NameLast", imageURL="url.img.jpg")
        self.db_mock_init = [initial_user]
        
    def mocked_db_session_add(self, user):
        self.db_mock_init.append(user)
    
    def mocked_db_session_commit(self):
        # return self.db_mock_init
        pass
    def mocked_user_query_all(self):
        return self.db_mock_init

    def test_add_user_success(self):
        print('Start of testing add_user_to_database')
        for test in self.success_test_params:
            self.db_mock_init = [initial_user]
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('app.Users.query') as mocked_query:
                        mocked_query.all= self.mocked_user_query_all
                        print(self.db_mock_init)
                        db_add_user(test[KEY_INPUT])
                        actual_result = self.db_mock_init
                        expected_result = test[KEY_EXPECTED]
                        print("\tA:",actual_result)
                        print("\tE:",expected_result)
                        print("\tM DB:",self.db_mock_init)
                        # print("before asserts")
                        self.assertEqual(len(actual_result), len(expected_result))
                    # print("after asserts")
            print('end of test\n')

initial_comment = Comments(commentId="001", event_id="002", username="username", text="Comment", head="000", tail="below", depth=0)
expected_comment = Comments(commentId="002", event_id="003", username="username2", text="Comment2", head="001", tail="below", depth=0)
class AddCommmentToDB(unittest.TestCase):
    """Tests comment DB functionality"""
    def setUp(self):
        self.successful_test_params = [
            {
                KEY_INPUT: {
                    "client_id": "001",
                    "text": "Comment2",
                    "event_id": "003",
                    "name": "username2"
                },
                KEY_EXPECTED: [initial_comment, expected_comment],
            },
        ]
        # initial_user = Users(id=INITIAL_ID, email="54321@email.com", firstName="NameFirst", familyName="NameLast", imageURL="url.img.jpg")
        self.db_mock_init = [initial_comment]
        
    def mocked_db_session_add(self, comment):
        self.db_mock_init.append(comment)
    
    def mocked_db_session_commit(self):
        # return self.db_mock_init
        pass
    def mocked_user_query_all(self):
        return self.db_mock_init

    def test_add_comment_success(self):
        print('Start of testing add_user_to_database')
        for test in self.successful_test_params:
            self.db_mock_init = [initial_comment]
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('app.Users.query') as mocked_query:
                        mocked_query.all= self.mocked_user_query_all
                        print(self.db_mock_init)
                        db_add_comment(
                            test[KEY_INPUT]["client_id"],
                            test[KEY_INPUT]["text"],
                            test[KEY_INPUT]["event_id"],
                            test[KEY_INPUT]["name"],
                            )
                        actual_result = self.db_mock_init
                        expected_result = test[KEY_EXPECTED]
                        print("\tA:",actual_result)
                        print("\tE:",expected_result)
                        print("\tM DB:",self.db_mock_init)
                        # print("before asserts")
                        self.assertEqual(len(actual_result), len(expected_result))
                    # print("after asserts")
            print('end of test\n')

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
                EXPECTED_OUTPUT: [INITIAL_PERSON, FIRST_ADDITION, SECOND_ADDITION]
            },
            {
                INPUT : {ID : '1234', EVENT_ID : '5678'},
                EXPECTED_OUTPUT: [INITIAL_PERSON, FIRST_ADDITION, SECOND_ADDITION, THIRD_ADDITION]
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
                        # self.assertEqual(actual_result, expected_result)
INITIAL_EVENT = '00'
class AddEventIdTestCase(unittest.TestCase):
    '''Mocked Unit Test to check if eventID is added to DB'''
    def setUp(self):
        '''successful cases'''
        self.success_test_params = [{
            KEY_INPUT: '01',
            KEY_EXPECTED: [INITIAL_EVENT, '01'],
        }, {
            KEY_INPUT:
            '02',
            KEY_EXPECTED: [INITIAL_EVENT, '01', '02'],
        }, {
            KEY_INPUT:
            '03',
            KEY_EXPECTED: [INITIAL_EVENT, '01', '02', '03'],
        }]

        initial_event = LikesDislikes(eventID=INITIAL_EVENT, likes=0, dislikes=0)
        self.initial_db_mock = [initial_event]

    def mocked_db_session_add(self, event_id):
        '''Mocks db.session.add'''
        self.initial_db_mock.append(event_id)

    def mocked_db_session_commit(self):
        '''none'''
        pass

    def mocked_person_query_all(self):
        '''mocks the event query db'''
        return self.initial_db_mock

    def test_success(self):
        '''successful cases'''
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit',
                           self.mocked_db_session_commit):
                    with patch('app.LikesDislikes.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        print(self.initial_db_mock)
                        actual_result = add_event_id(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]

                        self.assertEqual(len(actual_result),
                                         len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])
class OnLikesDislikesTestCase(unittest.TestCase):
    '''Mock Unit Test for testing if likes and dislikes increment'''
    def setUp(self):
        '''setup for parameters'''
        self.success_test_params = [
            {
                KEY_INPUT: ['event1'],
                KEY_EXPECTED: [0, 0],
            },
            {
                KEY_INPUT: ['event1'],
                KEY_EXPECTED: [1, 1],
            },
            {
                KEY_INPUT: ['event2'],
                KEY_EXPECTED: [0, 0],
            },
            {
                KEY_INPUT: ['event1'],
                KEY_EXPECTED: [2, 2],
            },
        ]

        event1 = LikesDislikes(eventID='event1', likes=0, dislikes=0)
        event2 = LikesDislikes(eventID='event2', likes=0, dislikes=0)
        self.initial_db_mock = [event1, event2]

        print(self.initial_db_mock)

    def mocked_query_get(self, first_event):
        '''mocking the db with event'''
        return self.initial_db_mock(LikesDislikes).get(first_event)

    def mocked_likes_dislikes(self, event1):
        '''mocking the likes of db'''
        return event1.likes + 1

    def mocked_db_session_commit(self):
        '''none'''
        pass

    def test_split_success(self):
        '''successful test cases'''
        for test in self.success_test_params:
            first_event = test[KEY_INPUT][0]
            with patch('app.DB.session.query') as mocked_query:
                mocked_query.get = self.mocked_query_get
                actual_result = mock_on_likes_dislikes(first_event)
                expected_result = test[KEY_EXPECTED]
                self.assertEqual(len(actual_result), len(expected_result))
if __name__ == '__main__':
    unittest.main()
