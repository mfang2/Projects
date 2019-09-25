# reverse complement
# takes DNA string s, returns reverse complement
# 
# Author: Michael Fang
# Created: 4/2/2019
# Last Modified: 

#from cs694 import * #for Python 2.7 lists


def reverse(s):
    str=""
    for i in s:
        str=i+str
    return str

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
        elif nuc=="G":
            str+="C"
    return str

#compare strings a, b
def run(a):
    str1=reverse(a)
    str2=complement(str1)
    print (str2)

run("ATTCGTCA")
run('')
