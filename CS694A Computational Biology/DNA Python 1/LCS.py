# LCS - Longest Common Subsequence
# Michael Fang
#
# Had to look up some help with the None for null equivalent
#

def LCS (X, Y):
    a = len(X)
    b = len(Y)

    L = [[None]*(b + 1) for i in range(a + 1)]

    for i in range(a + 1): 
        for j in range(b + 1): 
            if i == 0 or j == 0 : 
                L[i][j] = 0
            elif X[i-1] == Y[j-1]: 
                L[i][j] = L[i-1][j-1]+1
            else: 
                L[i][j] = max(L[i-1][j], L[i][j-1])

    return L[a][b]

S1 = 'ACTTGGAACCACCTCG'
S2 = 'ACCTACTAACC'

print (LCS(S1,S2))
