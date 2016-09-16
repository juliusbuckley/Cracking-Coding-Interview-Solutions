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
  let trueString = str.slice(0,length);
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
  }
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
      }
      else if (difference > 1) {
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
    if (current !== str[i+1]) {
      result += current + count;
      count = 0;
      current = str[i+1];
    }
  }
  return result.length > str.length ? str : result;
};

assert(stringCompression('aabcccccaaa') === 'a2b1c5a3', 'Expected true');
assert(stringCompression('abc') === 'abc', 'Expected true');
