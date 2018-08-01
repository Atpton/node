const { dialogflow } =  require('actions-on-google'); 
const bodyParser = require('body-parser');
const express = require('express');
var port =process.env.PORT || 3000;
let app = express();
function appdialog(){
    this.app = dialogflow({debug: true});
    this.app.intent('hi', (conv) => {
         conv.ask('Hello I am ton. !');
    console.log("OK get in intent");
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
