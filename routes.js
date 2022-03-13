const fs = require('fs')

const requestHandler = (req,res)=>{
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="inputText" /><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return  res.end() // use return, We don't want below code excute after res.end() It would create error
    }
    if (url==='/message' && method==='POST'){
        const body=[];
        req.on('data', (chunk)=>{
            console.log(chunk); 
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parseBody=Buffer.concat(body).toString();
            const message=parseBody.split('=')[1]
            console.log(message)
            fs.writeFile('message.txt',message,()=>{
            res.statusCode=302;
            res.setHeader('location','/')
            return res.end()
        });
        
    })
    
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>My First Page</title></head>');
res.write('<body><h1>Hello from Node js Server !</h1></body>');
res.write('</html>');
res.end();
}

// one way
// module.exports = requestHandler;

// Second 
// module.exports = {
//    handler:requestHandler,
//    someText:'Hello from routes.js',
// };

// Third
// module.exports.handler=requestHandler;
// module.exports.someText='Random Text';

// Four It a shortcut offer by node js
exports.handler=requestHandler;
exports.someText='Shortcut Text';