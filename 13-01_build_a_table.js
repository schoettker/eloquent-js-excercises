var MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"}
];


function buildTable(data) {
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var header = Object.keys(data[0]);
  var text = function(content) {
    return document.createTextNode(content);
  };

  table.appendChild(row);

  for (var i = 0; i < header.length; i++) {
    var headingCell = document.createElement("th");
    row.appendChild(headingCell);
    headingCell.appendChild(text(header[i]));
  }
  
  for (var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    table.appendChild(row);
    for (var k = 0; k < Object.values(data[i]).length; k++) {
      var regularCell = document.createElement("td");
      row.appendChild(regularCell);
      regularCell.appendChild(text(Object.values(data[i])[k]));
    }
  }
  return table;
};
buildTable(MOUNTAINS);

// var list = document.createElement("ul");
// var listitem = document.createElement("li");
// listitem.appendChild(document.createTextNode("Hiiii"));
// list.appendChild(listitem);

// document.body.appendChild(list);
document.body.appendChild(buildTable(MOUNTAINS));
