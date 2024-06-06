import unittest
from unittest.mock import MagicMock, patch
import json
import sys
import pandas as pd

sys.modules['pyodide'] = MagicMock()

from input_to_df import input_to_df
from filter_cols import filter_cols
from filter_rows import filter_rows
from df_to_output import df_to_output
from join import join
from union import union
from train_linear_regression import train_linear_regression
from predict import predict

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
home_prices_csv = '../test_data/home-prices.csv'

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

        # test when error
        test_value = json.loads(filter_rows(input, 'sdgrgerg', '==', 'dsg'))
        expected_value = load_json(city_populations_json_split)
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

    def test_train_linear_regression(self):
        dfJsonStr = pd.read_csv(filepath_or_buffer=home_prices_csv, delimiter=',').to_json(orient='split')
        test_value = json.loads(train_linear_regression(dfJsonStr, ['bathrooms', 'bedrooms'], 'price', .2, 1))
        self.assertEqual(test_value['mae'], 13992.52)
        self.assertEqual(test_value['mse'], 344003543.31)
        self.assertEqual(test_value['r2'], .99)
        self.assertEqual(test_value['coef'], [23086.55, 107452.59])
        self.assertEqual(test_value['pickledModel'], "b'\\x80\\x05\\x956\\x02\\x00\\x00\\x00\\x00\\x00\\x00\\x8c\\x1asklearn.linear_model._base\\x94\\x8c\\x10LinearRegression\\x94\\x93\\x94)\\x81\\x94}\\x94(\\x8c\\rfit_intercept\\x94\\x88\\x8c\\x06copy_X\\x94\\x88\\x8c\\x06n_jobs\\x94N\\x8c\\x08positive\\x94\\x89\\x8c\\x11feature_names_in_\\x94\\x8c\\x15numpy.core.multiarray\\x94\\x8c\\x0c_reconstruct\\x94\\x93\\x94\\x8c\\x05numpy\\x94\\x8c\\x07ndarray\\x94\\x93\\x94K\\x00\\x85\\x94C\\x01b\\x94\\x87\\x94R\\x94(K\\x01K\\x02\\x85\\x94h\\r\\x8c\\x05dtype\\x94\\x93\\x94\\x8c\\x02O8\\x94\\x89\\x88\\x87\\x94R\\x94(K\\x03\\x8c\\x01|\\x94NNNJ\\xff\\xff\\xff\\xffJ\\xff\\xff\\xff\\xffK?t\\x94b\\x89]\\x94(\\x8c\\tbathrooms\\x94\\x8c\\x08bedrooms\\x94et\\x94b\\x8c\\x0en_features_in_\\x94K\\x02\\x8c\\x05coef_\\x94\\x8c\\x12numpy.core.numeric\\x94\\x8c\\x0b_frombuffer\\x94\\x93\\x94(\\x96\\x10\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x8a$\\xe5\\x15\\xa3\\x8b\\xd6@l}Xa\\xc9;\\xfa@\\x94h\\x16\\x8c\\x02f8\\x94\\x89\\x88\\x87\\x94R\\x94(K\\x03\\x8c\\x01<\\x94NNNJ\\xff\\xff\\xff\\xffJ\\xff\\xff\\xff\\xffK\\x00t\\x94bK\\x01K\\x02\\x86\\x94\\x8c\\x01C\\x94t\\x94R\\x94\\x8c\\x05rank_\\x94K\\x02\\x8c\\tsingular_\\x94h$(\\x96\\x10\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x1fFt\\x86\\x13\\x92@@h2\\x91*\\xfb\\n0@\\x94h(K\\x02\\x85\\x94h,t\\x94R\\x94\\x8c\\nintercept_\\x94h$(\\x96\\x08\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x80\\x1d\\xb8eT\\xd8\\xa1@\\x94h(K\\x01\\x85\\x94h,t\\x94R\\x94\\x8c\\x10_sklearn_version\\x94\\x8c\\x051.5.0\\x94ub.'")

    def test_predict(self):
        data = pd.DataFrame({
            'bathrooms': [1],
            'bedrooms': [1]
        }).to_json(orient="split")

        dfJsonStr = pd.read_csv(filepath_or_buffer=home_prices_csv, delimiter=',').to_json(orient='split')
        test_value = json.loads(predict(json.loads(train_linear_regression(dfJsonStr, ['bathrooms', 'bedrooms'], 'price', .2, 1))['pickledModel'], data))['prediction']
        self.assertEqual(test_value, 132823.3)

if __name__ == 'main':
    unittest.main()