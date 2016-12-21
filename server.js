var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var port = normalizePort(process.env.PORT || '3000');


var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/vote';
var _db;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, '/')));
app.set('port', port);


app.all("*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('connected to mongo');
    _db = db;
    app.listen(8888, function() {
        console.log('server is running...');
    });
});

app.get('/voteResult', function(req, res, next) {

    var collection = _db.collection('resultTable');
    collection.find({}).toArray(function(err, ret) {
        if (err) {
            console.error(err);
            return;
        }

        // console.log(ret);

        var result = [
        { "name":"同学A", "result":0},
        { "name":"同学B", "result":0},
        { "name":"同学C", "result":0},
        { "name":"同学D", "result":0},
        { "name":"同学E", "result":0}
        ];

        for(var i=0;i<ret.length;i++) {

          for(var j=0;j<ret[i].votes.length;j++) {
            var v = ret[i].votes[j];
            for(var k=0;k<v.length;k++) {
              result[k].result = parseInt(result[k].result) + parseInt(v[k]);
            }
          }
        }

        for(var i=0;i<5;i++) {
          result[i].result = result[i].result/(ret.length*4);
          // console.log(result[i]);
        }

        res.json(result);
    });
});

app.get('/voteInfo', function(req, res, next) {

    var collection = _db.collection('voteTable');
    collection.findOne({"term":"2016.07-2016.12"}, function(err, ret) {
        if (err) {
            console.error(err);
            return;
        }
        res.json(ret);
    });
});

app.post('/vote', function(req, res, next) {
    var usr = req.body.infos.user;
    var votes = req.body.infos.votes;
    var options    = {upsert : true};

    console.log(votes)
    var entries={};
    var collection = _db.collection('resultTable');
    collection.update({userid:usr }, {$set :{ 'votes' : votes}},  options, function(err, ret) {
      if (err) {
          console.error(err);
      }else {
        entries.code = 0;
        entries.msg = "投票成功！";
        res.json(entries);
      }
    });
});



var http = require('http');
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
   console.log('Listening on ' + bind);
}

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}