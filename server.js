const express = require('express');

 const bodyParser = require('body-parser');
var _https = require('https');
const serveStatic = require('serve-static');
var _https2 = _interopRequireDefault(_https);

var _axios = require('axios');
var axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);


var http = require('http');

//var _http2 = _interopRequireDefault(_http);

let app = express();
//app.use(serveStatic('./'));
var port =process.env.PORT || 3000;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_axios2.default.defaults.timeout = 6000;

_axios2.default.interceptors.request.use(function (config) {
    config.requestTime = new Date().getTime();
    return config;
}, function (err) {
    return Promise.reject(err);
});

_axios2.default.interceptors.response.use(function (res) {
  //  logger.logService({}, res.config, res, res.request.connection);
    return res;
}, function (err) {
    //logger.logService(err, err.config, {}, err.request.connection);
    return Promise.reject(err);
});
// app.post("/",function(req,res){
//  res.json({name:`ton`});
// });
app.get("/test",function(req,res){
console.log("in test");
res.send("in test");
});
app.get("/",testcall);
async function testcall(req,res){
  console.log("inpost");
   var header = {};
   var agent = new _https2.default.Agent({
            rejectUnauthorized: false
    });
    header['Content-Type'] ='application/x-www-form-urlencoded';
    //var randomNumber = Math.floor(Math.random() * 1000000 + 1).toString();
   // header['x-api-request-id'] = 'self-' + new Date().getTime() + randomNumber;
    header['httpsAgent']=agent;
    var body = {};
    body['grant_type'] ='urn:ietf:params:oauth:grant-type:jwt-bearer&';
    body['timeout'] = 10000;
    body['assertion']='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkcGktZHBhLW1vYmlsZS1kYXRhcGxhbi1hZGFwdG9Ac3VzdGFpbmVkLW5vZGUtMjEzMTEzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RhdGFwbGFuc2hhcmluZyIsImF1ZCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92NC90b2tlbiIsImV4cCI6MTUzNTAyNDk5MywiaWF0IjoxNTM1MDIxMzkzLCJNU0lTRE4iOiIwOTMyNzgwMDE0In0.XSSzCEg-ol949Fh5otmfw9KpmEtDC4aV-svX6P03HQP57Twrwa9FIw2IegFu_EY2h7DtRBww-0nQ7tzmpf2Fw8oVDn-oR3nlj6R2yCJKAaQ-vrqvPwkG5rfeouvEiwxFxdiQAiMv1cs1QkHE_wZPhyLMIXJ9PWZYqCAXPnMwQCx91o8VCmA3FL05L9iKazL-oaO_3-ohzXEmrAcLOIyPmu75w6wDh62IODNIYZhe4s0c7svfXJjfPGbAuq2jsvCczsMNqzkOuZoRStGnqjgTyBrc4TaDkK2Krq9zLGrpdkAnfljE70xW4iDEM5cLn2el7YmPO6OBgzpHBmIrBNb6jw';
    var url = "https://www.googleapis.com/oauth2/v4/token";
   console.log("body: grant: "+body['grant_type']+"  assert: "+body['assertion']);
   console.log("Headder"+header['Content-Type']);
  var resData = await _axios2.default.post(url,body,header);
  console.log("T");
  console.log(resData.data);
  res.json({message:resData.data});
 
}
//http.createServer(app).listen(port,()=>{
//console.log("Create Server port :"+port);
//});
app.listen(port);
console.log("Create Server : "+port);
