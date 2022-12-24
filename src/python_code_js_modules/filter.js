const filter = `

import pandas as pd

def filter(jsonStr):
    df = pd.read_json(path_or_buf=jsonStr, orient='split')
    df = df.filter(items=['state','state_population'])
    return df.to_json(orient='split')`;

export default filter;