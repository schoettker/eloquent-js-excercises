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
  var boxes = parentGrid.childNodes;
  var grid = [];
  for (var y = 0; y < height; y++) {
    var line = [];
    for (var x = 0; x < width; x++) {
      var currentBox = boxes[x];
      line.push(currentBox.checked);
    } 
    grid.push(line);
  }
  console.log(grid);
}
randomStartGrid();
gridFromCheckboxes(gridDiv);
