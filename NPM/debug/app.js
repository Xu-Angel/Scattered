const supportsColor = require('supports-color');
 
if (supportsColor.stdout) {
    console.log('Terminal stdout supports color');
}
 
if (supportsColor.stdout.has256) {
    console.log('Terminal stdout supports 256 colors');
}
 
if (supportsColor.stderr.has16m) {
    console.log('Terminal stderr supports 16 million colors (truecolor)');
}
var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';
 

  
// fake app
 
debug('booting %o', name);
 
http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000, function(){
  debug('listening');
});
 
// fake worker of some kind
 
require('./worker');