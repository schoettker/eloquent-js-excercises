var month = (function() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October','November', 'December'];

  return {
    name: function(number) {
      return months[number];
    },
    number: function(name) {
      return months.indexOf(name);
    }
  }
}());


console.log(month.name(2));
// → March
console.log(month.number("November"));
// // → 10
