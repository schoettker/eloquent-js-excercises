// Vector type to store positions
function Vector(x, y) {
  this.x = x; this.y = y;
}
// change pos by passing another vector with x and y coordinates
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
// scales a vetor by a given amount
Vector.prototype.times = function(times) {
  return new Vector(this.x * times, this.y * times);
};

// builds level object, arguments = array of strings that define a level
function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = []; //array of arrays, each inner array represents horizontal line where each square is either null for empty squares or a string indicating the type of the square(wall/lava)
  this.actors = []; // array of objects where each object holds a pos, type and size property for dynamic level elements

  for (var y = 0; y < this.height; y++) {
    var line = plan[y];
    var gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x];
      var fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == 'x')
        fieldType = 'wall';
      else if (ch == '!')
        fieldType = 'lava';
      gridLine.push(fieldType); // add square(type) to the current line of the grid
    }
    this.grid.push(gridLine); // add finished line to the grid array
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type == 'player';
  })[0]; // finds the player in the actors array of object and stores it in a property of the Level
  this.status = this.finishDelay = null; // tracks whether the player has won or lost to keep the level active for a short time (to show a simple animation for example)
}

// finds out whether or not a level is finished
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

var actorChars = {
  '@': Player,
  'o': Coin,
  '=': Lava, '|': Lava, 'v': Lava
};

function Player(pos) {
  this.pos = pos.plus(new Vector (0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}

function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == '=')
    this.speed = new Vector(2, 0); // horizontal moving lava
  else if (ch == '|')
    this.speed = new Vector(0, 2); // vertical moving lava
  else if (ch == 'v') {
    this.speed = new Vector(0, 3); // dripping lava
    this.repeatPos = pos;
  }
}
Lava.prototype.type = 'lava';

function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = 'coin';

// create element and give it a class
function elt(name, className) {
  var elt = document.createElement(name);
  if (className)
    elt.className = className;
  return elt;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt('div', 'game'));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 20; // scales our one unit based dimensions up because 1px would be too small

DOMDisplay.prototype.drawBackground = function() {
  var table = elt('table', 'background');
  table.style.width = this.level.width * scale + 'px';
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt('tr'));
    rowElt.style.height = scale + 'px';
    row.forEach(function(type) {
      rowElt.appendChild(elt('td', type));
    });
  });
  return table;
;
}

// draws each actor by creating a DOM element for it 
DOMDisplay.prototype.drawActors = function() {
  var wrap = elt('div');
  // sets elements position and size based on the current actor's props
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt('div', 'actor ' + actor.type));

    rect.style.width = actor.size.x * scale + 'px';
    rect.style.height = actor.size.y * scale + 'px';
    rect.style.left = actor.pos.x * scale + 'px';
    rect.style.top = actor.pos.y * scale + 'px';
  });
  return wrap; 
};
