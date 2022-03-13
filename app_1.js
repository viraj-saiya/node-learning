const http =require('http'); // import from node 
// const fs = require('fs')
const routes = require('./routes') // import from files


// Server Creation
// function rqlistener(req, res){
//     console.log(req)
// }  

// const server=http.createServer(rqlistener)




// const server=http.createServer(
//     function rqlistener(req, res){
//         console.log(req)
//     }  
    

// )

// next gen js
// const server=http.createServer((req, res)=>{

        
//         console.log('url:--',req.url);
//         console.log('method:--',req.method);
//         console.log('headers:--',req.headers);
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<html>')
//         res.write('<head><title>My First Page</title></head>')
//         res.write('<body><h1>Hello from Node js Server !</h1></body>')
//         res.write('</html>')
//         res.end()
        
        
//         // process.exit();
//     })
// one way of routes export
// const server=http.createServer(routes)
// Second, Third , Four Way
console.log(routes.someText)
const server=http.createServer(routes.handler)
// const server=http.createServer(routes) 
server.listen(3000) // Server listen on port 3000   