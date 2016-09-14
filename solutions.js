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