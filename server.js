var http = require('http');
var express = require('express');
var app =express();
var port = process.env.port||80;
let list = [];
app.get("/",(req,res)=>{
  res.send("Hello world</br>"+JSON.stringify(list));
});
app.post("/add",(req,res)=>{
  list.push(req.body['number']);
  res.send("Hello world</br>"+JSON.stringify(list));
});
app.listen(port);
console.log("Start server port :"+port);
