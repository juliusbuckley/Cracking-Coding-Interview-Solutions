'use strict';

// Node class
class Node {
  constructor(val) {
    this._value = val;
    this._edges = {};
  }
}
// Graph class
class Graph {
  constructor() {
    this._nodes = {};
  }
  addNode(val) {
    let node = new Node(val);
    if (!this._nodes[node._value]) {
      this._nodes[node._value] = node;
    }
  }
  addEdge(from, target) {
    this._nodes[from]._edges[target] = target;
  }
  removeEdge(from, target) {
    if (this._nodes[from] === undefined) {
      return undefined;
    }
    let temp = this._nodes[from]._edges[target];
    delete this._nodes[from]._edges[target];
    return temp;
  }
  // Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes
  routeExist(from, target) {
    if (this._nodes[from]._edges[target] || this._nodes[from]._value === target) {
      return true;
    } 
    for (let currentEdge in this._nodes[from]._edges) {
      if (!this._nodes[currentEdge].visited) {
        this._nodes[currentEdge].visited = true;
        if ((this.routeExist(currentEdge, target))) {
          // toggle back to false before final recursive call bubbles
          this._nodes[currentEdge].visited = false;
          return true;
        } 
      }
      this._nodes[currentEdge].visited = false;
    }
    return false;
  }
}

const graph = new Graph();
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'A');
graph.addEdge('C', 'B');
graph.addEdge('C', 'D');
graph.addEdge('E', 'A');

console.assert(graph.routeExist('E', 'A') === true, 'Should return true E->A');
console.assert(graph.routeExist('E', 'E') === true, 'Should return true E->E');
console.assert(graph.routeExist('E', 'B') === true, 'Should return true E->B');
console.assert(graph.routeExist('E', 'B') === true, 'Should return true E->B');
console.assert(graph.routeExist('A', 'E') === false, 'Should return false A->E');
console.assert(graph.routeExist('B', 'D') === true, 'Should return false B->D');
console.assert(graph.routeExist('E', 'B') === true, 'Should return true E->B');
console.assert(graph.routeExist('D', 'A') === false, 'Should return false D->A');
console.assert(graph.routeExist('D', 'C') === false, 'Should return false D->A');
console.assert(graph.routeExist('A', 'B') === true, 'Should return true A->B'); 
console.assert(graph.removeEdge('A', 'C') === 'C', 'Should remove C');
console.assert(graph.removeEdge('X', 'C') === undefined, 'Should return undefined');
console.assert(graph.removeEdge('A', 'X') === undefined, 'Should return undefined');
console.assert(graph._nodes['A']._edges['D'] === 'D', 'Should only contain D');


class BinarySearchTree {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
  insert(val) {
    if (val < this.value) {
      if (this.left === null) {
        this.left = new BinarySearchTree(val);
      } else {
        this.left.insert(val);
      }
    } else if (val > this.value) {
      if (this.right === null) {
        this.right = new BinarySearchTree(val);
      } else {
        this.right.insert(val);
      }
    }
  }
  contains(target) {
    if (target === this.value) {
      return true;
    }
    if (target < this.value) {
      return !!this.left && this.left.contains(target);
    }
    if (target > this.value) {
      return !!this.right && this.right.contains(target);
    } 
  }
  depthFirst(cb) {
    cb(this.value);
    if (this.left) {
      this.left.depthFirst(cb);
    }
    if (this.right) {
      this.right.depthFirst(cb);
    }
  }
  breadthFirst(cb) {
    // create queue
    const queue = [this];
    while (queue.length) {
      let current = queue.shift();
      cb(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }
}

const bst = new BinarySearchTree(12);
bst.insert(20);
bst.insert(17);
bst.insert(11);
bst.insert(4);
bst.insert(9);
bst.insert(1);
bst.insert(13);
bst.insert(30);
bst.insert(3);
bst.insert(7);
// bst.breadthFirst(node => console.log(node.value));
console.assert(bst.contains(9) === true, 'shoud be false');

// Given a sorted (increasing order) array with unique integer elements, write an algo­rithm to create a binary search tree with minimal height
const createBST = (array) => {
  let rootIndex = Math.ceil(array.length / 2);
  let root = Number(array.splice(rootIndex, 1).join(''));
  const bst = {
    value: root,
    left: null,
    right: null
  };
  console.log(bst);
  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    if (current < bst.value) {
      if (bst.left === null) {
        bst.left = {
          value: current,
          left: null,
          right: null
        };
      } else {
        // recurse 
      }
    } else if (current > bst.value) {
      if (bst.right === null) {
        if (bst.right === null) {
        bst.right = {
          value: current,
          right: null,
          right: null
        };
      } else {
        // recurse
      }
    }
  }
  
};

createBST([1, 3, 4, 7, 9, 11, 12, 13, 17, 20, 30]);