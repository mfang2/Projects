/*
Michael Fang
CWID: 10430930
Assignment 5: Linked-State Routers

Note: I am having some trouble with this assignment; as I do not think I will finish in time, I have left in
console.log statements to show my work so far. I know it is incorrect, but I hope these statements will give 
a better understanding of what I was trying to accomplish. Thank you.

*/

// adjacent node structure
function AdjNode(adj, cost) {
    this.adj = adj;
    this.cost = cost;
    this.next = null;
}
function ReadingInput() {
    var fs = require('fs');
    var readlineSync = require('readline-sync');
    // read the input data into a string
    var input = fs.readFileSync("infile.dat").toString().trim();
    // store the input string into an array
    var input_arr = input.split("\n");
    var id, name; 
    var tail, node, list;
    var dest, cost, len;
    for (var i in input_arr) {
        var tt = input_arr[i];
        var tt_arr = tt.split(/\s+/);
        if (tt_arr[0] !== '') { //if it's not already initialized
            id = tt_arr[0];
            name = tt_arr[1];
            //console.log("id = " + id);
            //console.log("name = " + name);
            list = null;
            var new_router = new Router();
            new_router.name = name;
            new_router.id = id;
        }
        else {
            len = tt_arr.length;
            if (len == 3) {
                dest = tt_arr[1];
                cost = tt_arr[2];
            }
            else {
                dest = tt_arr[1];
                cost = 1;
            }
            if (list == null) {
                node = new AdjNode(dest, cost);
                list = node;
                tail = node;
                new_router.adj_list = list;
                arrNode.push(new_router);
            }
            else {
                node = new AdjNode(dest, cost);
                tail.next = node;
                tail = node;
            }
        }
    }
} // ReadingInput()
function printAdjacent() {
    console.log("print the data in the list");
    for (var i = 0; i < arrNode.length; ++i) {
        var p = arrNode[i];
        console.log("id = " + p.id);
        console.log("name = " + p.name);
        p = p.adj_list;
        while (p !== null) {
            console.log("adjacent node = " + p.adj + " cost= " + p.cost);
            p = p.next;
        }
    }
}
var Graph = function () {
    // initialize the Graph
    this.initialize = function () {
        var size = arrNode.length;
        var matrix = new Array(size);
        for (var i = 0; i < size; ++i) {
            matrix[i] = new Array(size);
        }
        // initialize the 2D array to have zero in all positions
        for (var i = 0; i < size; ++i) {
            for (var j = 0; j < size; ++j) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    };
    // New Version: Thursday
    // update arrNode.list from LSP.list 
    // assume the link is the same, only change is the cost 
    this.update = function (id, list) {
        var p1 = arrNode[id].adj_list;
        var p2 = list;
        while (p1 !== null) {
            if (p1.adj == p2.adj) {
                // update the cost
                p1.cost = p2.cost;
            }
            p1 = p1.next;
            p2 = p2.next;
        }
    };
    // New Version: Thursday
    // copy the link list value to 2D Matrix 
    this.set2DMatrix = function (matrix) {
        for (var i = 0; i < arrNode.length; ++i) {
            var p = arrNode[i];
            //console.log("id = " + p.id);
            var k1 = p.id;
            p = p.adj_list;
            while (p !== null) {
                //console.log("adjacent node = " + p.adj);
                var k2 = p.adj;
                var k3 = Number(p.cost);
                matrix[k1][k2] = k3;
                p = p.next;
            }
        }
        return matrix;
    };
    // dijkstra algorithm
    /*
        I'm not sure how to do the dijkstra pair algorithm. I *think* this is correct.
        Algorithm from Data Structures book
    */
    this.dijkstra = function (src, graph) {
        var INF = Infinity;
        this.minDistance = function (dist, visited) {
            var min = INF, minIndex = -1;
            for (var v = 0; v < dist.length; ++v) {
                if (visited[v] == false && dist[v] <= min) {
                    min = dist[v];
                    minIndex = v;
                }
            }
            return minIndex;
        };
        var dist = [], visited = [], length = graph.length;
        for (var i = 0; i < length; ++i) {
            dist[i] = INF;
            visited[i] = false;
        }
        dist[src] = 0;
        for (var i = 0; i < length - 1; ++i) {
            var u = this.minDistance(dist, visited);
            visited[u] = true;
            for (var v = 0; v < length; ++v) {
                if (!visited[v] &&
                    graph[u][v] != 0 && dist[u] != INF &&
                    dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
        console.log("dist = " + dist);
        return dist;
    }; // end of dijkstra()
}; // end of Graph()

var LSP = function () { //data structure for the link state packet that each router class sends
    this.router_id = null; // ID of the router that originates the LSP
    this.sequence = 0; // sequence number
    this.TTL = 10; // Time to live
    this.list = null;
};
var Router = function () {
    this.id = null;
    this.status = "start"; //all routers begin as started
    this.network = null;
    this.tick = 0; //whether or not the router has been parsed
    this.PACKET = null;
    this.sequence = 0;
    this.adj_list = null;
    this.routing_table = {};
    this.arrSeq = [];
    this.Graph = new Graph();
    // New Version Thursday 
    // Make an new instance of adjacent list 
    // We should put this instance in LSP.
    this.cpAdjList = function (id, list) {
        var head = null;
        var adj, cost, node, tail;
        var p = list; // p points to the old list
        while (p !== null) {
            if (head == null) {
                adj = p.adj;
                cost = p.cost;
                node = new AdjNode(adj, cost);
                head = node;
                tail = node;
                p = p.next;
            }
            else {
                adj = p.adj;
                cost = p.cost;
                node = new AdjNode(adj, cost);
                tail.next = node;
                p = p.next;
            }
        }
        /*
        let p1 = head;
        while (p1 !== null) {
          console.log("adjacent node = " + p1.adj + " cost= " + p1.cost);
          p1 = p1.next;
        }
        */
        return head;
    };
    // method origPacket
    this.origPacket = function () {
        console.log("sending packet from id = " + this.id + ", name = " + this.name);
        if (this.status !== "start") {
            console.log("   router " + this.id + " stopped, no action");
            return;
        }
        if (this.adj_list == null) {
            console.log("No need of sending packet, becasue there is no adjacent node");
            return;
        }
        this.sequence = this.sequence + 1;
        this.PACKET = new LSP();
        this.PACKET.router_id = this.id;
        this.PACKET.sequence = this.sequence;
        // New Version.
        this.PACKET.list = this.cpAdjList(this.id, this.adj_list);
        // sending the LSP to the adjacent node 
        var p = this.adj_list;
        while (p !== null) {
            var k = p.adj;
            //console.log("k = " + k);
            // New Version: Thursday
            var result = arrNode[k].getPacket(this.PACKET, this.id);
            console.log("result = " + result);
            if (result == false) {
                console.log("router " + k + " failed to responed in origPacket");
            }
            p = p.next;
        }
    }; // end of origPacket()
    // method getPacket
    this.getPacket = function (pkg, fromId) {
        console.log("router " + fromId + " ===> " + this.id + " of LSP original id " + pkg.router_id + " seq " + pkg.sequence + " TTL " + pkg.TTL);
        if (this.status !== "start") {
            console.log("   router " + this.id + " stopped, no action");
            // New Version; Thursday
            return false;
        }
        // add a logic here: if the packet comes back to the original router
        // I will discard the packet.
        if (this.id == pkg.router_id) {
            console.log("   packet back to the originator: discard LSP");
            // New Version: Thursday
            return true;
        }
        // get the decrement TTL value and check the new TTL value.
        var ttl = pkg.TTL - 1;
        if (ttl == 0) {
            console.log("   TTL is zero, discard LSP");
            // New Version: Thursday
            return true;
        }
        // handle the sequence value.
        var orig_id = pkg.router_id;
        var currSeq = pkg.sequence;
        var maxSeq = 0;
        if (typeof (this.arrSeq[orig_id]) == 'undefined') {
            maxSeq = 0;
            // set the array for arrSeq value
            this.arrSeq[orig_id] = currSeq;
        }
        else {
            maxSeq = this.arrSeq[orig_id];
        }
        //console.log("check max seq = " + maxSeq); 
        //console.log("current seq = " + currSeq);
        if (currSeq <= maxSeq) {
            console.log("   sequence number rule: discard LSP");
            // New Version: Thursday
            return true;
        }
        else {
            // set the new higher value in array.
            this.arrSeq[orig_id] = currSeq;
        }
        // LSP is not discareded. Add the action here.
        // What need to do.
        // New Version: Thursday
        var tt = this.Graph.initialize();
        this.Graph.update(orig_id, pkg.list);
        var tt = this.Graph.set2DMatrix(tt);
        console.log(tt);
        this.Graph.dijkstra(this.id, tt);
        // forwarding the LSP to the adjacent node except the sending node   
        pkg.TTL = ttl;
        var p = this.adj_list;
        while (p !== null) {
            var k = p.adj;
            //console.log("k = " + k);
            if (k !== fromId) {
                // New Version: Thursday
                var result = arrNode[k].getPacket(pkg, this.id);
                console.log("result = " + result);
                if (result == false) {
                    console.log("router " + k + " failed to respond in getPacket");
                }
            }
            p = p.next;
        }
        // New Version: Thursday
        return true;
    }; // end of getPacket()
};

function ActionCommand() { //list of actions that the program runs
    var readlineSync = require('readline-sync');
    while (true) {
        console.log("\nC/c : continue\nQ/q : quit\nP/p : print the routing table for a router\nS/s : shut down a router\nT/t : start up a router");
        var command = readlineSync.question("Please enter your instruction: ");
        console.log("command = " + command);
        if (command == "C" || command == 'c') {
            //for (let i=0; i< arrNode.length; ++i) {
            var i = 0;
            var p = arrNode[i];
            var id = p.id;
            console.log("id = " + id);
            // send an packet.
            arrNode[i].origPacket();
            //}
        }
        else if (command == "Q" || command == "q") {
            process.exit(1);
        }
        else if (command.charAt(0) == "S" || command.charAt(0) == "s") {
            var id = command.slice(1).trim();
            console.log(id);
            if (arrNode[id].status == "start") {
                arrNode[id].status = "stop"; // stop router from doing things
                console.log("router", id, " has been shut down");
            }
            else {
                console.log("router ", id, " is already shut down");
            }
        }
        else if (command.charAt(0) == "T" || command.charAt(0) == "t") {
            var id = command.slice(1).trim();
            arrNode[id].status = "start"; // start a router that has been stopped
            console.log("router ", id, " has been started");
        }
        else if (command.charAt(0) == "P" || command.charAt(0) == "p") {
            let id = command.slice(1).trim(); 
            let found=false; 
            for (let i in arrNode) { //check through each router in arrNode
                if (i == id) {
                    found=true;
                    if (arrNode[id].status = "start") { 
                        let pointer = arrNode[id].routing_table;
                        //manage unknown costs in routing table, set to 0 instead
                        for (let tempID in arrNode[id].routing_table) {
                            if(pointer[tempID].cost == undefined){
                                Pointer[tempID].cost = 0;
                            }
                            console.log(tempID+', cost: '+pointer[tempID].cost+' outgoing_link: '+pointer[tempID].sequence);
                        }
                    } else { //arrNode[id].status = "stop"
                        console.log ("router " + i + " has been turned off.");
                    }
                }
            } //end check through arrNode
            if (!found) {
                console.log ("router", i, "was not found.");
            }
        }
    } //end while statement
}
// Main Program
var arrNode = [];
ReadingInput(); //from infile.dat
printAdjacent();
//var Graph = create2DArray();
//console.log(Graph);
//var dist = dijkstra(0, Graph);
//console.log(dist); 
ActionCommand();
//arrNode[0].origPacket();
