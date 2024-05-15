import pandas as pd
from io import StringIO
import json

def join(jsonStr, on, join_type, leftSuffix='left', rightSuffix='right'):
    df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient='split') for data in json.loads(jsonStr)]
    if len(df_list) == 1:
        return df_list[0].to_json(orient='split')
    return (df_list[0]
            .merge(df_list[1], on=None if join_type == 'cross' else on, how=join_type, suffixes=(f'_{leftSuffix}', f'_{rightSuffix}'))
            .to_json(orient='split'))