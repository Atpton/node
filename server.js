const { dialogflow } =  require('actions-on-google'); 
var _actionsOnGoogle = require('actions-on-google');
var { BrowseCarousel } = require('actions-on-google');
var { BrowseCarouselItem } = require('actions-on-google');
const bodyParser = require('body-parser');
const express = require('express');
const serveStatic = require('serve-static');
var fs = require('fs');
var { Image } = require('actions-on-google');
var port =process.env.PORT || 3000;
let app = express();
app.use(serveStatic('./'));


let https = require('https');


 
let subscriptionKey = '31bbf02e5b6940b99e07a7e07acd4180';
 
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

let term = 'liverpool';





function appdialog(){
    this.app = dialogflow({debug: true});
    this.app.intent('Default Welcome Intent', (conv) => {
         conv.ask('\n Welcome to Your Nightmare. !');
    console.log("OK get in Default intent ");
    });
    this.app.intent("infouser",(conv)=>{
     conv.ask("Heyyyyy");
    });
    this.app.intent('Default Fallback Intent',(conv)=>{
     conv.ask("Hello");
         conv.ask(new _actionsOnGoogle.Permission({
      context: '',
      permissions: ['DEVICE_PRECISE_LOCATION',"NAME"]
    }))   
    });
}
 
//let app1 = new appdialog();
var appDialogFlow = dialogflow({debug: true});
appDialogFlow.intent('Default Fallback Intent',(conv)=>{
        console.info('in fallback');
        conv.ask("Hey i'm fallback ");
});
app.use(bodyParser.json());
app.use("/",(req,res,next)=>{
    console.log("get in.");

    next();
},appDialogFlow);
app.listen(port);
console.log("Create Server port :"+port);
