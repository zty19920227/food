var tplPerson=require('../templates/person.string');
SPA.defineView('person',{
  html:tplPerson,
  plugins:['delegated'],
  bindActions:{
    'back':function(){
      this.hide();
    }
  }
})
