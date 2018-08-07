const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const serveStatic = require('serve-static');
var fs = require('fs');
var port =process.env.PORT || 3000;
let app = express();
app.use(serveStatic('./'));
let subscriptionKey = '31bbf02e5b6940b99e07a7e07acd4180'; 
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';
let term = 'liverpool';



let response_handler = function (response) {
    let body = '';

    response.on('data', function (d) {
        body += d;
    });

    response.on('end', function () {
        console.log('\nRelevant Headers:\n');
        for (var header in response.headers)
            // header keys are lower-cased by Node.js
            if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                 console.log(header + ": " + response.headers[header]);
        body = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('\nJSON Response:\n');
        console.log(body);
        var obj  = JSON.parse(body);
        var count = 1;
      for(element in obj['value']){
        if(obj['value'][element]['contentUrl']){
          console.log(`${count++} : ${obj['value'][element]['contentUrl']}`);
      }else console.log(`${count++}: undefined`);
    }  
        console.log("end function");
      
    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};


let bing_image_search = function (search) {
  console.log('Searching images for: ' + term);
  let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };
    let req = https.request(request_params, response_handler);
    console.log("Test");
    req.end();
}
app.get('/',function(req,res){
  bing_image_search(term);
  res.send("Hello world "+term);
  console.log("Search "+term);
});
var server = http.createServer(app).listen(port,()=>{console.log("Create Server"+port)});
