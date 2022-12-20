const create_df_from_csv = `

import pandas as pd
import json
import pyodide

def create_df_from_csv(path, delimiter):
    data = pyodide.open_url(path)
    df = pd.read_csv(filepath_or_buffer=data, delimiter=delimiter)
    return df.to_json(orient='split')`;

export default create_df_from_csv;