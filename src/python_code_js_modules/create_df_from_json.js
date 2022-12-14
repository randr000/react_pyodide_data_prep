const create_df_from_json = `

import pandas as pd
import json

def create_df_from_json(json_str):
    df = pd.DataFrame.from_dict(json.loads(json_str))
    df_dict = df.to_dict(orient='list')
    return  json.dumps(df_dict)`;

export default create_df_from_json;