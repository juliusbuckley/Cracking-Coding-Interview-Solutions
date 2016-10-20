'use strict';

// helper func for array equality 
const areArraysEqual = (array1, array2) => {
  var areEqual = true;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      areEqual = false;
    }
  }
  return areEqual && array1.length === array2.length;
};

// Stack class
class Stack {
  constructor() {
    this.storage = [];
    this.count = 0;
  }
  push(val) {
    this.storage[this.count++] = val;
  } 
  pop() {
    this.size() && this.count--;
    const temp = this.storage[this.count];
    delete this.storage[this.count];
    return temp;
  }
  // Implement function popAt which performs a pop operation on a specific sub-stack
  popAt(index) {
    if (index >= 0 || index <= this.count) {
      this.count--;
      const temp = this.storage[index];
      delete this.storage[index];
      return temp;
    }
    return undefined;
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  peek() {
    return this.isEmpty() ? undefined : this.storage[this.count - 1];
  }
  // Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.
  sortStack() {
    let flag = false;
    while (!flag) {
      flag = true;
      for (let i = 0; i < this.count; i++) {
        if (this.storage[i] > this.storage[i + 1]) {
          flag = false;
          let temp = this.storage[i];
          this.storage[i] = this.storage[i + 1];
          this.storage[i + 1] = temp;
        }
      }
    }
  }
}
// Implement a MyQueue class which implements a queue using two stacks
class MyQueue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }
  enqueue(val) {
    this.inbox.push(val);
  }
  dequeue() {
    this.moveStack(this.inbox, this.outbox);
    let first = this.outbox.pop();
    this.moveStack(this.outbox, this.inbox);
    return first;
  }
  moveStack(inbox, outbox) {
    while (inbox.count) {
      let temp = inbox.pop();
      outbox.push(temp);
    }
  }
}

const stack = new Stack();
stack.push(19);
stack.push(30);
stack.push(1);
stack.push(50);
stack.push(11);
stack.sortStack();
console.assert(areArraysEqual(stack.storage, [1, 11, 19, 30, 50]) === true, 'should return true if array is sorted');

// Queue class
class Queue {
  constructor() {
    this.storage = [];
    this.start = 0;
    this.end = 0;
  }
  enqueue(val) {
    this.storage[this.end++] = val;
  }
  dequeue() {
    const temp = this.storage[this.start];
    this.size() && this.start++;
    return temp;
  }
  size() {
    return this.end - this.start;
  }
}

const queue = new Queue();
console.assert(queue.size() === 0, 'should be 0');
queue.enqueue(1);
console.assert(queue.size() === 1, 'should be 1');
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.assert(queue.size() === 4, 'should be 4');
console.assert(queue.dequeue() === 1, 'should be 1');
console.assert(queue.dequeue() === 2, 'should be 2');