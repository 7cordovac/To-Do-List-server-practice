var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var todoData = require('./todos.json');
var morgan = require('morgan');
var app = express();

// parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());

//parses text as url encoded data
app.use(bodyParser.urlencoded({
  extended: true
}));


//CORS node.js pkg for enabling Connect/Express middleware
app.use(cors());
app.use(express.static('public'));
//morgan  HTTP request logger middleware for node.js
app.use(morgan('short'));


function someMiddleware (req, res, next) {
  console.log(Date.now());
  return next;
}

// Routes
app.get('/todos', function (req, res) {
  res.send(todoData);
});

app.get('/todos/:id', someMiddleware, function (req, res) {
  res.send(todoData[req.params.id]);
});

app.post('/todos', function (req, res) {
  todoData.push(req.body);
  res.send(todoData);
});

app.put('/todos/:id', function (req, res) {
  var changeItem = todoData.filter(function(cur){
    return cur.id === parseInt(req.params.id);
});
  console.log("changeItem: ", changeItem);
  var i = todoData.indexOf(changeItem[0]);
  console.log('i', i);
  todoData[i] = req.body;
  res.send(todoData);
});

app.delete('/todos/:id', function(req, res) {
  var changeItem = todoData.filter(function(cur){
    return cur.id === parseInt(req.params.id);
});
  console.log('change', changeItem);
  var i = todoData.indexOf(changeItem[0]);
  todoData.splice(i, 1);
  res.send(todoData);
});

// Listener function
app.listen(8000, function() {
  console.log('heard on 8000');
});
