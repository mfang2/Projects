# rna.py
# rna folding score: number of AU, GC, or GU bonds that are formed
# 
# Author: Michael Fang
# Created: 16 April 2019
#
#



import sys
sys.setrecursionlimit(100000)
from hivSeqs import *

Infinity = float("inf")
D = {} #dictionary
"""Dictionary stores tuples based on sequence, score """

def fold(RNA):
    """Use-it-or-lose-it RNA secondary structure prediction, returns
    score."""
    if len(RNA)<2:
        return 0
    else:
        bestSoFar=fold(RNA[1:])     # lose it case
        for i in range(1,len(RNA)): # use it cases
            if isComplement(RNA[0],RNA[i]):
                score=1+fold(RNA[1:i])+fold(RNA[(i+1):])
                if score>bestSoFar:
                    bestSoFar=score
        return bestSoFar


def mfold(RNA, memo):
    """Use-it-or-lose-it RNA secondary structure prediction, returns
    score, with dictionary."""
    if len(RNA)<2:
        return 0
    elif (RNA) in memo: return memo [(RNA)] #if score exists for this motif, use it
    else:
        bestSoFar=fold(RNA[1:])     # lose it case
        for i in range(1,len(RNA)): # use it cases
            if isComplement(RNA[0],RNA[i]):
                score=1+mfold(RNA[1:i], memo)+mfold(RNA[(i+1):], memo)
                if score>bestSoFar:
                    bestSoFar=score
                    memo [(RNA)] = bestSoFar
        return bestSoFar


def mfold5(RNA, memo):
    """Use-it-or-lose-it RNA secondary structure prediction, returns
    score, with dictionary, under steric constrainst that only complements length 5 or longer."""
    if len(RNA)<5:
        return 0
    elif (RNA) in memo: return memo [(RNA)] #if score exists for this motif, use it
    else:
        bestSoFar=fold(RNA[1:])     # lose it case
        for i in range(1,len(RNA)): # use it cases
            if isComplement(RNA[0],RNA[i]):
                score=1+mfold5(RNA[1:i], memo)+mfold5(RNA[(i+1):], memo)
                if score>bestSoFar:
                    bestSoFar=score
                    memo [(RNA)] = bestSoFar
        return bestSoFar


def isComplement(base1,base2):
    """Returns boolean indicating if 2 RNA bases are complementary."""
    if base1=="A" and base2=="U":
        return True
    elif base1=="U" and base2=="A":
        return True
    elif base1=="C" and base2=="G":
        return True
    elif base1=="G" and base2=="C":
        return True
    elif base1=="G" and base2=="U":
        return True
    elif base1=="U" and base2=="G":
        return True
    else:
        return False

#fold(testRNA)

#print(mfold(testRNA2, {}))
#print(mfold5(testRNA2, {}))
