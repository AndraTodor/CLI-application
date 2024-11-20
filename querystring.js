var http = require("http");
var url = require("url");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);
  })
  .listen(8080);

var fs = require("fs");
fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

fs.writeFile("mynewfile1.txt", " This is my text.", function (err) {
  if (err) throw err;
  console.log("Replaced!");
});

// fs.unlink("mynewfile1.txt", function (err) {
//   if (err) throw err;
//   console.log("File deleted!");
// });

fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
