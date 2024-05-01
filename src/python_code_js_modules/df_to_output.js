const df_to_output = `

import pandas as pd
import json
from io import StringIO

def df_to_output(json_str, file_types):

    data_dict = {}

    df = pd.read_json(path_or_buf=StringIO(json_str), orient='split')

    if 'csv' in file_types or 'txt' in file_types:
        data_dict['csv_text'] = df.to_csv(index=False)

    if 'xlsx' in file_types or 'json (records)' in file_types:
        data_dict['xlsx_json'] = df.to_json(orient='records')
    
    return json.dumps(data_dict)`;

export default df_to_output;