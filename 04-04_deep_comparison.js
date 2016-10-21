// function deepEqual(a,b) {
//   if (typeof a == 'object' &&  typeof b == 'object') {
//     if (Object.keys(a).length == Object.keys(b).length) {
//       for (var property in a){
//         if (property in b)
//           return deepEqual(a.property, b.property);
//         else 
//           return false;
//       }
//     } else
//       return false;
//   } else 
//     return (a === b);
// }

function deepEqual(a,b) {
  if (a === b)
    return true;

  if (typeof a != 'object' || typeof b != 'object') {
    console.log('object test');
    return true; 
  }
  
  var aProperties = 0, bProperties = 0;
  for (var property in a) {
    aProperties += 1;
  }
  for (var property in b) {
    bProperties += 1;
  }

  if (aProperties == bProperties) {
    for (var property in a){
      if (!deepEqual(a[property], b[property]))
        console.log('hier');
        return false;
    }
  }
  console.log('approved');
  return true;
}


var test1 = {key: "value", key2: "value2"}
var test2 = {key: "value", key2: "value2"}
console.log(deepEqual(test1,test2));
// var obj1 = {here: {is: "an"}, object: 2, extra: 4};
// var obj2 = {here: {is: "an"}, object: 2, extra: 4};
// console.log(deepEqual(obj1, obj2));
// keys1 = Object.keys(obj1);
// keys2 = Object.keys(obj2);

// console.log(keys1 == keys2);
// console.log(obj1 == obj2);
// console.log(typeof obj1);
// console.log(typeof 543);

// console.log();
