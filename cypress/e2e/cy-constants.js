export const initialRenderTestTitle = 'Should have all of the initial elements render on the screen';
export const navbarComponentBtns = ['Upload', 'Download', 'Filter Columns', 'Filter Rows', 'Join', 'Union', 'Script'];
export const navbarUtilityBtns = ['Show All Tables', 'Hide All Tables', 'Download State', 'Remove All'];
export const pythonScripts = {
    capitalizeColumns: 'df = df.rename(columns={k: v.capitalize() for (k,v) in zip(df.columns, df.columns)})',
    applyStateUppercase: ['def upper(s):\nreturn s.upper()\n', 'df["state"] = df["state"].apply(upper)'],
    multiplyPopByTwo: 'df["population"] = df["population"].apply(lambda x: x * 2)',
    concatByIndex: [
        'df_list[0] = df_list[0].rename(columns={k: f"{v}-1" for (k,v) in zip(df_list[0].columns, df_list[0].columns)})\n',
        'df_list[1] = df_list[1].rename(columns={k: f"{v}-2" for (k,v) in zip(df_list[1].columns, df_list[1].columns)})\n',
        'df = pd.concat(df_list, axis=1)'
    ].join('')
};
export const plottingScripts = {
    colorMap: [
        'import matplotlib.cm as cm\n',
        '\ndelta = 0.025\n',
        'x = y = np.arange(-3.0, 3.0, delta)\n',
        'X, Y = np.meshgrid(x, y)\n',
        'Z1 = np.exp(-(X**2) - Y**2)\n',
        'Z2 = np.exp(-((X - 1) ** 2) - (Y - 1) ** 2)\n',
        'Z = (Z1 - Z2) * 2\n',
        'plt.figure()\n',
        'plt.imshow(Z,interpolation="bilinear",cmap=cm.RdYlGn,origin="lower",extent=[-3, 3, -3, 3],vmax=abs(Z).max(),vmin=-abs(Z).max())\n',
        'plt.show()\n'
    ].join(''),
    coursesBarGraph: [
        'data = {"C":20, "C++":15, "Java":30, "Python":35}\n',
        'courses = list(data.keys())\n',
        'values = list(data.values())\n',
        'fig = plt.figure()\n',
        'plt.bar(courses, values, color ="maroon",width = 0.4)\n',
        'plt.xlabel("Courses offered")\n',
        'plt.ylabel("No. of students enrolled")\n',
        'plt.title("Students enrolled in different courses")\n',
        'plt.show()\n'
    ].join(''),
    statePopulations: [
        'fig = plt.figure()\n',
        'plt.bar(df["state"], df["population"], color ="maroon", width = 0.4)\n',
        'plt.xlabel("State")\n',
        'plt.ylabel("Population")\n',
        'plt.title("State Populations")\n',
        'plt.show()\n'
    ].join(''),
    cityPopulations: [
        'fig = plt.figure()\n',
        'plt.bar(df["city"], df["population"], color ="maroon", width = 0.4)\n',
        'plt.xlabel("City")\n',
        'plt.ylabel("Population")\n',
        'plt.title("City Populations")\n',
        'plt.show()\n'
    ].join('')
}