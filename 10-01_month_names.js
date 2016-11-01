// Object as Interface
var month = function() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October','November', 'December'];

  return {
    name: function(number) {
      return months[number];
    },
    number: function(name) {
      return months.indexOf(name);
    }
  }
}();

// ==== ALTERNATIVE ====
// doesnt work in node but works in the browser
// (function(exports) {
//   var months = ['January', 'February', 'March', 'April', 'May', 'June','July','August', 'September', 'October','November', 'December'];

//   exports.name = function(number) {
//     return months[number];
//   };

//   exports.number = function(name) {
//     return months.indexOf(name);
//   };

// })(this.month = {});


console.log(month.name(2));
// → March
console.log(month.number("November"));
// // → 10
