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
    body['grant_type'] ='urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&';
    body['timeout'] = 10000;
    body['assertion']=`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkcGktZHBhLW1vYmlsZS1kYXRhcGxhbi1hZGFwdG9Ac3VzdGFpbmVkLW5vZGUtMjEzMTEzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RhdGFwbGFuc2hhcmluZyIsImF1ZCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92NC90b2tlbiIsImV4cCI6MTUzNTAyMzExNiwiaWF0IjoxNTM1MDE5NTE2LCJNU0lTRE4iOiIwOTMyNzgwMDE0In0.0L56IbGPf7Hfol2OBl4cd60qv-XBlvpc3UgqXumXkyRRTUC7PazxKRnR79DuLR4Lo63X25AF0B47pme_MvapUQrrsSNtS68qgrA6DCnEwZh8NdXLfyyZF11xFgbBjERoqcnGfABAaN3aainB_JTfwfVZk4-ak9a8Cqjc7jfsy9VSwm-gEULHrTwbY6u2EOFseiiUjWcPJBj9lOuFn51A7tQevtPmRBXZkw8UDIlP15vK-9Fmn_5JnYEwzTZdEkCputGZnQdPldCkVteEkqdW8t9MKM96oZdDORMo8ZIYT-BtohqDQbpA-vpeG06AmNENOO-bzljaDAQ4GsB4OO7w0g`;
    var url = "https://www.googleapis.com/oauth2/v4/token";
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
