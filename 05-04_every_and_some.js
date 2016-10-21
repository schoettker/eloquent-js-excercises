function every(array, test){
  for (var i = 0; i < array.length; i++){
   if (!test(array[i]))
     return false; 
  }
  return true;
}
console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 4], isNaN));

function some(array, test){
  for (var i = 0; i < array.length; i++){
   if (test(array[i]))
     return true; 
  }
  return false;
}

console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));
