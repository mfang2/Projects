# TATA Box
# See if consensus sequence TATA exists in a string, and if so, count them!
# Of course, there are variations, TATA is really TATA(A/T)A(A/T)
#
# Author: Michael Fang
# Created: 4/2/2019
# Last Modified: 

################ Dr. Compagnoni's code to restore 2.7 functionality
from functools import reduce

myrange = range
mymap = map
myfilter = filter

def range(*lst):
    if len(lst) == 1:
        return list(myrange(lst[0]))
    elif len(lst) == 2:
        return list(myrange(lst[0],lst[1]))
    else:
        return list(myrange(lst[0],lst[1],lst[2]))
        
def map(f,lst):
    return list(mymap(f,lst))

def filter(f,lst):
    return list(myfilter(f,lst))
####################


def countTATA (s):
    counter=0 #number of TATAs
    for index in range(len(s)): #iterate through each
        if s[index:index+4]=="TATA":
            counter+=1
    print (counter)

def multiCountTATA(DNAlist):
    for DNA in DNAlist:
        countTATA(DNA)


countTATA("GCTACCGGATATAGCTAGCTATA") #should have 2

