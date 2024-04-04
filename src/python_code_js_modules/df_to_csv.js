const df_to_csv = `

import pandas as pd
from js import Blob, document, window
# import pyodide

def df_to_csv(jsonStr):
    # data = pyodide.http.open_url(path)
    df = pd.read_json(path_or_buf=jsonStr, orient='split')
    with open('/test.csv', 'w') as f:
        df.to_csv(f, index=False, mode='w')
    with open('/test.csv', 'r') as f:
        blob = Blob.new([f.read()], {type: 'text/csv'})
        url = window.URL.createObjectURL(blob)
        a = document.createElement('a')
        a.setAttribute('download', 'test.csv')
        a.setAttribute('href', url)
    
        a.click()
        window.URL.revokeObjectURL(url)
    #document.body.removeChild(a)
    # window.location.assign(url)
    # return url`;

export default df_to_csv;