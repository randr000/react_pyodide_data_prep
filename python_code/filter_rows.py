import pandas as pd
from io import StringIO

def filter_rows(jsonStr, col, operator, value):
    try:
        df = pd.read_json(path_or_buf=StringIO(jsonStr), orient='split')
        
        if operator == '==':
            df = df[df[col] == value]
        elif operator == '!=':
            df = df[df[col] != value]
        elif operator == '<':
            df = df[df[col] < value]
        elif operator == '<=':
            df = df[df[col] <= value]
        elif operator == '>':
            df = df[df[col] > value]
        elif operator == '>=':
            df = df[df[col] >= value]
        
        return df.reset_index(drop=True).to_json(orient='split')
    
    except:
        return jsonStr