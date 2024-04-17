const input_to_df = `

import pandas as pd
import json
import pyodide

def input_to_df(path_or_json_str, file_type, delimiter=','):
    if file_type == 'csv':
        data = pyodide.http.open_url(path_or_json_str)
        df = pd.read_csv(filepath_or_buffer=data, delimiter=delimiter)
        return df.to_json(orient='split')
    
    if file_type == 'json':
        records = json.loads(path_or_json_str)['data']
        df = pd.DataFrame.from_records(records)
        return df.to_json(orient='split')`;

export default input_to_df;