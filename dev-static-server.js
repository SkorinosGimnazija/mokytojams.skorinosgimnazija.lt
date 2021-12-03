/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const http = require('http');

http
  .createServer(function (req, res) {
    const url = decodeURIComponent(req.url);

    fs.readFile(`E:/TEMP/${url}`, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(4000);
