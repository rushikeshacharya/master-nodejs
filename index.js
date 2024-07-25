const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http
  .createServer((req, res) => {
    const log = `\n ${Date.now()} : ${req.url} New Request Received...`;
    if(req.url === "/favicon.ico") return res.end();
    const myUrl = url.parse(req.url,true);
    console.log("URL", myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
      switch (myUrl.pathname) {
        case "/":
          res.end("Home Page");
          break;
        case "/about":
          res.end("This is Flash");
          break;

        default:
          res.end("404");
          break;
      }
    });
    console.log("new req received");
  })
  .listen(8000, () => {
    console.log("Server is running on 8000");
  });
