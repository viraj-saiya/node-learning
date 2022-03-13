# Express JS


```js
    // const http =require('http'); // import from node 

const express=require('express');

const app=express(); 

// Express is Middleware  Requset - Middleware - Response
app.use((req,res,next)=>{
    console.log('I am in middleware') 
    next() // Allows the request to continue to next middleware in line 
    // if no response is given

});
app.use((req,res,next)=>{
    console.log('In another middleware');
    // res.setHeader('Content-type','text/html')    
    res.send('<h1>Hello Form Express!</h1>')

})



// const server=http.createServer(app);

// server.listen(3000) // Server listen on port 3000   

app.listen(3000)


```

## Handling Different routes

```js

const express=require('express');

const app=express(); 


app.use('/',(req,res,next)=>{
    console.log('In another middleware');
    // res.setHeader('Content-type','text/html')    
    res.send('<h1>Hello Form Express!</h1>')

})


app.listen(3000)

```


path ='/'

This will be default

Check network tab in tools

/ will accpet any value in path show the above response (ie hello from express and In another middleware)

try using /add-product or /funcky 

It will always run above middleware response (ie hello from express and In another middleware).

The above middleware will executed for both /  ,  /add-product and /any random-word because this fdoes not mean theat full part (ie part after the domain)
has to be / but it has to start wit that 

Every route start / and then we other criteria 


So we will add /add-product first

Why first and before / middleware and not after it ?

Beacuse request goes from top to bottom in file 

and ifwe don't call next() it not going to next middleware

Well we are not calling next() in /add-product this middleware will be reached first because top to bottom and
/add-product will match this middleware and since i we don't call next the / middleware never get chance to handle the request 
even though filter (ie / ) would have match that request too   


The order here as well the fact whether we are calling next() or not matter a lot 

By the way if we send a response it good indicator we don't wat to call or execute next()

because it will create a error Cannot set headers after they are sent to the client

```js

const express=require('express');

const app=express(); 


app.use('/add-product',(req,res,next)=>{
    console.log('In another middleware');
    // res.setHeader('Content-type','text/html')    
    res.send('<h1>Hello Form Express!</h1>')

})
app.use('/',(req,res,next)=>{
    console.log('In another middleware');
    // res.setHeader('Content-type','text/html')    
    res.send('<h1>Hello Form Express!</h1>')

})


app.listen(3000)

```



```js
const express=require('express');

const app=express(); 

app.use('/',(req,res,next)=>{
    console.log('This will always run first');
    next()

})



app.use('/add-product',(req,res,next)=>{
    console.log('In add-product');
    res.send('<h1>The "Add Product" Page</h1>')
    // next()

})


app.use('/',(req,res,next)=>{
    console.log('In another middleware');
    
    // res.setHeader('Content-type','text/html')    
    res.send('<h1>Hello Form Express!</h1>')
    // next()

})


app.listen(3000)

```

output

This will always run first
In another middleware
This will always run first
In another middleware
This will always run first
In add-product
This will always run first
In another middleware

