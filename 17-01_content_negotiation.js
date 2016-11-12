function fetchAuthor(format) {
  var request = new XMLHttpRequest();
  request.open("GET", 'http://eloquentjavascript.net/author', false);
  request.setRequestHeader('Accept', format);
  request.send(null);
  return request.responseText;
}
console.log(fetchAuthor('text/plain'));
console.log(fetchAuthor('text/html'));
console.log(fetchAuthor('application/json'));
console.log(fetchAuthor('application/rainbows+unicorns'));
