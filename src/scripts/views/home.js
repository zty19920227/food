var tplHome=require('../templates/home.string');
SPA.defineView('home',{
  html:tplHome,
  plugins: ['delegated'],
  bindEvents: {
    show: function () {
      var mySwiper=new Swiper('#index-swiper',{
        loop:false,
        pagination: '.swiper-pagination'
        // autoplay:2000
      })
    }
  },
  bindActions:{
    'person':function () {
      SPA.open('person')
    }
    }

})
