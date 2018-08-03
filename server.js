const { dialogflow } =  require('actions-on-google'); 
const bodyParser = require('body-parser');
const express = require('express');
const serveStatic = require('serve-static');
var { Image } = require('actions-on-google');
var port =process.env.PORT || 3000;
let app = express();
app.use(serveStatic('./'));


let https = require('https');


 
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
    console.log(request_params);
    let req = https.request(request_params, response_handler);
 
    req.end();
}


function appdialog(){
    this.app = dialogflow({debug: true});
    this.app.intent('Default Welcome Intent', (conv) => {
         conv.ask('\n Welcome to Your Nightmare. !');
    console.log("OK get in Default intent ");
    });
    this.app.intent('Play Football', (conv) => {
      conv.ask("Hello i'm ton do you know Liverpool Football club ?.");
      conv.ask(new Image({
      //  url:  "https://nodeton.herokuapp.com/thumb-no-image-2.jpg",
        url:"http://1.bp.blogspot.com/-jI3cBbu5xZ8/UP2Mrj0QSVI/AAAAAAAAFK8/aF1AIEGG9F4/s1600/Liverpool+FC+Logo+Wallpaper+HD+2013+2.jpg",
        alt: 'Image alternate text',
      }));
      console.log("OK get in hi intent");
    });
    this.app.intent('Ais Play Football', (conv) => {
      conv.ask("Hello i'm ton do you know Liverpool Football club ?.");
      conv.ask(new Image({
     //   url:  "https://nodeton.herokuapp.com/thumb-no-image-2.jpg",
        url:"http://1.bp.blogspot.com/-jI3cBbu5xZ8/UP2Mrj0QSVI/AAAAAAAAFK8/aF1AIEGG9F4/s1600/Liverpool+FC+Logo+Wallpaper+HD+2013+2.jpg",
        alt: 'Image alternate text',
      }));
      console.log("OK get in hi intent");
    });
      this.app.intent('AIS Play Service', (conv) => {
      conv.ask('hello Ais play Service. !');
      console.log("OK get in Ais play Service intent");
    });
     this.app.intent('Check Balance', (conv) => {
      conv.ask('hello Check Balance Service. !');
      console.log("OK get in Ais play Service intent");
    });
}
 
let app1 = new appdialog();
app.use(bodyParser.json());
app.use("/",(req,res,next)=>{
    console.log("get in.");
    if (subscriptionKey.length === 32) {
     console.log("before call function");
    bing_image_search(term);
     console.log("after call function");
} else {
    console.log('Invalid Bing Search API subscription key!');
    console.log('Please paste yours into the source code.');
}
 //   next();
},app1.app);
app.listen(port);
console.log("Create Server port :"+port);




