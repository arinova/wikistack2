var Sequelize=require('sequelize');
var db=new Sequelize('postgres://localhost:5432/wikistack2')

var Page= db.define('page',{
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  urlTitle:{
    type:Sequelize.STRING,
    allowNull:false
  },
  content:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  status:{
    type:Sequelize.ENUM('open', 'close')
  }
}, {
  getterMethods: {
    route: function(){return "wiki/" + this.urlTitle;}
  }
});

Page.hook('beforeValidate', function (page) {
    if (page.title) {
        page.urlTitle = page.title.replace(/\s/g, '_').replace(/\W/g, '');
    } else {
        page.urlTitle = Math.random().toString(36).substring(2, 7);
    }
});

var User=db.define('user', {
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    isEmail:true,
    allowNull:false
  }
});


module.exports={
  db:db,
  Page:Page,
  User:User
};
