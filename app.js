const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const nunjucks=require('nunjucks');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
