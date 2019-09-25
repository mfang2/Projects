# double strand
# check if two strings are complements of each other
# 
# Author: Michael Fang
# Created: 4/2/2019
# Last Modified: 

#from cs694 import * #for Python 2.7 lists

#complement of a particular base
#A <-> T
#G <-> C
def complement(a):
    str=""
    for nuc in a:
        if nuc == "A":
            str+="T"
        elif nuc =="T":
            str+="A"
        elif nuc=="C":
            str+="G"
        else:
            str+="C"
    return str

#compare strings a, b
def compare (a, b): 
    compB = complement(b)
    if (a==compB):
        print ("True")
    else:
        print("False")

compare("ATTCGTCA","TAAGCAGT")
compare("TTCGTCA","CAGT")
compare("TTCA","CAGT")
