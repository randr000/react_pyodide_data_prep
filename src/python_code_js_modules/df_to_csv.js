const df_to_csv = `

import pandas as pd
import json
from js import Blob, document, window

def df_to_csv(json_str):
    df = pd.read_json(path_or_buf=json_str, orient='split')
    with open('/test.csv', 'w') as f:
        df.to_csv(f, index=False, mode='w')
    with open('/test.csv', 'r') as f:
        # return f.read(), pd.DataFrame.from_dict(json.loads(json_str)).to_json(orient='records')
        return json.dumps({
            "csv": f.read(),
            "xlsx": df.to_json(orient='records')
        })`;

export default df_to_csv;