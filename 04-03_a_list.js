function arrayToList(array) {
  var list = null; 

  for (var i = array.length - 1; i >= 0; i--) {
    var listSoFar = list;
    list =  {value: array[i], rest: listSoFar};
  }

  return list;
}

function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(newElement, list) {
  return {value: newElement, rest: list};
}

function nth(list, position) {
  if (!list) {
    return undefined;
  } else if (position == 0) {
    return list.value;
  } else {
    return nth(list.rest, position-1);
  }
}

var array = [10, 20, 30];
console.log(arrayToList(array));
console.log(listToArray(arrayToList(array)));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList(array), 1));
