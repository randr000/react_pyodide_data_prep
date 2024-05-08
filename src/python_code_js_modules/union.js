const union = `

import pandas as pd
from io import StringIO
import json

def union(jsonStr):
    df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient='split') for data in json.loads(jsonStr)]
    return pd.concat(df_list, ignore_index=True).to_json(orient='split')`;

export default union;