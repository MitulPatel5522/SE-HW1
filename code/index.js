const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "content-type": "text/html" });
      fs.createReadStream("./code/index.html").pipe(res);
      break;
    case "/calculator.js":
      res.writeHead(200);
      fs.createReadStream("./code/calculator.js").pipe(res);
      break;
    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(process.env.PORT || 3000);

module.exports = server;
