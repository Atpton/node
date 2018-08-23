var _express = require('express');

 
var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _axios = require('axios');
var axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);


var http = require('http');

//var _http2 = _interopRequireDefault(_http);

var app = _express();
var port = process.env.APP_PORT||80;
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
                    timeout: 6000,
                    userId:"111111111"
               };
  var resData = await _axios2.default.post("https://dev-askaunjai.ais.co.th:8443/social-adapter-fe/chatbot",body,header);
  console.log("T");
  console.log(resData.data);
  res.json({message:resData.data});
}
http.createServer(app).listen(port,()=>{
console.log("Create Server port :"+port);
});
