const create_df_from_json = `

import pandas as pd
import json

def create_df_from_json(json_str):
    df = pd.DataFrame.from_dict(json.loads(json_str))
    return  df.to_json(orient='split')`;

export default create_df_from_json;