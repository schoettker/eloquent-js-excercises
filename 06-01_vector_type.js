function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(vector) {
  return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.minus = function(vector) {
  return new Vector(this.x - vector.x, this.y - vector.y);
};
Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    return Math.sqrt(this.x*this.x + this.y*this.y); 
  }
});

var test = new Vector(1, 2);
var test2 = new Vector(2, 3);

console.log(test.add(test2));
console.log(test.minus(test2));
console.log(new Vector(3, 4).length);
