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

def read_file(path):
        with open(path, 'r') as f:
            return f.read()
        
def load_json(path):
    return json.loads(read_file(path))
        
city_populations_json_records = '../test_data/city-populations-records.json'
city_populations_json_split = '../test_data/city-populations-split.json'
city_populations_csv = '../test_data/city-populations.csv'
city_populations_txt = '../test_data/city-populations.txt'
city_populations_xlsx = '../test_data/city-populations.xlsx'
city_populations_filtered_out_state = '../test_data/city-populations-filtered-out-state-split.json'
city_populations_filtered_out_city = '../test_data/city-populations-filtered-out-city-split.json'
city_populations_filtered_out_state_and_city = '../test_data/city-populations-filtered-out-state-and-city-split.json'

class TestAll(unittest.TestCase):



    # def test_test1(self):
    #     self.assertEqual(mult(3, 2), 6)

    # def test_pandas(self):
    #     d = {'col1': [1, 2], 'col2': [3, 4]}
    #     df_1 = pd.DataFrame(data=d)
    #     df_2 = pd.DataFrame(data=d)
    #     self.assertTrue(df_1.equals(df_2))

    @patch('input_to_df.pyodide.http.open_url')
    def test_input_to_df_csv(self, pyodide_mock):
        pyodide_mock.return_value = city_populations_csv

        # test csv input, pyodide should be called
        test_value = input_to_df('', 'csv')
        expected_value = pd.read_csv(filepath_or_buffer=city_populations_csv, delimiter=',').to_json(orient='split')
        self.assertTrue(pyodide_mock.called)
        self.assertEqual(test_value, expected_value)


    @patch('input_to_df.pyodide.http.open_url')
    def test_input_to_df_json(self, pyodide_mock):

        pyodide_mock.return_value = ''

        test_value = json.loads(input_to_df(json.dumps({'data': json.loads(read_file(city_populations_json_records))}), 'json'))
        expected_value = json.loads(read_file(city_populations_json_split))

        self.assertFalse(pyodide_mock.called)
        self.assertEqual(test_value, expected_value)

    def test_filter_cols(self):
        input = read_file(city_populations_json_split)

        # test when state is filtered out
        test_value = json.loads(filter_cols(input, ['city', 'population']))
        expected_value = load_json(city_populations_filtered_out_state)
        self.assertEqual(test_value, expected_value)

        # test when city is filtered out
        test_value = json.loads(filter_cols(input, ['state', 'population']))
        expected_value = load_json(city_populations_filtered_out_city)
        self.assertEqual(test_value, expected_value)
        
        # test when state and city are filtered out
        test_value = json.loads(filter_cols(input, ['population']))
        expected_value = load_json(city_populations_filtered_out_state_and_city)
        self.assertEqual(test_value, expected_value)

    def test_df_to_output(self):

        # test input is formatted correctly for output file types
        input = read_file(city_populations_json_split)
        csv_expected = read_file(city_populations_csv)
        json_records_expected = json.dumps(json.loads(read_file(city_populations_json_records)))

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