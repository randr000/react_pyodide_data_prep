# import matplotlib
# import numpy as np
# matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
# from matplotlib import pyplot as plt
import matplotlib.cm as cm
delta = 0.025
x = y = np.arange(-3.0, 3.0, delta)
X, Y = np.meshgrid(x, y)
Z1 = np.exp(-(X**2) - Y**2)
Z2 = np.exp(-((X - 1) ** 2) - (Y - 1) ** 2)
Z = (Z1 - Z2) * 2
plt.figure()
plt.imshow(
Z,
interpolation="bilinear",
cmap=cm.RdYlGn,
origin="lower",
extent=[-3, 3, -3, 3],
vmax=abs(Z).max(),
vmin=-abs(Z).max(),
)
plt.show()


# creating the dataset
data = {'C':20, 'C++':15, 'Java':30, 
        'Python':35}
courses = list(data.keys())
values = list(data.values())
  
fig = plt.figure(figsize = (10, 5))
 
# creating the bar plot
plt.bar(courses, values, color ='maroon', 
        width = 0.4)
 
plt.xlabel("Courses offered")
plt.ylabel("No. of students enrolled")
plt.title("Students enrolled in different courses")
plt.show()