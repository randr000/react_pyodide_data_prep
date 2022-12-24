import pandas as pd
import pyodide

def create_df_from_csv(path, delimiter):
    data = pyodide.http.open_url(path)
    df = pd.read_csv(filepath_or_buffer=data, delimiter=delimiter)
    return df.to_json(orient='split')