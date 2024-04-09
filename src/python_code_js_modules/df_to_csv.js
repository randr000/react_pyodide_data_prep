const df_to_csv = `

import pandas as pd
from js import Blob, document, window

def df_to_csv(jsonStr):
    df = pd.read_json(path_or_buf=jsonStr, orient='split')
    with open('/test.csv', 'w') as f:
        df.to_csv(f, index=False, mode='w')
    with open('/test.csv', 'r') as f:
        return f.read()`;

export default df_to_csv;