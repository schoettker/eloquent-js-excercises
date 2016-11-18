
// Warn if overriding existing method
if(Array.prototype.equals)
      console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                        // recurse into the nested arrays
                        if (!this[i].equals(array[i]))
                            return false;       
                    }           
            else if (this[i] != array[i]) { 
                        // Warning - two different object instances will never be equal: {x:20} != {x:20}
                        return false;   
                    }           
        }       
      return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
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
  console.log(grid.equals(currentGrid));
  console.log(grid);
}
randomStartGrid();
gridFromCheckboxes(gridDiv);
console.log('What it should look like');
console.log(currentGrid);
