import pandas as pd
from io import StringIO
import json
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import cloudpickle as cp

def train_linear_regression(dfJsonStr, X_cols, y_col, test_size, random_state):

    df = pd.read_json(path_or_buf=StringIO(dfJsonStr), orient='split')
    df_X = df.filter(items=X_cols)
    df_y = df.filter(items=[y_col])

    X_train, X_test, y_train, y_test = train_test_split(df_X, df_y, test_size=test_size, random_state=random_state)
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    y_pred = lr.predict(X_test)

    # Mean Absolute Error
    mae = mean_absolute_error(y_test, y_pred)
    # Mean Square Error
    mse = mean_squared_error(y_test, y_pred)
    # R2 score
    r2 = r2_score(y_test, y_pred)
    # Coefficients
    coef = lr.coef_.tolist()[0]
    # Pickle model
    pickled_model = cp.dumps(lr)
    print('lr predict:')
    print(round(lr.predict(pd.DataFrame({
        'bathrooms': [1],
        'bedrooms': [1]
    })).tolist()[0][0], 2))

    return json.dumps({
        'mae': mae,
        'mse': mse,
        'r2': r2,
        'coef': coef,
        'pickledModel': f'{pickled_model}'
    })