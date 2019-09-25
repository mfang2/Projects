# pol.py
#
# 
# 
# Author: Michael Fang
# Created: 16 April 2019
#
# run code is commented out for testing purposes

import sys, random
sys.setrecursionlimit(100000)
from rna import *
from hivSeqs import *

def rnaWin(RNA, wsize, step):
    """sliding window. Arguments are RNA string sequence, window size,
        and step. Calculates mfold5 score for this window, advances bp
        by step, then again.
        Returns tuple of score, start position, and sequence of optimal
        window."""
    BestScore = 0 #beginning score
    BestStart = 0
    BestSequence =""

    if len(RNA) < wsize:
        return 0
    else:
        for i in range (0,len(RNA), step): #slicing by step
            window = RNA[i:i+wsize] #window from i to i+window size
            score = mfold5(window, {})
            if score > BestScore:
                BestScore=score
                BestStart=i
                BestSequence=RNA[i:i+wsize]
    return (BestScore, BestStart, BestSequence)

#print(rnaWin(exampleRNA,8,4))

#print(rnaWin('AAGGAAAAAAAAAAAAACCAAGGAAAAAAAAAAAA',8,4))

"""
bestScoreHIV, bestPosHIV, bestSeqHIV = rnaWin(hivPol, 60, 30)
print(bestScoreHIV)
print(bestPosHIV)
print(bestSeqHIV)
"""
def randSeq(RNA):
    '''Takes an RNA string as input and returns a new string formed by
    randomly shuffling the symbols in the given string.'''
    L=list(RNA)
    random.shuffle(L)
    return "".join(L)


def randomWins(RNA, wsize, step, trials):
    """As before, but randomizes RNA string, runs 'trials' number of times"""
    MaxScore = 0 #beginning score
    MaxStart = 0
    MaxSequence =""

    ScoreList=[]
    
    for i in range (0,trials):
        RNA = randSeq(RNA)
        thisScore, thisPos, thisSeq = rnaWin(RNA,wsize,step)
        if thisScore>MaxScore:
            MaxScore=thisScore
            MaxStart=thisPos
            MaxSequence=thisSeq
        ScoreList.append(thisScore)
    #return(MaxScore,MaxStart,MaxSequence)
    return(ScoreList)

print(randomWins(exampleRNA,8,4,5))

randomWinsList = randomWins(exampleRNA,8,4,5)

def pval(trueVal, randomWinsList):
    r = 0
    n = len(randomWinsList)

    for i in n:
        if randomsWinsList[i]>trueVal:
            r++

    p = (r+1)/(n+1)
    return p

# from the text
def findSecStrucWrapper():
    '''Wrapper function to search HIV Pol gene for secondary
    structure.'''
    bestScoreHIV, bestPosHIV, bestSeqHIV = rnaWin(hivPol, 60, 30)
    randomWinsList = randomWins(hivPol,60,30,100)
    p = pval(bestScoreHIV,randomWinsList)
    print "Best window score:", bestScoreHIV
    print "Best window position:", bestPosHIV
    print "Best window seq:", bestSeqHIV
    print "Best window pvalue:", p
    
