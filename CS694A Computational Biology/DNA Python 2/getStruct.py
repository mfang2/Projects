# getStruct.py
# 
# Michael Fang
#
# I am not sure how to return the tuple for position. 
# 
# 
# 
# 


import sys
sys.setrecursionlimit(100000)
from hivSeqs import *

D = {} #dictionary


def getStruct(RNA, memo):
    """Use-it-or-lose-it RNA secondary structure prediction, returns
    score, with dictionary, under steric constrainst that only complements length 5 or longer."""


    #memo structure is [score, [(0,1)]], list of positions

    if len(RNA)<5:
        return 0
    elif (RNA) in memo: return memo [(RNA)] #if score exists for this motif, use it
    else:
        bestSoFar=getStruct(RNA[1:])     # lose it case
        for i in range(1,len(RNA)):     # use it cases
            if isComplement(RNA[0],RNA[i]):
                score=1+getStruct(RNA[1:i], memo)+getStruct(RNA[(i+1):], memo)
                if score>bestSoFar:
                    bestSoFar=score
                    memo [(RNA)] = bestSoFar
        return bestSoFar

# I am getting this error and I do not know why:
# TypeError: mfold5() missing 1 required positional argument: 'memo'
# Online it seems I have not initialized a field, but for the same function
# mfold it worked correctly. I do not understand why.


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

def adjust(pairs, k):
    output = []
    for i in pairs:
        output[i] = pairs [(i+k)] #### I don't know how to write this
    return output

print(getStruct(testRNA2, {}))

