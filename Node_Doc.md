# Node Documentation

## Core Module

---

1. http  
   Launch a server ,send request

2. https  
   Launch aSSl server

3. fs (file_system)

4. path

5. os

## Create Server using http

---

1. Import http module from node

   `const http = require('http');`

2. To Create Server

   `http.createServer()`

   It will take a function with to arugment request and response

3. Function

   ```js
   const http = require("http");

   function rqlistener(req, res) {
     console.log(req);
   }

   const server = http.createServer(rqlistener);
   ```

   ```js
   const http = require("http");
   const server = http.createServer(function rqlistener(req, res) {
     console.log(req);
   });
   ```

   next gen js or Anonymous function

   ```js
   const http = require("http");
   const server = http.createServer((req, res) => {
     console.log(req);
   });
   ```

4. listen to server

   To listen to request we use listen() function which take a port number and server name

   `listen()`

   `server.listen(3000)`

## To Stop Event Loop of node js

`process.exit()`

```js
const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req);
  process.exit();
});
```

## Headers

```js
const http = require("http");
const server = http.createServer((req, res) => {
  console, log(req);
  console.log("url:--", req.url);
  console.log("method:--", req.method);
  console.log("headers:--", req.headers);
  // process.exit();
});

server.listen(3000);
```

## Wirte html in response

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from Node js Server !</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
```

## Save POST Data in file

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="inputText" /><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end(); // use return, We don't want below code excute after res.end() It would create error
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(message);
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from Node js Server !</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000); // Server listen on port 3000
```

## Under Standing Node Excute

When ever node see a async fn it would register it in a registry .

Then it would excute below code which are not async function

After completing all event it would then execute the async function.

Example

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="inputText" /><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end(); // use return, We don't want below code excute after res.end() It would create error
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(message);
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from Node js Server !</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000); // Server listen on port 3000
```

Now we get an error

since the above code execute first which is setting header `res.setHeader("Content-Type", "text/html");` and then it again trying to set header `res.setHeader("location", "/");`

```console
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (_http_outgoing.js:558:11)
    at IncomingMessage.<anonymous> (E:\Project with node\nodeBasic\app.js:65:21)
    at IncomingMessage.emit (events.js:327:22)
    at endReadableNT (internal/streams/readable.js:1327:12)
    at processTicksAndRejections (internal/process/task_queues.js:80:21) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
```

So we simple return req.on and not let to execute below code

```js

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(message);
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from Node js Server !</h1></body>");
  res.write("</html>");
  res.end();
});
```

## What is different between writeFileSync and writeFile

`fs.writeFileSync("message.txt", message);`

writeFileSync is Synchronous that mean it won't execute below or block next line of code till it doesn't perform the function of write completely

Disadavanges is that huge file

writeFile has callback function which will execute below code first and then execute writeFile function

## Routes

Comming Soon

## npm start in package.json

```json
  "scripts": {
    "start": "node app.js",
    "start-server": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

`npm start`

## Own script run

`npm run scriptname`

In package.json

## local running nodemon

if you install nodemon locally then you have to set your script in package.json
`npm start` will look nodemon local

```json
  "scripts": {
    "start": "nodemon app.js",
    "start-server": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Run gobally nodemon

`nodemon app.js`
