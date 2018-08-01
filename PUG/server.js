var http = require('http')
var jade = require('jade')
// var html2jade = require('html2jade')

http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  // html2jade.convertDocument(document, {}, function(err, jade) {

  // })
  // 1. jade.compile
  // var fn = jade.compile('div #{course}', {})
  // var html = fn({course: 'jade'})

  // 2. jade.render
  // var html = jade.render('div #{course}', {course: 'jade render'})

  // 3. jade.renderFile
  var html = jade.renderFile('index.jade', {course: 'jade renderFile', pretty: true})


  res.end(html)
}).listen(1337, '127.0.0.1')

console.log('Server running at 1337')