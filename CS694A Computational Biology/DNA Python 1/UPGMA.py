# UPGMA
# unweighted pair group method with arithmetic mean algorithm
# 
# Michael Fang
#
# needed a bunch of help from the internet. I think I understand the implementation, though
#

def lowest_cell(table):
    min_cell = float("inf")
    x, y = -1, -1

    for i in range(len(table)):
        for j in range(len(table[i])):
            if table[i][j] < min_cell:
                min_cell = table[i][j]
                x, y = i, j

    return x, y



def join_labels(labels, a, b):
    if b < a:
        a, b = b, a

    labels[a] = "(" + labels[a] + "," + labels[b] + ")"

    del labels[b]


def join_table(table, a, b):
    if b < a:
        a, b = b, a

    row = []
    for i in range(0, a):
        row.append((table[a][i] + table[b][i])/2)
    table[a] = row
    
   for i in range(a+1, b):
        table[i][a] = (table[i][a]+table[b][i])/2
        
    for i in range(b+1, len(table)):
        table[i][a] = (table[i][a]+table[i][b])/2
        del table[i][b]

    del table[b]


def UPGMA(table, labels):
    while len(labels) > 1:
        x, y = lowest_cell(table)

        join_table(table, x, y)

        join_labels(labels, x, y)

    return labels[0]

