'use strict';

//////////////////////////////////////
// Assert function
//////////////////////////////////////
const assert = (expectedBehavior, descriptionOfCorrectBehavior) => {
  if (!expectedBehavior) {
    console.log(descriptionOfCorrectBehavior);
  } else {
    console.log('test passed');
  }
};

// Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
// O(N)
const isUnique = (str) => {
  const map = {};
  for (let i = 0; i < str.length; i++) {
    let current = str[i];
    if (!map[current]) {
      map[current] = true;
    } else {
      return false;
    }
  }
  return true;
};

// assert(isUnique('abcded') === false, 'Expected false');
// assert(isUnique('abc') === true, 'Expected true');

// Check Permutation: Given two strings,write a method to decide if one is a permutation of the
// other.
const checkPermutation = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }
  let newStr1 = str1.split('').sort().join('');
  let newStr2 = str2.split('').sort().join('');
  return newStr1 === newStr2;
};

const checkPermutation2 = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }
  const objectMap = (str) => {
    const map = {};
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
      map[letter] ? map[letter]++ : map[letter] = 1;
    }
    return map;
  };
  const string1 = objectMap(str1);
  const string2 = objectMap(str2);
  for (let key in string1) {
    if (string1[key] !== string2[key]) {
      return false;
    }
  }
  return true;
};

// assert(checkPermutation('stressed', 'desserts') === true, 'Expected true');
// assert(checkPermutation('rewarder', 'redrawer') === true, 'Expected true');
// assert(checkPermutation('america', 'canada') === false, 'Expected false');
// assert(checkPermutation('cat', 'dog') === false, 'Expected false');

// assert(checkPermutation2('stressed', 'desserts') === true, 'Expected true');
// assert(checkPermutation2('rewarder', 'redrawer') === true, 'Expected true');
// assert(checkPermutation2('america', 'canada') === false, 'Expected false');
// assert(checkPermutation2('cat', 'dog') === false, 'Expected false');

// Write a method to replace all spaces in a string with '%20  You may assume that the string has sufficient space at the end to hold the additional characters,and that you are given the "true" length of the string.
const URLify = (str, length) => {
  let trueString = str.slice(0, length);
  let result = '';
  for (let i = 0; i < trueString.length; i++) {
    let current = trueString[i];
    if (current === ' ') {
      result += '%20';
    } else {
      result += current;
    }
  }
  return result;
};

// assert(URLify('Mr John Smith ', 13) === 'Mr%20John%20Smith', 'Expectedtrue');

// Given a string, write a function to check if it is a permutation of a palin­drome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
// O(N)
const palindromePerm = (str) => {
  str = str.split(' ').join('').toLowerCase();
  const createMap = (str) => {
    const map = {};
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
      map[letter] ? map[letter]++ : map[letter] = 1;
    }
    return map;
  };
  const isPal = (map) => {
    let isOdd = false;
    for (let key in map) {
      if (map[key] % 2 && map[key] !== 1) {
        return false;
      }
      if (map[key] === 1) {
        if (isOdd) {
          return false;
        }
        isOdd = true;
      }
    }
    return true;
  };
  return isPal(createMap(str));
};

// assert(palindromePerm('Tact Coa') === true, 'Expected true');
// assert(palindromePerm('TR') === false, 'Expected false');
// assert(palindromePerm('abc') === false, 'Expected false');
// assert(palindromePerm('Race Car') === true, 'Expected true');

// There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.
const oneAway = (str1, str2) => {
  const createMap = (str) => {
    const map = {};
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
      map[letter] ? map[letter]++ : map[letter] = 1;
    }
    return map;
  };
  const checkEdits = (map1, map2) => {
    let flag = false;
    for (let keys in map1) {
      let difference = map1[keys] - map2[keys];
      if (difference === 1 || isNaN(difference)) {
        if (flag) {
          return false;
        } else {
          flag = true;
        }
      } else if (difference > 1) {
        return false;
      }
    }
    return true;
  };
  const string1 = str1.length > str2.length ? str1 : str2;
  const string2 = str1.length > str2.length ? str2 : str1;
  return checkEdits(createMap(string1), createMap(string2));
};

// assert(oneAway('pale', 'ple') === true, 'Expected true');
// assert(oneAway('pales', 'pale') === true, 'Expected true');
// assert(oneAway('pale', 'pales') === true, 'Expected true');
// assert(oneAway('ale', 'pale') === true, 'Expected true');
// assert(oneAway('pppale', 'pale') === false, 'Expected false');
// assert(oneAway('pale', 'bale') === true, 'Expected true');
// assert(oneAway('pale', 'bake') === false, 'Expected false');
// assert(oneAway('pale', 'paleapples') === false, 'Expected false');

// Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).
const stringCompression = (str) => {
  let current = str[0];
  let result = '';
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count++;
    if (current !== str[i + 1]) {
      result += current + count;
      count = 0;
      current = str[i + 1];
    }
  }
  return result.length > str.length ? str : result;
};

// assert(stringCompression('aabcccccaaa') === 'a2b1c5a3', 'Expected true');
// assert(stringCompression('abc') === 'abc', 'Expected true');

// Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
// O(N^2)
const rotateMatrix = (matrix) => {
  const n = matrix.length;
  for (let layer = 0; layer < n / 2; layer++) {
    console.log('layer =>', layer);
    // store first index in top 
    let first = layer;
    let last = n - 1 - layer;
    for (let i = first; i < last; i++) {
      console.log('i =>', i);
      let offset = i - first;
      let tmp = matrix[first][i];
      // assign bottom left to top left
      matrix[first][i] = matrix[last - offset][first];
      // assign bottom right to bottom left
      matrix[last - offset][first] = matrix[last][last - offset];
      // assign top right to bottom right
      matrix[last][last - offset] = matrix[i][last];
      // assign tmp to top right
      matrix[i][last] = tmp;
      console.log(matrix);
    }
    return true;
  }

};

const initial = [
  [1, 2, 3],
  [4, 5, 6],  
  [7, 8, 9],
];

 // [1, 2, 3],  7,  2, 1            7 4 1
 //  [4, 5, 6], 4, 5, 6             8   2
 //  [7, 8, 9], 9, 8, 3             9 6 3 
const result = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3]
];

/*
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16

13 9  5 1
14 10 6 2
15 11 7 3
16 12 8 4
*/

assert(rotateMatrix(initial) === true, 'Expected true');

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.
// const zeroMatrix = (matrix) => {

// };

// assert(zeroMatrix(initial) === true, 'Expected true');

//const stringRotation(str) => {

//}

