const wikiRouter=require('express').Router();
const models=require('../models');
const Page=models.Page;
const User=models.User;

wikiRouter.get('/', function(req, res, next){
    Page.findAll()
      .then(function(pages){
        res.render('index', {pages:pages});
      }).catch(next);
});

wikiRouter.post('/', function(req, res, next){

  var page=Page.build(
    {
      title: req.body.title,
      content: req.body.content
    }
  )

  page.save().then(function(page){
      res.redirect('/'+ page.route);
  });


});

wikiRouter.get('/add', function(req, res, next){
  res.render('addpage');
});

wikiRouter.get('/:urlTitle',function(req, res, next){
  console.log("urlTitle", req.params.urlTitle);
  Page.findOne({
    where: {
      urlTitle:req.params.urlTitle
    }
  }).then(function(page){
    res.render('wikipage', {page: page});
  }).catch(next);

});

module.exports=wikiRouter;
