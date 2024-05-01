import unittest
from unittest.mock import MagicMock, patch
import json
import sys
import pandas as pd

sys.modules['pyodide'] = MagicMock()

from test1 import mult
from input_to_df import input_to_df
from filter_cols import filter_cols
from df_to_output import df_to_output

class TestAll(unittest.TestCase):

    city_populations_json_records = '../test_data/city-populations-records.json'
    city_populations_json_split = '../test_data/city-populations-split.json'
    city_populations_csv = '../test_data/city-populations.csv'
    city_populations_txt = '../test_data/city-populations.txt'
    city_populations_xlsx = '../test_data/city-populations.xlsx'

    def test_test1(self):
        self.assertEqual(mult(3, 2), 6)

    def test_pandas(self):
        d = {'col1': [1, 2], 'col2': [3, 4]}
        df_1 = pd.DataFrame(data=d)
        df_2 = pd.DataFrame(data=d)
        self.assertTrue(df_1.equals(df_2))

    @patch('input_to_df.pyodide.http.open_url')
    def test_input_to_df_csv(self, pyodide_mock):
        pyodide_mock.return_value = self.city_populations_csv

        # test csv input, pyodide should be called
        test_value = input_to_df('', 'csv')
        expected_value = pd.read_csv(filepath_or_buffer=self.city_populations_csv, delimiter=',').to_json(orient='split')
        self.assertTrue(pyodide_mock.called)
        self.assertEqual(test_value, expected_value)


    @patch('input_to_df.pyodide.http.open_url')
    def test_input_to_df_json(self, pyodide_mock):

        pyodide_mock.return_value = ''

        # test json input, pyodide should not be called
        data = None
        test_value = None
        expected_value = None

        with open(self.city_populations_json_records, 'r') as json_file:
            data = {'data': json.load(json_file)}
            test_value = json.loads(input_to_df(json.dumps(data), 'json'))
        
        with open(self.city_populations_json_split, 'r') as json_file:
            expected_value = json.load(json_file)

        self.assertFalse(pyodide_mock.called)
        self.assertEqual(test_value, expected_value)

    def test_df_to_output(self):

        # test input is formatted correctly for output file types
        input = None
        csv_expected = ''
        json_records_expected = ''
        test_value = None
        expected_value = None

        with open(self.city_populations_json_split, 'r') as f:
            input = f.read()

        with open(self.city_populations_csv, 'r') as f:
            csv_expected = f.read()

        with open(self.city_populations_json_records, 'r') as f:
            json_records_expected = json.dumps(json.loads(f.read()))

        # test when none of the file types that need to be converted by pandas are not passed
        test_value = df_to_output(input, ['json (split)'])
        expected_value = '{}'
        self.assertEqual(test_value, expected_value)

        # test when csv file type is passed
        test_value = json.loads(df_to_output(input, 'csv'))
        expected_value = {'csv_txt': csv_expected}
        self.assertEqual(test_value, expected_value)

        # test when txt file type is passed
        test_value = json.loads(df_to_output(input, 'txt'))
        expected_value = {'csv_txt': csv_expected}
        self.assertEqual(test_value, expected_value)

        # test when xlsx file type is passed
        test_value = {'xlsx_json': json.dumps(json.loads(json.loads(df_to_output(input, ['xlsx']))['xlsx_json']))}
        expected_value = {'xlsx_json': json_records_expected}
        self.assertEqual(test_value, expected_value)

        # test when json (records) file type is passed
        test_value = {'xlsx_json': json.dumps(json.loads(json.loads(df_to_output(input, ['json (records)']))['xlsx_json']))}
        expected_value = {'xlsx_json': json_records_expected}
        self.assertEqual(test_value, expected_value)

        # test when mulitple file types are passed
        test_value = json.loads(df_to_output(input, ['csv', 'txt', 'xlsx', 'json (records)', 'json (split)']))
        test_value['xlsx_json'] = json.dumps(json.loads(test_value['xlsx_json']))
        expected_value = {'csv_txt': csv_expected, 'xlsx_json': json_records_expected}
        self.assertEqual(test_value, expected_value)
       


if __name__ == 'main':
    unittest.main()