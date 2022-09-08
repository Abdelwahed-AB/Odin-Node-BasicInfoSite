const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((req, res)=>{
    let q = url.parse(req.url);

    q.pathname = (q.pathname == "/" || q.pathname == "/404.html")? "/index.html": q.pathname;

    fs.readFile("." + q.pathname, (err, data)=>{
        if(err){
            fs.readFile("./404.html", (err, data)=>{
                res.writeHead(404, {"Content-Type":"text/html"});
                res.end(data);
            });

            return;
        }
        res.writeHead(200, {"Content-Type":"text/html"});
        return res.end(data);
    });
}).listen(8080);
