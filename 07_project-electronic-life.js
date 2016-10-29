// array of strings that lays out the world's grid using one character per square
// # = wall / rock, o = critters (Kleintiere), spaces = empty space
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "# ~        #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                  ~#",
            "#   ## ~     o             #",
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
// calls a given function f for each element in the grid that isn't null or undefined
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++){
      var value = this.space[x + y * this.width];
      if (value != null) {
        f.call(context, value, new Vector(x, y));
      }
    }
  }
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
  var element = new legend[char](); // bracket notation to use the value of char instead of legend.char
  element.originChar = char; // find out what character the element was originally created from
  return element;
}
function charFromElement(element) {
  if (element == null) {
    return " ";
  } else {
    return element.originChar;
  }
}

// the plan gets passed as an argument for the map
// a grid is assigned to the world object, the width is as long as the first string in the map(plan) array and the height is the amount of entries in map
// legend is a object describing what the characters mean except for space char which refers to null
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;
  // sets the element in the grid with the corresponding value & vector for each char in the map
  // line = current element from array, y = index of current element 
  map.forEach(function(line, y) {
    // iterates over each character in the line
    for (var x = 0; x < line.length; x++) {
      grid.set(new Vector(x,y), elementFromChar(legend, line[x]))
    }; 
  });
}
// builds a maplike string from current worlds state by doing a two-dimensional loop over the grids squares
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n"; // add line break before incrementing y and thus adding a new line
  } 
  return output;
};

// gives critters chance to act, looks for objects with act method, calls them and carries the action out if it is valid
World.prototype.turn = function() {
  var acted = []; // keep track of critters that already had their turn
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

// allows critters to move (actions type = move) if the destinated square is empty(null) and sets the old position of the critter to null
World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == 'move') {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction])
    if (this.grid.isInside(dest)) {
      return dest; 
    }
  };
};

function View(world, vector) {
  this.world = world;
  this.vector = vector; 
}
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target)); 
  } else {
    return '#';
  }
};
View.prototype.findAll = function(char) {
  var found = [];
  for (var dir in directions) {
  if (this.look(dir) == char) {
    found.push(dir); 
  }
    return found;
  }
};
View.prototype.find = function(char) {
  var found = this.findAll(char);
  if (found.length == 0) {
    return null;
  }
  return randomArrayElement(found);
};

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
  this.dir = 's';
}

WallFollower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != ' ') {
    start = this.dir = dirPlus(this.dir, -2);
  }
  while (view.look(this.dir) != ' ') {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) {
      break;  
    }
  }
  return {
    type: 'move',
    direction: this.dir
  }
};

function Wall() {}
// test the world with wall-following critters and normal critters
// var test = new World(plan, {'#': Wall, "~": WallFollower, "o": BouncingCritter});
// for (var i = 0; i < 5; i++) {
//   test.turn();
//   console.log(test.toString());
// }




// more lifelike world with energy, reproduction and plants

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);

  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0) {
      this.grid.set(vector, null);
    }
  }
};

var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null)
    return false;
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
  var baby = elementFromChar(this.legend, critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
}

function Plant() {
  this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater() {
  this.energy = 20;
}

PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};

var valley = new LifelikeWorld(
  ["############################",
     "#####                 ######",
     "##   ***                **##",
     "#   *##**         **  O  *##",
     "#    ***     O    ##**    *#",
     "#       O         ##***    #",
     "#                 ##**     #",
     "#   O       #*             #",
     "#*          #**       O    #",
     "#***        ##**    O    **#",
     "##****     ###***       *###",
     "############################"],
    {"#": Wall,
     "O": PlantEater,
     "*": Plant}
);


// for (var i = 0; i < 5; i++) {
//   valley.turn();
//   console.log(valley.toString());
// }
