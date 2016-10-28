// array of strings that lays out the world's grid using one character per square
// # = wall / rock, o = critters (Kleintiere), spaces = empty space
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

// squares are identified by their x and y coordinates
// Vector is used to represent these pairs
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(otherVector) {
  return new Vector(this.x + otherVector.x, this.y + otherVector.y);
};

// grid is part of a world but kept as seperate object to keep the world object itself simple
function Grid(width, height) {
  this.space = new Array(width * height); // creates empty array with width*height entries
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width  &&
         vector.y >= 0 && vector.y < this.height;
};
// element(x, y) is found at position (x + width * y) in the array
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y]; // returns corresponding element from space(array) when given a vector
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value; // set element from space(array) at the corresponding position from the vector to the given value 
};

// map direction names with coordinate offsets which critters can see around them on the grid
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var directionNames = "n ne e se s sw w nw".split(" ");

// creates critter that bounces in random open directions 
function BouncingCritter() {
  this.direction = randomArrayElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
  // look method of view object takes the random direction and returns the squares character
  if (view.look(this.direction) != " ") {
    this.direction = view.find(" ") || "s"; // ' || s' prevents assigning null to the direction if the critter is trapped with no empty space
  }
  return {
    type: "move", // type of action
    direction: this.direction
  };
};

function elementFromChar(legend, char) {
  if (char == " "){
    return null;
  }
  var element = new legend[char]();
  element.originChar = char;
  return element;
}
// the plan gets passed as an argument for the map
// a grid is assigned to the world object, the width is as long as the first string in the map(plan) array and the height is the amount of entries in map
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++) {
      grid.set(new Vector(x,y), elementFromChar(legend, line[x]))
    }; 
  });
}
