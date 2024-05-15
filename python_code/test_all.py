import unittest
from unittest.mock import MagicMock, patch
import json
import sys
import pandas as pd

sys.modules['pyodide'] = MagicMock()

from test1 import mult
from input_to_df import input_to_df
from filter_cols import filter_cols
from filter_rows import filter_rows
from df_to_output import df_to_output
from join import join
from union import union

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
state_populations_1 = '../test_data/state-populations-1-split.json'
state_populations_2 = '../test_data/state-populations-2-split.json'
state_populations_3 = '../test_data/state-populations-3-split.json'
state_populations_all = '../test_data/state-populations-all-split.json'
city_state_inner_split = '../test_data/city-state-inner-split.json'
city_state_outer_split = '../test_data/city-state-outer-split.json'
city_state_left_split = '../test_data/city-state-left-split.json'
city_state_right_split = '../test_data/city-state-right-split.json'
city_state_cross_split = '../test_data/city-state-cross-split.json'
city_populations_filtered_out_California = '../test_data/city-populations-filtered-out-California-split.json'
city_populations_filtered_for_California = '../test_data/city-populations-filtered-for-California-split.json'
city_populations_filtered_for_pop_456229 = '../test_data/city-populations-filtered-for-pop-456229-split.json'
city_populations_filtered_out_pop_456229 = '../test_data/city-populations-filtered-out-pop-456229-split.json'

city_populations_filtered_pop_lt_456229 = '../test_data/city-populations-filtered-pop-lt-456229-split.json'
city_populations_filtered_pop_gt_456229 = '../test_data/city-populations-filtered-pop-gt-456229-split.json'
city_populations_filtered_pop_lte_456229 = '../test_data/city-populations-filtered-pop-lte-456229-split.json'
city_populations_filtered_pop_gte_456229 = '../test_data/city-populations-filtered-pop-gte-456229-split.json'

class TestAll(unittest.TestCase):

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

    def test_filter_rows(self):
        input = read_file(city_populations_json_split)

        # test when filtering for California
        test_value = json.loads(filter_rows(input, 'state', '==', 'California'))
        expected_value = load_json(city_populations_filtered_for_California)
        self.assertEqual(test_value, expected_value)

        # test when filtering when population is 456229
        test_value = json.loads(filter_rows(input, 'population', '==', 456_229))
        expected_value = load_json(city_populations_filtered_for_pop_456229)
        self.assertEqual(test_value, expected_value)

        # test when California is filtered out
        test_value = json.loads(filter_rows(input, 'state', '!=', 'California'))
        expected_value = load_json(city_populations_filtered_out_California)
        self.assertEqual(test_value, expected_value)

        # test when filtering when population does not equal 456229
        test_value = json.loads(filter_rows(input, 'population', '!=', 456_229))
        expected_value = load_json(city_populations_filtered_out_pop_456229)
        self.assertEqual(test_value, expected_value)

        # test when filtering when population is less than 456229
        test_value = json.loads(filter_rows(input, 'population', '<', 456_229))
        expected_value = load_json(city_populations_filtered_pop_lt_456229)
        self.assertEqual(test_value, expected_value)

        # test when filtering when population is more than 456229
        test_value = json.loads(filter_rows(input, 'population', '>', 456_229))
        expected_value = load_json(city_populations_filtered_pop_gt_456229)
        self.assertEqual(test_value, expected_value)

        # test when filtering when population is less than or equal 456229
        test_value = json.loads(filter_rows(input, 'population', '<=', 456_229))
        expected_value = load_json(city_populations_filtered_pop_lte_456229)
        self.assertEqual(test_value, expected_value)

        # test when filtering when population is more than or equal 456229
        test_value = json.loads(filter_rows(input, 'population', '>=', 456_229))
        expected_value = load_json(city_populations_filtered_pop_gte_456229)
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

    def test_join(self):
        city_data = load_json(city_populations_json_split)
        state_data = load_json(state_populations_all)

        # single table test - city data
        test_value = json.loads(join(json.dumps([city_data]), 'state', 'left'))
        expected_value = load_json(city_populations_json_split)
        self.assertEqual(test_value, expected_value)

        # single table test - state data
        test_value = json.loads(join(json.dumps([state_data]), 'state', 'left'))
        expected_value = load_json(state_populations_all)
        self.assertEqual(test_value, expected_value)

        # inner join
        test_value = json.loads(join(json.dumps([city_data, state_data]), 'state', 'inner'))
        expected_value = load_json(city_state_inner_split)
        self.assertEqual(test_value, expected_value)

        # outer join
        test_value = json.loads(join(json.dumps([city_data, state_data]), 'state', 'outer'))
        expected_value = load_json(city_state_outer_split)
        self.assertEqual(test_value, expected_value)

        # left join
        test_value = json.loads(join(json.dumps([city_data, state_data]), 'state', 'left'))
        expected_value = load_json(city_state_left_split)
        self.assertEqual(test_value, expected_value)

        # right join
        test_value = json.loads(join(json.dumps([city_data, state_data]), 'state', 'right'))
        expected_value = load_json(city_state_right_split)
        self.assertEqual(test_value, expected_value)

        # cross join
        test_value = json.loads(join(json.dumps([city_data, state_data]), 'state', 'cross'))
        expected_value = load_json(city_state_cross_split)
        self.assertEqual(test_value, expected_value)

    def test_union(self):
        file_list = [state_populations_1, state_populations_2, state_populations_3]
        data_list = [load_json(data) for data in file_list]
        test_value = json.loads(union(json.dumps(data_list)))
        expected_value = load_json(state_populations_all)
        self.assertEqual(test_value, expected_value)

if __name__ == 'main':
    unittest.main()