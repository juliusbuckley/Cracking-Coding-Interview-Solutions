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

assert(isUnique('abcded') === false, `Expected ${isUnique('abcded')} to equal false`);
assert(isUnique('abc') === true, `Expected ${isUnique('abcded')} to equal true`);

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

assert(checkPermutation('stressed', 'desserts') === true, `Expected ${checkPermutation('stressed', 'desserts')} to equal true`);
assert(checkPermutation('rewarder', 'redrawer') === true, `Expected ${checkPermutation('stressed', 'desserts')} to equal true`);
assert(checkPermutation('america', 'canada') === false, `Expected ${checkPermutation('america', 'canada')} to equal false`);
assert(checkPermutation('cat', 'dog') === false, `Expected ${checkPermutation('cat', 'dog')} to equal false`);

assert(checkPermutation2('stressed', 'desserts') === true, `Expected ${checkPermutation2('stressed', 'desserts')} to equal true`);
assert(checkPermutation2('rewarder', 'redrawer') === true, `Expected ${checkPermutation2('stressed', 'desserts')} to equal true`);
assert(checkPermutation2('america', 'canada') === false, `Expected ${checkPermutation2('america', 'canada')} to equal false`);
assert(checkPermutation2('cat', 'dog') === false, `Expected ${checkPermutation2('cat', 'dog')} to equal false`);

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

assert(URLify('Mr John Smith ', 13) === 'Mr%20John%20Smith', `Expected ${URLify('Mr John Smith ', 13)} to equal true`);

// Given a string, write a function to check if it is a permutation of a palin­drome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

const palindromePerm = (str) => {
  str = str.split(' ').join('').toLowerCase();

  const createMap = (str) => {
    const map = {};
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
      map[letter] ? map[letter]++ : map[letter] = 1;
    }
    return map;
  }

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
  }

  return isPal(createMap(str));
};

assert(palindromePerm('Tact Coa') === true, `Expected ${palindromePerm('Tact Coa')} to equal true`);
assert(palindromePerm('abc') === false, `Expected ${palindromePerm('abc')} to equal false`);
assert(palindromePerm('Race Car') === true, `Expected ${palindromePerm('Race Car')} to equal true`);