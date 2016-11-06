function byTagName(node, tagName) {
  var elements = [];
  var allChildren = node.childNodes;

  for (var i = 0; i < allChildren.length; i++) {
    if (allChildren[i] == tagName)
      elements += child;
  }

console.log(allChildren);
  return elements;

}

byTagName(document.body, "h1");
