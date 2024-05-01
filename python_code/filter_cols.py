import pandas as pd
from io import StringIO

def filter_cols(jsonStr, cols):
    df = pd.read_json(path_or_buf=StringIO(jsonStr), orient='split')
    df = df.filter(items=cols)
    return df.to_json(orient='split')