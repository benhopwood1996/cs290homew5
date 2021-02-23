var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',function(req,res){
  var qData = [];
  for (var p in req.query){
    qData.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qData;
  res.render('get-table', context);
});


app.post('/',function(req,res){
  var qData= [];
  var bodyParams = [];
  for (var p in req.query){
    qData.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qData;
  res.render('post-table-1', context);
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
  res.render('post-table-1', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});