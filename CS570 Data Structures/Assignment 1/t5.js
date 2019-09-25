/*
Tic-Tac-Toe
Michael Fang
CWID: 10430930
9-18-2018

Note:
This program was written by Michael Fang.
I have not been able to spend much time with my partner, and we have asked to be placed in separate groups because of this.
so we are submitting our assignments separately

The tic-tac-toe board uses similar implementation to a program I wrote for this class last year, but is rewritten.

*/
function drawInitDataRow(row, length) {
    var symbol = "   |"; // 3 space and pipe symbol
    var res = row + '  '; // 2 space at the beginning, pass to result
    for (var i = 0; i < length; ++i) {
        if (i == length - 1) {
            symbol = symbol.substring(0, symbol.length - 1);
        }
        res = res.concat(symbol);
    }
    console.log(res);
}
function drawRealDataRow(arr, row, length) {
    var res = row + '  '; // 2 space at the beginning
    for (var col = 0; col < length; ++col) {
        var k = row - 1;
        var temp = arr[k][col];
        if (temp == "???") {
            temp = '   |';
            if (col == length - 1) {
                temp = '   ';
            }
            res = res.concat(temp);
        }
        else {
            if (col == length - 1) {
                temp = ' '.concat(temp).concat(' ');
            }
            else {
                temp = ' '.concat(temp).concat(' |');
            }
            res = res.concat(temp);
        }
    }
    console.log(res);
}
function drawHeadRow(size) {
    var res = '  ';
    var sym = '';
    for (var i = 0; i < size; ++i) {
        var k = i + 1;
        if (k < 10) {
            sym = '  ';
        }
        else if (k < 100) {
            sym = ' ';
        }
        var ks = k.toString();
        res = res.concat(sym).concat(ks).concat(' ');
    }
    console.log(res);
}
function drawDivider(length) {
    var symbol = '---+';
    var res = '   ';
    for (var i = 0; i < length; ++i) {
        if (i == length - 1) {
            symbol = symbol.substring(0, symbol.length - 1);
        }
        res = res.concat(symbol);
    }
    console.log(res);
}
function drawBoard(arr, size, type) {
    drawHeadRow(size);
    for (var i = 0; i < size; ++i) {
        if (type == 0) {
            drawInitDataRow(i + 1, size);
        }
        else {
            drawRealDataRow(arr, i + 1, size);
        }
        if (i < size - 1) {
            drawDivider(size);
        }
    }
}
function create2DArray(size) {
    var matrix = new Array(size);
    for (var i = 0; i < size; ++i) {
        matrix[i] = new Array(size);
    }
    for (var i_1 = 0; i_1 < size; ++i_1) { //each entry in first array contains an array
        for (var j = 0; j < size; ++j) {
            matrix[i_1][j] = "???";
        }
    }
    return matrix;
}
function getPlayerSymbol(playerNumber) {
    var symb = 'XOABCDEFGHIJKLMNPQRSTUVWXYZ';
    var symbol = symb[playerNumber]; //get the index for the particular player
    return symbol;
}
function checkHorizontal(arr, row, col, symbol) {
    var size = data.size; //larger size means larger check range
    var result = false;
    var seq = data.seq; //what the winning sequence should be
    // search the symbol from column 0 and set the count 
    // assume at least winning seq will be 2
    col = 0;
    var count = 0;
    var ok = 0;
    while (col < size) {
        if (arr[row][col] == symbol) {
            if (ok == 0) {
                count = 1;
                ok = 1;
            }
            else {
                ++count;
                if (count == seq) {
                    result = true;
                    break;
                }
            }
        }
        else {
            ok = 0;
            count = 0;
        }
        ++col;
    }
    //console.log("count = " + count);
    //console.log("result = " + result);
    return result;
}
function checkVertical(arr, row, col, symbol) {
    var size = data.size;
    var result = false;
    var seq = data.seq;
    // search the symbol from row 0 and set the count 
    // assume at least winning seq will be 2
    row = 0;
    var count = 0;
    var ok = 0;
    while (row < size) {
        if (arr[row][col] == symbol) {
            if (ok == 0) {
                count = 1;
                ok = 1;
            }
            else {
                ++count;
                if (count == seq) {
                    result = true;
                    break;
                }
            }
        }
        else {
            ok = 0;
            count = 0;
        }
        ++row;
    }
    //console.log("count = " + count);
    //console.log("result = " + result);
    return result;
}
function checkDiagonal(arr, startRow, startCol, symbol, direction) {
    // direction is used to control which direction to test  
    var size = data.size;
    var result = false;
    var seq = data.seq;
    var row = startRow;
    var col = startCol;
    var count = 0;
    var ok = 0;
    var stop = false;
    while (row < size && col < size && !stop) {
        //console.log("Inside win diagonal " + row + ' ' + col + ' ' + arr[row][col]);
        if (arr[row][col] == symbol) {
            if (ok == 0) {
                count = 1;
                ok = 1;
            }
            else {
                ++count;
                if (count == seq) {
                    result = true;
                    break;
                }
            }
        }
        else {
            ok = 0;
            count = 0;
        }
        if (direction == 1) {
            ++col;
            ++row;
            if (col >= size) {
                stop = true;
            }
        }
        else {
            --col;
            ++row;
            if (col < 0) {
                stop = true;
            }
        }
    }
    //console.log("count = " + count);
    //console.log("result = " + result);
    return result;
}
function checkNorthWest(arr, row, col, symbol) {
    var result = false;
    var startRow, startCol;
    if (row == col) {
        startRow = 0;
        startCol = 0;
    }
    else if (col > row) {
        startRow = 0;
        startCol = col - row;
    }
    else {
        startRow = row - col;
        startCol = 0;
    }
    console.log("startRow = " + startRow);
    console.log("startCol = " + startCol);
    result = checkDiagonal(arr, startRow, startCol, symbol, 1);
    console.log("checkNorthWest = " + result);
    return result;
}
function checkNorthEast(arr, row, col, symbol) {
    var result = false;
    var startRow, startCol;
    var size = data.size;
    console.log('row = ' + row);
    console.log('col = ' + col);
    console.log('size = ' + size);
    while (row > 0) {
        row = row - 1;
        col = col + 1;
        if (col == size) {
            col = col - 1;
            row = row + 1;
            break;
        }
    }
    startRow = row;
    startCol = col;
    console.log("startRow = " + startRow);
    console.log("startCol = " + startCol);
    result = checkDiagonal(arr, startRow, startCol, symbol, 2);
    console.log("checkNorthEast = " + result);
    return result;
}
function checkWin(arr, row, col, symbol) {
    var result1 = false;
    var result2 = false;
    var result3 = false;
    var result4 = false;
    result1 = checkHorizontal(arr, row, col, symbol);
    //console.log("result from Horizontal = " + result1);
    result2 = checkVertical(arr, row, col, symbol);
    //console.log("result from Vertical = " + result2);
    result3 = checkNorthWest(arr, row, col, symbol);
    //console.log("result from North West = " + result3);
    result4 = checkNorthEast(arr, row, col, symbol);
    //console.log("result from North East = " + result4);
    if (result1 || result2 || result3 || result4) {
        return true;
    }
    else
        return false;
}
/*
Check Active functions:
WIP: check to see if a space is already occupied
Should try to prevent player placing symbol in location that is already occupied in the current gamestate.

*/
function checkActiveRow(row, symbol) {
    var arr = data.arr;
    var size = data.size;
    var seq = data.seq;
    var count = 0;
    var ok = 0;
    var col = 0;
    var result = false;
    while (col < size) {
        if (arr[row][col] == symbol || arr[row][col] == '???') {
            if (ok == 0) {
                count = 1;
                ok = 1;
            }
            else {
                ++count;
                if (count == seq) {
                    result = true;
                    break;
                }
            }
        }
        else {
            ok = 0;
            count = 0;
        }
        ++col;
    }
    return result;
}
function checkActiveHD(symbol) {
    var size = data.size;
    var result = false;
    for (var row = 0; row < size; ++row) {
        result = checkActiveRow(row, symbol);
        if (result)
            break;
    }
    return result;
}
function checkActiveCol(col, symbol) {
    var arr = data.arr;
    var size = data.size;
    var seq = data.seq;
    var count = 0;
    var ok = 0;
    var row = 0;
    var result = false;
    while (row < size) {
        if (arr[row][col] == symbol || arr[row][col] == '???') {
            if (ok == 0) {
                count = 1;
                ok = 1;
            }
            else {
                ++count;
                if (count == seq) {
                    result = true;
                    break;
                }
            }
        }
        else {
            ok = 0;
            count = 0;
        }
        ++row;
    }
    return result;
}
function checkActiveVD(symbol) {
    var size = data.size;
    var result = false;
    for (var col = 0; col < size; ++col) {
        result = checkActiveCol(col, symbol);
        if (result)
            break;
    }
    return result;
}
function checkActDiag(startRow, startCol, symbol, direction) {
    // direction is used to control which direction to test
    var arr = data.arr;
    var size = data.size;
    var result = false;
    var seq = data.seq;
    var row = startRow;
    var col = startCol;
    var count = 0;
    var ok = 0;
    var stop = false;
    while (row < size && !stop) {
        console.log("Inside act diagonal " + row + ' ' + col + ' ' + arr[row][col]);
        if (arr[row][col] == symbol || arr[row][col] == '???') {
            if (ok == 0) {
                count = 1;
                ok = 1;
            }
            else {
                ++count;
                if (count == seq) {
                    result = true;
                    break;
                }
            }
        }
        else {
            ok = 0;
            count = 0;
        }
        if (direction == 1) {
            ++col;
            ++row;
            if (col == size) {
                stop = true;
            }
        }
        else {
            --col;
            ++row;
            if (col == -1) {
                stop = true;
            }
        }
    }
    //console.log("count = " + count);
    //console.log("result = " + result);
    return result;
}
function checkActiveNW(symbol) {
    var size = data.size;
    var result = false;
    var startCol;
    var startRow = 0;
    for (var i = 0; i < size; ++i) {
        startCol = i;
        result = checkActDiag(startRow, startCol, symbol, 1);
        if (result)
            break;
    }
    if (result == false) {
        startCol = 0;
        for (var j = 0; j < size; ++j) {
            startRow = j;
            result = checkActDiag(startRow, startCol, symbol, 1);
            if (result)
                break;
        }
    }
    return result;
}
function checkActiveNE(symbol) {
    var size = data.size;
    var result = false;
    var startCol;
    var startRow = 0;
    for (var j = 0; j < size; ++j) {
        startCol = size - j - 1;
        result = checkActDiag(startRow, startCol, symbol, 2);
        if (result)
            break;
    }
    if (result == false) {
        startCol = size - 1;
        for (var i = 0; i < size; ++i) {
            startRow = i;
            result = checkActDiag(startRow, startCol, symbol, 2);
            if (result)
                break;
        }
    }
    return result;
}
function checkActive(symbol) {
    var result1 = checkActiveHD(symbol);
    //console.log("result from checkActiveHD = " + result1);
    var result2 = checkActiveVD(symbol);
    //console.log("result from checkActiveVD = " + result2);
    var result3 = checkActiveNW(symbol);
    //console.log("result from checkActiveNW = " + result3);
    var result4 = checkActiveNE(symbol);
    //console.log("result from checkActiveNE = " + result4);
    if (result1 || result2 || result3 || result4) {
        return true;
    }
    else
        return false;
}
//new strategy:
//rather than looping everything within main, have function playGame that is called each loop instead.
function playGame(arr, currPlayer, playerInt, size) {
    var result = false;
    var preSymbol = ""; //which player won?
    while (currPlayer < playerInt) { //loop through each player's turn
        drawBoard(arr, size, 1);
        if (result) { //a player has won; result is modified later, equal to CheckWin *after* player moves
            console.log("The user " + preSymbol + " won the game");
            process.exit(0);
        }
        var currSymbol = getPlayerSymbol(currPlayer);
        console.log("It is now player ", currSymbol, "'s move.");
        /*
        if (!checkActive(currSymbol)) {  // not active, means can not continue
          console.log("Can not continue, it is tie");
          process.exit(1);
        }
        */
        var input_1 = readlineSync.question("Give me coordinates separated by a space or Q to quit "); //coordinates are given as 1 1, or 2 1, etc.
        if (input_1 == 'Q' || input_1 == 'q') {
            var fileName = readlineSync.question("What file should the game be saved to?: ");
            data.curr = currPlayer;
            var line = data.player + ' ' + data.size + ' ' + data.seq + ' ' + data.curr + '\n'; //separate data with ' ' character, so we can parse later
            fs.writeFileSync(fileName, line, { encoding: 'utf8' }); //write to filename
            fs.appendFileSync(fileName, data.arr, { encoding: 'utf8' }); //add data to file provided above
            process.exit(1);
        }
        else {
            var res = input_1.split(' ');
            console.log("res = " + res);
            var row = res[0] - 1;
            var col = res[1] - 1;
            arr[row][col] = currSymbol;
            data.arr = arr;
            result = checkWin(arr, row, col, currSymbol); //check if the move just made has won.
            preSymbol = currSymbol;
        }
        ++currPlayer;
        if (currPlayer == playerInt) { //loop back to the first player once we reached max player number.
            currPlayer = 0;
        }
    }
}
function Data(player, size, seq, curr, arr) {
    this.player = player; //which player
    this.size = size; //board size
    this.seq = seq; //winning sequence
    this.curr = curr; //need to remember which player's turn it is
    this.arr = arr; //need to remember what the current game board looks like
}
function beginNewGame() {
    var player = readlineSync.question('How many players ? : ');
    var playerInt = parseInt(player);
    if (playerInt < 1 || playerInt > 26) {
        console.log('This game only allows 1 to 26 players');
        return false;
    }
    data.player = player;
    //console.log(data);
    var size = readlineSync.question('What is the board size ? : ');
    var sizeInt = parseInt(size);
    if (sizeInt < 3 || sizeInt > 999) {
        console.log('The size should be between 3 to 999');
        return false;
    }
    data.size = size;
    //console.log(data);
    var seq = readlineSync.question('What is the winning sequence ? : ');
    var seqInt = parseInt(seq);
    if (sizeInt < seqInt) {
        console.log('the winning sequence is larger than the board; winning is impossible');
        return false;
    }
    data.seq = seq;
    //console.log(data);
    var arr = create2DArray(size); //if above data is okay, build the game board
    data.arr = arr;
    playGame(arr, 0, playerInt, sizeInt);
}
function checkFileExistsSync(filepath) {
    var flag = true;
    try {
        fs.accessSync(filepath, fs.F_OK);
    }
    catch (e) {
        flag = false;
    }
    return flag;
}
function resumeOldGame() {
    var found = false; //boolean if file can be found
    var fileName = readlineSync.question('Please provide the save game file name : ');
    found = checkFileExistsSync(fileName); //check if file exists
    if (found == false) {
        console.log("File not found, exiting");
        return;
    }
    var res = fs.readFileSync(fileName, { encoding: 'utf8' }).toString().split('\n');
    //console.log(res);
    var ss = res[0].toString().split(' '); //set global variables for play
    data.player = ss[0];
    data.size = ss[1];
    data.seq = ss[2];
    data.curr = ss[3];
    data.arr = res[1].split(',');
    //console.log(data);
    playGame(data.arr, data.curr, data.player, data.size);
}
// main
var data = new Data(2, 2, 3, 0, []); //placeholder data, to be replaced in new game or loaded game
//console.log(data);
var readlineSync = require('readline-sync');
var fs = require('fs');
var input = readlineSync.question('Type N for new game or R for resume old game : ');
if (input == "N" || input == "n") { //case insensitive
    console.log("Starting new game!");
    beginNewGame();
}
else if (input == "R" || input == "r") {
    console.log("Resume");
    resumeOldGame();
}
else {
    console.log("Incorrect answer, bye!");
}
