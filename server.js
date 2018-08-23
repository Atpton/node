var _express = require('express');

 
var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _axios = require('axios');
var axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);


var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var app = _express();
var port = process.env.APP_PORT||80;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// app.post("/",function(req,res){
//  res.json({name:`ton`});
// });
app.get("/",testcall);
async function testcall(req,res){
  console.log("inpost");
   var header = {};
   var agent = new _https2.default.Agent({
            rejectUnauthorized: false
    });
    //  header['Content-Type'] ='application/x-www-form-urlencoded';
    var randomNumber = Math.floor(Math.random() * 1000000 + 1).toString();
    header['x-api-request-id'] = 'self-' + new Date().getTime() + randomNumber;
    header['httpsAgent']=agent;
    var body = {    
                    term:"รักนะคะ",
                    method: "display",
                    channel: "Google_Assistant",
                    intent: "message",
                    timeout: 1000,
                    userId:"111111111"
               };
  var resData = await _axios2.default.post("https://dev-askaunjai.ais.co.th:8443/social-adapter-fe/chatbot",body,header);
  console.log("T");
  console.log(resData.data);
  res.json({message:resData.data});
}
_http2.default.createServer(app).listen(port,()=>{
console.log("Create Server port :"+port);
});
