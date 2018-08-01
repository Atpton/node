var port =process.env.PORT || 3000;
let app = express();
function appdialog(){
    this.app = dialogflow({debug: true});
    this.app.intent('Default Welcome Intent', (conv) => {
         conv.ask('\n Welcome to Your Nightmare. !');
    console.log("OK get in Default intent ");
    });
    this.app.intent('hi', (conv) => {
      conv.ask('Hello I am ton. !');
      console.log("OK get in hi intent");
 });
}
 
let app1 = new appdialog();
let app2 = new appdialog1();
app.use(bodyParser.json());
app.use("/",(req,res,next)=>{
    console.log("get in.");
    next();
},[app1.app]);
app.listen(port);
console.log("Create Server port :"+port);
