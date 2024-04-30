import unittest
from unittest.mock import MagicMock, patch
import json
import sys
import pandas as pd

sys.modules['pyodide'] = MagicMock()

from test1 import mult
from input_to_df import input_to_df

class TestAll(unittest.TestCase):

    def test_test1(self):
        self.assertEqual(mult(3, 2), 6)

    def test_pandas(self):
        d = {'col1': [1, 2], 'col2': [3, 4]}
        df_1 = pd.DataFrame(data=d)
        df_2 = pd.DataFrame(data=d)
        self.assertTrue(df_1.equals(df_2))

    @patch('input_to_df.pyodide.http.open_url')
    def test_input_to_df_csv(self, pyodide_mock):
        pyodide_mock.return_value = '../test_data/city-populations.csv'

        # test csv input, pyodide should be called
        test_value = input_to_df('', 'csv')
        expected_value = pd.read_csv(filepath_or_buffer='../test_data/city-populations.csv', delimiter=',').to_json(orient='split')
        self.assertTrue(pyodide_mock.called)
        self.assertEqual(test_value, expected_value)


    @patch('input_to_df.pyodide.http.open_url')
    def test_input_to_df_json(self, pyodide_mock):

        pyodide_mock.return_value = ''

        # test json input, pyodide should not be called
        data = None
        test_value = None
        expected_value = None

        with open('../test_data/city-populations-records.json', 'r') as json_file:
            data = {'data': json.load(json_file)}
            test_value = json.loads(input_to_df(json.dumps(data), 'json'))
        
        with open('../test_data/city-populations-split.json', 'r') as json_file:
            expected_value = json.load(json_file)

        self.assertFalse(pyodide_mock.called)
        self.assertEqual(test_value, expected_value)

if __name__ == 'main':
    unittest.main()