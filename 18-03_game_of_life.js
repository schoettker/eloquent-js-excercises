var gridDiv = document.getElementById('grid');
var width = 30;
var height = 10;
var currentGrid = [];
function randomStartGrid() {
  for (var y = 0; y < height; y++) {
    var line = [];
    for (var x = 0; x < width; x++) {
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      randomChecked(checkbox);
      gridDiv.appendChild(checkbox);
      line.push(checkbox.checked);
    } 
    gridDiv.appendChild(document.createElement('br'));
    currentGrid.push(line);
  }
}

function randomChecked(input) {
 Math.random() < 0.25 ? input.checked = true : input.checked = false;
 return input; 
}

// takes the next (new) grid in array form and appends to the gridDiv in the DOM
function checkboxesFromGrid(grid) {
  grid.forEach(function(line) {
    line.forEach(function(boxChecked) {
      checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = boxChecked;
      gridDiv.appendChild(checkbox);
    });
  gridDiv.appendChild(document.createElement('br'));
  });
}
// var testgrid = [[true,true,true,false,false],[false,false,true,false,true]];
// checkboxesFromGrid(testgrid);

// creates a 2D array with the input.checked booleans for every checkbox in the gridDiv from the DOM
function gridFromCheckboxes(parentGrid) {
  var childs  = parentGrid.childNodes;
  var boxes = [];
  for (var i = 0; i < childs.length; i++) {
    if (childs[i].checked != undefined)
      boxes.push(childs[i])
  };
  var grid = [];
  var currWidth = 0;
  for (var y = 0; y < height; y++) {
    var line = [];
    for (var x = 0; x < width; x++) {
      var currentBox = boxes[x+currWidth];
      line.push(currentBox.checked);
    } 
    currWidth += width;
    grid.push(line);
  }
}
randomStartGrid();
gridFromCheckboxes(gridDiv);

function countAliveNeighbours(grid) {
  // debugger
 for (var y = 0; y < grid.length; y++) {
   for (var x = 0; x < grid[0].length; x++) {
    var currentBox = grid[y][x];
    var aliveNeighbours = 0;
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        var coord1 = Math.min(Math.max(0, i), grid.length);
        var coord2 = Math.min(Math.max(0, j), grid[0].length);
        // if (grid[coord1][coord2] == true && (coord1 != y || coord2 != x))
        //   aliveNeighbours += 1;
      // }
        // console.log('i is:' + i);
        // console.log('y is:' + y);
          if ((0 <= i + y && 0 <= j + x) &&
              (grid.length > i + y && grid[0].length > j + x) &&
              (grid[i+y][j+x] == true))// &&
              // (i != y || j != x))
          aliveNeighbours += 1;
    }
    }
     if (currentBox == true)
       aliveNeighbours -= 1;
    console.log(aliveNeighbours);
   }
 } 
}

// var testarr = [[true, true, false]];
var testarr = [[true, true, false],
               [true, false, true]];
countAliveNeighbours(testarr);
