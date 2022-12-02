let http = require("http")

const mysql = require("mysql")
const connection = mysql.createConnection({
  host	: 'db',
  user	: 'eternitywith',
  password	: '123456',
  database	: 'nodeapp'
})

connection.connect()

http.createServer(function(req,res) {
  connection.query('SELECT 1 + 1 as solution', function (error, results, fields) {
    res.end("solution:" + results[0].solution);
  })
}).listen(3000, function() { console.log('node server started at port 3000') })
