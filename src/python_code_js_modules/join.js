const join = `

import pandas as pd
from io import StringIO
import json

def join(jsonStr, on, join_type):
    df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient='split') for data in json.loads(jsonStr)]
    if len(df_list) == 1:
        return df_list[0].to_json(orient='split')
    return (df_list[0]
            .merge(df_list[1], on=None if join_type == 'cross' else on, how=join_type, suffixes=('_left', '_right'))
            .to_json(orient='split'))`;

export default join;