const { dialogflow } =  require('actions-on-google'); 
const bodyParser = require('body-parser');
const express = require('express');
const serveStatic = require('serve-static');
var port =process.env.PORT || 3000;
let app = express();
app.use(serveStatic('./'));
function appdialog(){
    this.app = dialogflow({debug: true});
    this.app.intent('Default Welcome Intent', (conv) => {
         conv.ask('\n Welcome to Your Nightmare. !');
    console.log("OK get in Default intent ");
    });
    this.app.intent('Play Football', (conv) => {
      conv.ask("Hello i'm ton do you know Liverpool Football club ?.");
      console.log("OK get in hi intent");
    });
    this.app.intent('Ais Play Football', (conv) => {
      conv.ask("Hello i'm ton do you know Liverpool Football club ?.");
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
    next();
},app1.app);
app.listen(port);
console.log("Create Server port :"+port);
