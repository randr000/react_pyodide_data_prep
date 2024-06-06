import json
import cloudpickle as cp
import pandas as pd
from io import StringIO

def predict(pickled_model, dfJsonStr):
    df = pd.read_json(path_or_buf=StringIO(dfJsonStr), orient='split')
    model = cp.loads(eval(pickled_model))
    return json.dumps({"prediction": round(model.predict(df).tolist()[0][0], 2)})