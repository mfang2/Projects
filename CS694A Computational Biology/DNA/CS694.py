# This file imports reduce and redefines map, range, and filter
# for students to be able to follow
# the book Computing for Biologists
# by Ran Libeskind-Hadas and Eliot Bush (Harvey Mudd)
# using Python 3.7. The book's code was originally designed
# for Python 2.7.
#
# Author: Adriana Compagnoni
# Created: September 7, 2018
# Last Modified: September 23, 2018
#
#
# USAGE: The first line of your code should be
# from cs694 import *

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
