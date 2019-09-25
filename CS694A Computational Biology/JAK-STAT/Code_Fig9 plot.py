
# coding: utf-8

# In[19]:


get_ipython().run_line_magic('matplotlib', 'inline')
import matplotlib.pyplot as plt
import pandas


# In[29]:


df = pd.read_csv('/Users/yifanwang/Downloads/two round compare.csv')
df.head()


# In[34]:


time = df['Time']
AmRNAc = df['1mRNAc()']
BmRNAc = df['mRNAc()']

plt.plot(time, AmRNAc, label = "mRNAc(1st run)")
plt.plot(time, BmRNAc, label = "mRNAc(2nd run)")
plt.xlabel("Time")
plt.ylabel("Concentration")

plt.legend()

plt.savefig("Figure9")


