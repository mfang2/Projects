/*
Michael Fang
CWID: 10430930
10/27/2018
Assignment 3: Huffman codes

2 data structures to build Huffman code: 
dictionary (to store data)
priority queue (to sort data)

notes: with some help from Groner, 2nd edition for dictionary
*/
const fs = require('fs');
const readline = require('readline-sync');

let solution =""; //because appending to file has problems. 

let format = function (num) {//
    return (Math.floor(num*1000)/1000).toFixed(2).substr(0,4);
}


//priority queue

function HuffmanNode(wt, ch) { //weight, character
    this.wt=wt;
    this.ch = ch;
    this.next=null; //this is a four-way node, so we can use it both in the queue as well as in a tree.
    this.prev=null;
    this.left=null;
    this.right=null;
}

let countFreq = function(dict, text) {
    //let d = new Dict();
    let d = dict;
    for (let i=0;i<text.length;i++) {
        let cur=text[i];
        //ignore spaces
        if (cur===" ") {
            continue; 
        }
        //check to see if already in dictionary
        if(d.has(cur)) {
            let freq = d.get(cur) + 1; //the current count, +1 for this one
            d.set(cur,freq);//put it back in dictionary
    
        } else {
            d.set(cur,1); //first time
        }
    }
    //now build huffman with the frequencies.
    let total =d.total(); //how many entries are in dictionary?
    //get keys
    let keyArr = d.keys();
    //console.log (keyArr);

    for (let i=0; i<keyArr.length; i++) {
        let ch = keyArr[i];
        let value = d.get(keyArr[i]);
        //console.log ("ch:", ch, "value:", value);
        let wt = parseFloat(format(value/total*100));
        let node = new HuffmanNode(wt,ch);
        list.add(node);
    } 
    return d;
}//end countFreq

function PriorityDoubleLinkList() {
    var length = 0;
    var head = null;
    var tail = null;
    this.add = function (node) {
        var current = head;
        var next = null;
        if (node.wt == 0) {
            return;
        }
        if (current == null && tail == null) {
            // add the first root node 
            head = node;
            tail = node;
            ++length;
        }
        else if (current == null && tail != null) {
            // add the last Huffman node
            node.prev = tail;
            tail = node;
        }
        else {
            // add the second node.
            if (length == 1) {
                if (node.wt >= current.wt) {
                    next = current.next;
                    current.next = node;
                    node.prev = current;
                    if (next != null) {
                        next.prev = node;
                        node.next = next;
                    }
                    else {
                        tail = node;
                    }
                    ++length;
                }
                else {
                    head = node;
                    node.next = current;
                    current.prev = node;
                    ++length;
                }
            }
            else {
                // more than or equal two nodes 
                // need find where to add the new node
                var search = true;
                var p = null;
                var q = null;
                while (search) {
                    p = current;
                    q = current.next;
                    if (q == null) {
                        //console.log("add the new nodes after p");
                        p.next = node;
                        node.prev = p;
                        ++length;
                        tail = node;
                        search = false;
                    }
                    else if (node.wt < p.wt) {
                        //console.log("add new node before p");
                        search = false;
                    }
                    else if (node.wt >= p.wt && node.wt < q.wt) {
                        //console.log("add new node between p and q");
                        p.next = node;
                        node.prev = p;
                        q.prev = node;
                        node.next = q;
                        search = false;
                        ++length;
                    }
                    else {
                        //console.log("the new node value is even bigger than q.ch " + q.ch);
                        search = true;
                        current = current.next;
                    }
                }
            }
        }
    };
    this.getSize = function () {
        return length;
    };
    this.peek = function () {
        return head;
    };
    this.poll = function () { //as per the java code for Huffman
        var current = head;
        head = current.next;
        current.next = null;
        --length;
    };
    this.getTail = function () {
        return tail;
    };
    this.print = function () {
        var current = head;
        while (current != null) {
            console.log("ch = " + current.ch + " wt = " + current.wt);
            current = current.next;
        }
    };
    this.printReverse = function () {
        var current = tail;
        while (current != null) {
            if (current.ch != '-') {
                console.log("ch = " + current.ch + " wt = " + current.wt);
            }
            current = current.prev;
        }
    };
    this.printReverseCode = function () {
        var current = tail;
        while (current != null) {
            if (current.ch != '-') {
                var key = current.ch;
                var value = map.get(key);
                console.log("key = " + key + " hoffman coding = " + value);
            }
            current = current.prev;
        }
    };
    var root = null; // local variable iside the List
    this.buildHuffman = function () { //replace list with huffman list
        while (list.getSize() > 1) {
            var x = list.peek();
            list.poll();
            var y = list.peek();
            list.poll();
            var wt = parseFloat(format(x.wt + y.wt));
            var ch = "-";
            var node = new HuffmanNode(wt, ch);
            node.left = x;
            node.right = y;
            root = node;
            list.add(node);
        }
        this.printCode(root, "");
        return (ss2.replace(/.$/, ""));
    };
    var ss2 = ""; // local variable inside the list
    this.printCode = function (node, s) {
        if (node.left == null && node.right == null) {
            var ss = node.ch + ":" + s + "|";
            ss2 = ss2 + ss;
            //console.log(ss);
            return;
        }
        this.printCode(node.left, s + "0");
        this.printCode(node.right, s + "1");
    };
    this.printReverseFile = function () {
        var current = tail;
        //var writeStream = fs.createWriteStream("output.dat");
        //writeStream.write("Characters sorted with frequency(weight) \n");
        while (current != null) {
            if (current.ch != '-') {
                //var ss = "ch = " + current.ch + " wt = " + current.wt + "%" + "\n";
                //writeStream.write(ss);
                var ss = current.ch + "       " + current.wt +"%\n";
                solution +=ss;
            }
            current = current.prev;
        }
        //writeStream.end();
    };
    this.printReverseCodeFile = function () {
        var current = tail;
        /*
        var writeStream = fs.createWriteStream("output.dat", { flags: 'a' });
        writeStream.write("\n");
        writeStream.write("\n");
        writeStream.write("Characters and Huffman coding listed by frequency: \n");
        */
        while (current != null) {
            if (current.ch != '-') {
                var key = current.ch;
                var value = map.get(key);
                //var ss = "key = " + key + " Huffman coding = " + value + "\n";
                var ss = key + "       " + value + "\n";
                charOrder.push(key); //array of keys, from smallest to largest
                charCode.push(value); //array of codes from smallest to largest
                solution +=ss;
                //writeStream.write(ss);
            }
            current = current.prev;
        }
        //writeStream.end();
    };

}//end PriorityDoubleLinkedList

function Map() { //for character to Huffman code
    var items = {};
    this.has = function (key) {
        if (key in items) {
            return true;
        } return false;
    };

    this.add = function (key, value) {
        items[key] = value;
    };
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };
}

//dictionary
function Dict() { //this is a map of frequencies, not the code (which is in the Map)
    var items={};
    this.set = function(key,value) {
        items[key] = value;
    };
    this.has = function(key) { //does the key exist?
        return key in items;
    };
    this.get = function(key) {//return the value of the key
        return this.has(key) ? items[key] : undefined;
    };
    this.delete = function(key) {
        if(this.has(key)) {
            delete items[key]; //delete keyword
            return true;
        }
        return false;
    };
    this.values = function() {//return all values present in the dictionary
        let values = [];
        for (let k in items) {
            if(this.has(k)) {
                values.push(items[k]); //put them in array 
            }
        }
        return values;
    }
    this.keys = function() {//return keys in dictionary
        return Object.keys(items);
    }
    this.total = function() { //count total number of values in the dictionary, so we can make frequency
        let counter=0;
        for (let k in items) {
            if(this.has(k)) {
                counter+=items[k];
            }
        }
        return counter;
    }
}

function checkFileExistsSync(filepath){
    let flag = true;
    try{
      fs.accessSync(filepath, fs.F_OK);
    }catch(e){
      flag = false;
    }
    return flag;
}

//main stuff
let res="";
let found = checkFileExistsSync("infile.dat");
if (found==false) {
    console.log ("Error: file not found, please try again");
} else {
    res = fs.readFileSync("infile.dat", {encoding: 'utf8'});
}

//ignore blanks, punctuation, special symbols
res = res.replace(/[^A-Z0-9]/ig, " ");
//build dictionary
let list = new PriorityDoubleLinkList();
let dict = new Dict();
dict = countFreq(dict, res); //count the frequencies for each character, and make frequency dictionary global
let pair = list.buildHuffman();
let pairArray = pair.split("|");
//console.log (pairArray);
let map = new Map();
for (let i=0; i<pairArray.length; ++i) {
    let x = pairArray[i].split(":");
    let key = x[0];
    let value = x[1];
    map.add(key, value);
}


let charCode=[]; //from smallest to largest, filled when countFreq is called
let charOrder=[];
let charFreq=[];

solution += "Characters sorted by frequency: \n";
solution += "Symbol  Frequency\n"
list.printReverseFile();
solution += "\nCharacters and Huffman coding, sorted by frequency: \n";
solution += "Symbol  Huffman Codes\n";
list.printReverseCodeFile();

//calculate bit length of coded message
//console.log(charOrder);
//console.log(charCode);

for (let i=0; i<charOrder.length;i++) {
    let curSym = charOrder[i];
    let curFreq = dict.get(curSym);
    charFreq.push(curFreq);
}
//console.log(charFreq);

//console.log (charCode.length, charFreq.length);
//multiply each entry of charCode with charFreq and sum to get bit length
let bitLength = 0;
for (let i=0; i<charCode.length; i++) {
    let cBit = charCode[i].length;
    //console.log (cBit);
    //console.log(typeof cBit);
    bitLength += (cBit * charFreq[i]);
}
//console.log (bitLength);
let bString = "\nThe length of the coded message in bits is: " + bitLength;
solution += bString;
//output solution to "output".dat
fs.writeFileSync('output.dat', solution, {encoding: 'utf8'});
