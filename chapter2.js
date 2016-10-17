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

// LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addToTail(node) {
    const newNode = this.createNode(node);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      const temp = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.prev = temp;
    }
  }
  saveTargetNode(target) {
    const storage = [];
    let node = this.head;
    let flag = false;
    while (node && !flag) {
      if (node.value === target) {
        storage.push(node);
        flag = true;
      }
      node = node.next;
    }
    return storage[0];
  }
  createLoop(fromNode, toNode) {
    let node = this.head;
    while (node) {
      if (node.value === fromNode) {
        node.next = toNode;
        return;
      }
      node = node.next;
    }
  }
  removeHead() {
    if (!this.head) {
      return null;
    }
    const temp = this.head.value;
    this.head = this.head.next;
    return temp;
  }
  contains(target) {
    let node = this.head;
    while (node) {
      if (node.value === target) {
        return true;
      } 
      node = node.next;
    }
    return false;
  }
  createNode(val) {
    return {value: val, next: null, prev: null};
  }
  forEachNode(cb) {
    let node = this.head;
    while (node) {
      cb(node);
      node = node.next;
    }
  }
  mapNode(cb) {
    const result = [];
    let node = this.head;
    while (node) {
      result.push(cb(node));
      node = node.next;
    }
    return result;
  }
  // Write code to remove duplicates from an unsorted linked list.
  removeDups() {
    const hash = {};
    let node = this.head;
    while (node) {
      if (hash[node.value]) {
        node.prev.next = node.next;
        // handles edge case where last node is duplicate
        if (node.next) {
          node.next.prev = node.prev;
        }
      } else {
        hash[node.value] = true;
      }
      node = node.next;
    }
  }
  // Implement an algorithm to find the kth to last element of a singly linked list.
  kthToLast(k) {
    const arr = this.mapNode(node => node.value);
    const index = arr.length - 1 - k;
    return arr[index];
  }
  // Implement an algorithm to delete a node in the middle of a singly linked list, given only access to that node.
  deleteMiddle(target) {
    let runner = this.head.next;
    let node = this.head;
    while (runner) {
      if (runner.value === target) {
        node.next = node.next.next;
        return;
      } else {
        node = node.next;
        runner = runner.next;
      }
    }
  }
  // Write code to partition a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x. If x is contained within the list, the values of x only need to be after the elements less than x (see below). The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.
  partition(val) {
    const storage = [];
    const list = new LinkedList();
    this.forEachNode(node => {
      if (node.value < val) {
        list.addToTail(node.value);
      } else {
        storage.push(node.value);
      }
    });
    storage.forEach(node => list.addToTail(node));
    return list;
  }
  // You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list
  sumList(list2) {
    let sum1 = this.mapNode(node => node.value);
    let sum2 = list2.mapNode(node => node.value);
    const reverse = (list) => {
      for (let i = 0; i < list.length / 2; i++) {
        let temp = list[i];
        list[i] = list[list.length - i - 1];
        list[list.length - i - 1] = temp; 
      }
      return Number(list.join(''));
    };
    return reverse(sum1) + reverse(sum2);
  }
  // Implement a function to check if a linked list is a palindrome
  palindrome() {
    const array = this.mapNode(node => node.value);
    let node = this.head;
    let count = 0;
    while (node) {
      if (node.value !== array[array.length - count - 1]) {
        return false;
      }
      count++;
      node = node.next;
    }
    return true;
  }
  // Given two (singly) linked lists, determine if the two lists intersect. Return the inter­secting node. Note that the intersection is defined based on reference, not value. That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked list, then they are intersecting.
  intersection(node2) {
    const results = [];
    let list1 = this.head;
    let list2 = node2.head;
    while (list1) { 
      if (list1.value === list2.value) {
        results.push(list1.value);
      }
      list1 = list1.next;
      list2 = list2.next;
    }
    return results;
  }
  // Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop
  loopDetection() {
    let runner = this.head.next;
    let node = this.head;
    while (runner) {
      if (node.value === runner.value) {
        return node.value;
      }
      node = node.next;
      runner = runner.next.next;
    }
    return undefined;
  }
}

const list = new LinkedList();
list.addToTail('a');
list.addToTail('b');
list.addToTail('c');
list.addToTail('d');
list.addToTail('e');

list.createLoop('e', list.saveTargetNode('c'));
console.assert(list.loopDetection() === 'c');
