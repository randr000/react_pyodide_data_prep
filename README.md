# Pyodide React App with [Pandas](https://pandas.pydata.org/) in the Browser

Live GitHub Pages Link: https://randr000.github.io/react_pyodide_data_prep/

This project uses [pyodide](https://pyodide.org/en/stable/) to allow users to create data pipelines, plotting of data, and machine learning in the browser with Python. All data and Python is run on the front-end. The app uses draggable components and no to little knowledge of code is necessary in order for user to create a data pipeline.

## User Guide

Upon the site loading, the user has many options to choose from in the navbar. The left side of the navbar contains the data component buttons. The middle contains a file upload input where a user can upload a previously downloaded data pipeline. The right hand side includes some utility buttons allowing a user to show/hide all tables, download the current state of the application, and remove all data components.

![Landing Page](./readme_media/landing_page.png)

### Data Components

#### Upload

Users can upload a file in the following formats:
- xlsx
- csv
- txt
- json

If a json file is uploaded, the data must have a format of 'split' or 'records'. Click [here](https://pandas.pydata.org/docs/reference/api/pandas.read_json.html) to see how these to JSON string formats are structured.

Max Sources: N/A

![Upload](./readme_media/upload.gif)

#### Download

Users can download the table data by checking the boxes next to the file format they want downloaded and then click the download icon.

Max Sources: 1

![Download](./readme_media/download.gif)

#### Filter Columns

Users can filter columns by checking and unchecking the boxes next to the column names.

Max Sources: 1

![Filter Columns](./readme_media/filter_columns.gif)

#### Filter Rows

Users can filter rows by selecting the column that contains the value they want to filter by, selecting the correct operator, and entering the value to filter by.

Max Sources: 1

![Filter Rows](./readme_media/filter_rows.gif)

#### Join

Users can join tables using one of the following types of [joins](https://pandas.pydata.org/docs/reference/api/pandas.merge.html):

- Left
- Right
- Inner
- Outer
- Cross

Users can type the suffixes to use for columns from both tables with the same name by typing the suffixes in the Left and Right Suffix text boxes.

Max Sources: 2

![Join](./readme_media/join.gif)

#### Union

Users can combine data similar to a SQL [Union](https://www.geeksforgeeks.org/sql-union-operator/).

Max Sources: Unlimited

![Union](./readme_media/union.gif)

#### Script

The script component allows a user to type in a custom python script to modify the data.

All source data is is stored in the variable df_list as a list of pandas dataframes. The first dataframe of df_list is also stored in the df variable.

While multiple dataframes can be passed to the script component, only one dataframe will be outputed. Do not use the return statement to output a dataframe. Instead, just store it in the df variable.

Do not do this:
```
return df
```
Do this instead:
```
df = <df modifications>
```
These are the first six lines of the script that are preloaded:
```
1 import pandas as pd
2 import numpy as np
3 from io import StringIO
4 import json
5 df_list = [pd.read_json(path_or_buf=StringIO(json.6 dumps(data)), orient="split") for data in json.loads(jsonStr)]
6 df = df_list[0]
```

Max Sources: Unlimited

![Script](./readme_media/script-1.gif)

The code editor starts with line 7 in order to make it easier to determine what line an error occured in a user's script.

![Script Error](./readme_media/script-error.gif)


#### Plotting Script

The plotting script component allows a user to plot data using matplotlib and by writing a custom script.

These are the first nine lines of the script that are preloaded:
```
1 import pandas as pd
2 import numpy as np
3 import matplotlib.pyplot as plt
4 import matplotlib
5 matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
6 from io import StringIO
7 import json
8 df_list = [pd.read_json(path_or_buf=StringIO(json.dumps(data)), orient="split") for data in json.loads(jsonStr)]
9 df = df_list[0]
```

A user can plot data without using the source data and can plot multiple plots. Must call plt.show().

![Plotting Script 1](./readme_media/plotting-script-1.gif)

If a user wants to plot the data from the source dataframes, then they would get the data from the df_list or df variables. The df_list variable is a list of pandas dataframes while df is just a reference to the first dataframe. No data is outputed with this component.

![Plotting Script 2](./readme_media/plotting-script-2.gif)

The code editor starts with line 10 in order to make it easier to determine what line an error occured in a user's script. Must call plt.show().

A user can show/hide the plot by clicking on the plot icon pill.

![Plotting Script Error](./readme_media/plotting-script-error.gif)

Max Sources: Unlimited

#### Linear Regression

The linear regression component allows a user to create a linear regression model using multiple independent variables. The user can then make predictions.

Note: The prediction values are not saved when downloading the data pipeline but the trained model is.

Max Sources: 1

![Linear Regression](./readme_media/linear-regression.gif)

### User Actions

#### Connecting Data Components

A user can connect two data components by clicking the bottom arrow pill. Any components that can be connected to it will have its top arrow pill turn a green color. The user then clicks on the top green arrow pill to connect the components.

The user can then disconnect components by clicking the red x located in the middle of the connecting arrow. The red x will apear after hovering over it with the mouse.

![Connecting Data Components](./readme_media/connecting-data-components.gif)

#### File Download

If the user wishes to download data without using the download component they can do so. By clicking on the download pill, a form will appear allowing the user to select the file name and file formats. They then can download the file(s) by clicking the download icon.

![File Download](./readme_media/file-download.gif)

#### Show/Hide Table or Plot

A user can show or hide all tables by clicking on the Show all Tables or Hide all Tables button. This will also show or hide any plots. Alternatively, a user can click on the table pill in any individual data component to show or hide any individual table.

![Show Hide Tables](./readme_media/show-hide-tables.gif)

#### Download State

A user can download the current state of the data pipeline by clicking on the Download State button. This will bring up the file picker where the user can select the file name and where to save the file. The downloaded file will be a JSON file.

![Download State](./readme_media/download-state.gif)

#### Remove All

By clicking on Remove All, all the data components currently in the viewport will disappear and the application state will reset. Alternatively, a user can delete any individual component by hovering the mouse on its top left corner and then clicking the red x when it appears.

![Remove All](./readme_media/remove-all.gif)

#### Upload Pipeline

A user can upload a previously downloaded data pipeline.

![Upload Pipeline](./readme_media/upload-pipeline.gif)

## Developer Guide