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


