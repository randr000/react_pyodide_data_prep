import pandas as pd

def filter_cols(jsonStr, cols):
    df = pd.read_json(path_or_buf=jsonStr, orient='split')
    df = df.filter(items=cols)
    return df.to_json(orient='split')