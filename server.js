const express = require('express');
var request1 = require('request').defaults({ encoding: null });
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


request1.get('https://ibb.co/bSEi5K', function (error, response, body) {

    if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        console.log(data);
    }else{
        console.log(error.message)
    }
});
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
    body['grant_type'] ='urn:ietf:params:oauth:grant-type:jwt-bearer';
    body['timeout'] = 10000;
    body['assertion']='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkcGktZHBhLW1vYmlsZS1kYXRhcGxhbi1hZGFwdG9Ac3VzdGFpbmVkLW5vZGUtMjEzMTEzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RhdGFwbGFuc2hhcmluZyIsImF1ZCI6Imh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92NC90b2tlbiIsImV4cCI6MTUzNTA3ODk1NCwiaWF0IjoxNTM1MDc1MzU0LCJNU0lTRE4iOiIwOTMyNzgwMDE0In0.l3p0FO_UL272zgUPvxpeAtSQ2d7Dd7K4UmAfvS2sEjFHWaM9csVx8jde_yh8lDoINEEUYe6idgSA_y47xi3wJfD84JJwqlbHgtpivrA_TyHEHYRrazffgzn72dZpxLNycCIPDBJtOE6S-x_Gb7bvt0n_rcGJ6ppBtGLhO7zisbFh1ClCJ1NcOxAN5oMbQapl8ag1aSWseWjKAbft4CZ-rtGQrPsXlefLqLptSfZo_OeGXOj0Y70qcNR3ZaTVDCTUylj4DevkJoDC514MDo7uo9ENu18pRNCZ_Bmfx09mZb6n_cu0QNkfLWijasTC4r61Mj_heCHY4UJRN6wJIJU7Iw';
    var url = "https://www.googleapis.com/oauth2/v4/token";
   console.log("body: grant: "+body['grant_type']+"  assert: "+body['assertion']);
   console.log("Headder"+header['Content-Type']);
  var resData = await _axios2.default.post(url,body,header);
  console.log("T");
  console.log(resData.data);
  res.json({message:resData.data});
 
}
http.createServer(app).listen(port,()=>{
console.log("Create Server port :"+port);
});
//app.listen(port);
//console.log("Create Server : "+port);
