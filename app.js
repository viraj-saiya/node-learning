const express=require('express');

const app=express(); 

app.use('/',(req,res,next)=>{
    console.log('This will always run first');
    next()

});



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