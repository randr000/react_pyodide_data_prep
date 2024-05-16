export const initialRenderTestTitle = 'Should have all of the initial elements render on the screen';
export const navbarComponentBtns = ['Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union', 'Script'];
export const navbarUtilityBtns = ['Remove All'];
export const pythonScripts = {
    capitalizeColumns: 'df = df.rename(columns={k: v.capitalize() for (k,v) in zip(df.columns, df.columns)})',
    applyStateUppercase: 'def upper(s):\n\treturn s.upper()\ndf["state"] = df["state"].apply(upper)',
    multiplyPopByTwo: 'df["population"] = df["population"].apply(lambda x: x * 2)',
    concatByIndex: [
        'df_list[0] = df_list[0].rename(columns={k: f"{v}-1" for (k,v) in zip(df_list[0].columns, df_list[0].columns)})\n',
        'df_list[1] = df_list[1].rename(columns={k: f"{v}-2" for (k,v) in zip(df_list[1].columns, df_list[1].columns)})\n',
        'df = pd.concat(df_list, axis=1)'
    ].join('')
}