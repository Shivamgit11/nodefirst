const fs = require("fs");


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const data = fs.readFileSync("message.txt", 'utf8').split('\n');
    console.log(data  , "line no some ");
    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write(
          '<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>'
        );
        res.write(
            `<body>${data?.map((item) => (item) + ",")}</body>`
          );
    
        res.write("</html>");
        return res.end();
      }
    
      if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunks) => {
          console.log(chunks);
          body.push(chunks);
        }); //in use to listen some of event
        return req.on("end", () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split("=")[1];
          console.log(data);
    
          console.log(parsedBody);
          fs.writeFileSync("message.txt", `${data}\n${message}`);
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        });
      }
    
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>My First Page</title></head>");
    
      if (req.url === "/home") {
        res.write("<body><h1>Welcome home</h1></body>");
      } else if (req.url === "/about") {
        res.write("<body><h1>Welcome to About Us page</h1></body>");
      } else if (req.url === "/node") {
        res.write("<body><h1>Welcome to my Node Js project</h1></body>");
      } else {
        // res.write('<body><h1>Hello from my Node.js server</h1></body>');
      }
    
      res.write("</html>");
      res.end();
}


module.exports = {
    handler: requestHandler,
    someText: "This is the dummy text"
}