import pandas as pd
import json

def df_to_output(json_str, file_types):

    data_dict = {}

    df = pd.read_json(path_or_buf=json_str, orient='split')

    if 'csv' in file_types or 'txt' in file_types:
        with open('/_.csv', 'w') as f:
            df.to_csv(f, index=False, mode='w')
        with open('/_.csv', 'r') as f:
            data_dict['csv_txt'] = f.read()

    if 'xlsx' in file_types or 'json (records)' in file_types:
        data_dict['xlsx_json'] = df.to_json(orient='records')
    
    return json.dumps(data_dict)