/*
Michael Fang
CWID: 10430930
11/18/2018
Assignment 4: Tries Articles

(Self?)-Notes: 
This retrieval tree is case sensitive. So "microsoft" will not match "Microsoft". 
Company names are separated by a single "tab"
*/

function TrieNode(data) {
    this.data = data;
    this.isWord = false;
    this.children = []; //list of following nodes
    this.count = 0; //for when counting
}
function TrieClass() {
    this.getNode = function (ch) {
        var pNode = new TrieNode(ch);
        for (var i = 0; i < 63; ++i) {
            pNode.children[i] = null;
        }
        return pNode;
    }; // 
    var root = this.getNode('');
    this.getIndex = function (k) {
        var n = k.charCodeAt(0);
        //console.log("k = " + k + " n = " + n);
        var index = 0;
        if (k >= '0' && k <= '9') {
            index = n - 48;
        }
        else if (k >= 'A' && k <= 'Z') {
            index = n - 55;
        }
        else if (k >= 'a' && k <= 'z') {
            index = n - 61;
        }
        else if (k == ' ') {
            index = 62;
        }
        //console.log("index = " + index);
        return index;
    };
    this.add = function (key) {
        var pNode = root;
        for (var i = 0; i < key.length; ++i) {
            var k = key[i];
            var index = this.getIndex(k);
            if (!pNode.children[index]) {
                pNode.children[index] = this.getNode(key);
            }
            pNode = pNode.children[index];
        }
        pNode.isEndOfWord = true;
    };
    // Every time we do search, if we find the key
    // we increment the hit count by one.
    this.search = function (key) {
        var pNode = root;
        for (var i = 0; i < key.length; ++i) {
            var k = key[i];
            var index = this.getIndex(k);
            if (!pNode.children[index]) {
                return false;
            }
            pNode = pNode.children[index];
        }
        if (pNode != null && pNode.isEndOfWord) {
            ++pNode.count;
            return true;
        }
    };
    // At end, use this routine to get the count
    this.getCount = function (key) {
        var pNode = root;
        for (var i = 0; i < key.length; ++i) {
            var k = key[i];
            var index = this.getIndex(k);
            if (!pNode.children[index]) {
                return 0;
            }
            pNode = pNode.children[index];
        }
        if (pNode != null && pNode.isEndOfWord) {
            return pNode.count;
        }
    };
}
function LinkNode(name) {
    this.name = name;
    this.synonym = 0;
    this.next = null;
}
// The following code will:
// read the input data separated by line
// read synonyms separated by tab
// add all the synonyms into companyTables for output
function readCompany() {
    var fs = require('fs');
    var input = fs.readFileSync("companies.dat").toString().trim(); //"companies.dat", as per instructions
    //console.log(input);
    var companies = input.split("\n"); //each company and its synonyms are per line
    //console.log(companies);
    for (var i = 0; i < companies.length; ++i) { //parse all synonyms for company
        var sycom = companies[i].split("\t");
        var p = null;
        for (var k = 0; k < sycom.length; ++k) {
            var synonym = sycom[k];
            synonym = synonym.replace(",", "").trim();
            var node = new LinkNode(synonym);
            if (k == 0) {
                csTable[i] = node;
                p = node;
            }
            else {
                p.next = node;
                p = node;
            }
        }
    }
}
function printCStable() { //print company table
    for (var i = 0; i < csTable.length; ++i) {
        console.log("i = " + i);
        console.log(csTable[i].name);
        var p = csTable[i].next;
        while (p != null) {
            console.log(p.name);
            p = p.next;
        }
    }
}
function addCompany() { //add company to trie
    for (var i = 0; i < csTable.length; ++i) {
        var nameArray = csTable[i].name.split(' ');
        for (var j = 0; j < nameArray.length; ++j) {
            //console.log("add the following " + nameArray[j]);
            trie.add(nameArray[j]);
        }
        // code to decide synonym no adding in trie
        var p = csTable[i].next;
        while (p != null) {
            //console.log("checking");
            //console.log(csTable[i].name);
            //console.log(p.name);
            var x1 = csTable[i].name.indexOf(p.name);
            //console.log("x1 =" + x1);
            if (csTable[i].name.indexOf(p.name) >= 0) {
                csTable[i].synonym = 1;
                //console.log("contains");
                //console.log(p.name); 
                p = p.next;
            }
            else {
                //Need fixing?
                console.log("Read company: " + p.name);
                trie.add(p.name);
                csTable[i].synonym = 2;
                p = p.next;
            }
        }
    }
}
function readArticle() {
    var readlineSync = require('readline-sync');
    console.log("Reading news article.");
    console.log("Articles are processed after a line of one or more periods (.....)");
    var news = true; //if there are more lines
    var s = '';
    while (news) {
        var input = readlineSync.question("Please enter a line:");
        let regex = /(\.+)/;//one or more periods
        if (input.match(regex)) { 
            news = false;
            break;
        }
        s = s + ' ' + input; //put all lines into a single string
    }
    console.log("Processing.");
    // remove period, question mark and change dash symbol
    s = s.replace(/[.?]/g, '').replace(/[-]/g, ' ').trim();
    var stringArray = s.split(" ");
    //console.log(stringArray);
    var totalWords = stringArray.length;
    //console.log(totalWords);
    for (var i = 0; i < totalWords; ++i) {
        trie.search(stringArray[i]);
    }
    /*
    For the number of words in the article, we are not interested in:
    "a", "an", "the", "and", "or", and "but", except when they are part of the company name/synonym.

    Therefore, we do the search on the whole stringArray, but need to trim it when we count.
    */
   for (i = 0; i < stringArray.length; i++) {
        if (stringArray[i] === 'a' || stringArray[i] === 'an' || stringArray[i] === 'the' || stringArray[i] === 'and' || stringArray[i] === 'or' || stringArray[i] === 'but') {
        stringArray.splice(i, 1); 
            if(i != 0){
                i--;
            }
        }
    }
    //console.log (stringArray);//fixed stringArray.
    let cutWords = stringArray.length;//new length for totalWords
    printOutput(cutWords); //print frequency
}
var format = function (num) { //to display as percentages
    return (Math.floor(num * 100000) / 1000)
        .toFixed(8).substr(0, 7).concat('%'); //actually, I forget where the code is originally from. Sorry.
};
function getMin(nameArray) {
    var length = nameArray.length;
    var num = [];
    for (var i = 0; i < length; ++i) {
        //console.log(nameArray[i]);
        var cnt = trie.getCount(nameArray[i]);
        //console.log(cnt);
        num.push(cnt);
    }
    //console.log(num);
    var count = Math.min.apply(Math, num);
    //console.log(count);
    return count;
}
// t12
function getAllCount(name, p) {
    //console.log("getAllCount ==>");
    //console.log(name);
    var nameArray = name.split(" ");
    var cnt = getBothCount(nameArray);
    //console.log("cnt = " + cnt);
    while (p != null) {
        //console.log(p.name);
        nameArray = p.name.split(" ");
        var cnt2 = getBothCount(nameArray);
        //console.log("cnt2 = " + cnt2);
        cnt = cnt + cnt2;
        //console.log("cnt = " + cnt);
        p = p.next;
    }
    return cnt;
}
// t12
function getBothCount(nameArray) {
    var count = 0;
    if (nameArray.length == 1) {
        count = trie.getCount(nameArray[0]);
    }
    else {
        count = getMin(nameArray);
    }
    return count;
}
function printOutput(tw) { //tw is total number of words, after removing "a", "and", etc.
    var cntArray = [];
    console.log("Output:\n ");
    console.log("----------------------------------------------------------");
    console.log("Company" + "\t\t\t     Hit Count" + "\t\tRelevance ");
    for (var i = 0; i < csTable.length; ++i) {
        var name_1 = csTable[i].name;
        var syn = csTable[i].synonym;
        var p = csTable[i].next; 
        var count = void 0;
        var nameArray = name_1.split(" ");
        if (syn == 1) {
            if (nameArray.length > 1) {
                name_1 = nameArray[0];
            }
            count = trie.getCount(name_1);
            name_1 = csTable[i].name; //change back to display name
        }
        else if (syn == 2) {
            // need to add the count for synonym 
            //console.log("Come here");
            count = getAllCount(name_1, p);
            //console.log(count);
        }
        else {
            if (nameArray.length == 1) {
                count = trie.getCount(nameArray[0]);
            }
            else {
                count = getMin(nameArray);
            }
        }
        if (isNaN(count)) {
            count==0;
        }
        cntArray.push(count);
        var relevance = format(count / tw); //frequency measure
        //console.log("name= " + name_1);
        //console.log("name length = " + name_1.length);
        if (name_1.length < 5) {
            console.log(csTable[i].name + "\t\t\t\t" + count + "\t\t" + relevance); //spacing is wierd
        }
        else if (name_1.length > 5 && name_1.length < 10) {
            console.log(csTable[i].name + "\t\t\t" + count + "\t\t" + relevance);
        }
        else if (name_1.length > 10 && name_1.length < 20) {
            console.log(csTable[i].name + "\t\t" + count + "\t\t" + relevance);
        }
        else if (name_1.length > 20) {
            console.log(csTable[i].name + "\t" + count + "\t\t" + relevance);
        }
    }
    var sum = 0;
    for (var i = 0; i < cntArray.length; ++i) {
        sum = sum + cntArray[i];
    }
    var relSum = format(sum / tw);
    console.log("----------------------------------------------------------");
    console.log("  Total  " + "\t\t\t" + sum + "\t\t" + relSum); //the spacing is as it appears in the instructions
    console.log("----------------------------------------------------------");
    console.log(" Total Words " + "\t\t\t" + tw);
    console.log("----------------------------------------------------------");
}
//main
var trie = new TrieClass();
var csTable = []; //company names in an array
readCompany();
//printCStable();
addCompany();
readArticle();
