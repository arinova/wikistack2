const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const nunjucks=require('nunjucks');
const path=require('path');

const router=require('./routes');
const wiki=require('./routes/wiki');
const db=require('./models');
const Page= db.Page;
const User= db.User;

const app=express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(express.static(path.join(__dirname, "./public")));


/**/
User.sync({})
  .then(function(){
    Page.sync({})
  }).catch(console.error);

app.use(router);
app.use('/wiki', wiki);

app.use(function(err, req, res, next){
    console.log("Error:", err);
});

app.listen(3000);
