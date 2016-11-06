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
  var headingCell = document.createElement("th");
  var regularCell = document.createElement("td");
  var text = function(content) {
    return document.createTextNode(content);
  };

  headingCell.appendChild(text("Uberschrifrt"));
  row.appendChild(headingCell);
  return table.appendChild(row);
}

var list = document.createElement("ul");
var listitem = document.createElement("li");
listitem.appendChild(document.createTextNode("Hiiii"));
list.appendChild(listitem);

document.body.appendChild(list);
document.body.appendChild(buildTable());
