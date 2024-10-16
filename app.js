const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;

    if(url === "/"){
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>')

    res.write('</html>');
    return res.end();

    }

    if(url === '/message' && method === "POST" ){
        const body= [];
        req.on('data', (chunks)  => {
            console.log(chunks)
            body.push(chunks)
        })  //in use to listen some of event 
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            console.log(parsedBody)
        fs.writeFileSync('message.txt', message);


        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end()
    }

    res.setHeader("Content-Type", 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    
    if (req.url === '/home') {
        res.write('<body><h1>Welcome home</h1></body>');
    } else if (req.url === '/about') {
        res.write('<body><h1>Welcome to About Us page</h1></body>');
    } else if (req.url === '/node') {
        res.write('<body><h1>Welcome to my Node Js project</h1></body>');
    } else {
        // res.write('<body><h1>Hello from my Node.js server</h1></body>');
    }
    
    res.write('</html>');
    res.end();
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
