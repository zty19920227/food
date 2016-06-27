var tplNew= require ("../templates/new.string");
// 引用公共方法
var util = require('../utils/fn.js');

SPA.defineView('new',{
  html:tplNew,

  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
    }
  }],

  init: {
    vm: null,
    livelistArray: [],
    homeSwiper: null,
    homeHotSwiper: null,
    formatData: function (arr) {
      var tempArr = [];
      for (var i = 0; i < arr.length; i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[i]);
        // tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },

  bindEvents: {
    'beforeShow': function () {
      var that = this;

      // 获得vm对象
      that.vm = that.getVM();

      $.ajax({
        //  url: '/api/getLivelist.php',
        url: '/food/mock/livelist.json',
        type: 'get',
        data:{
          rtype: 'origin'
        },
        success: function (rs) {
          that.livelistArray = rs.data;
          that.vm.livelist = that.formatData(rs.data);
        }
      })
    },
    'show':function(){
      var that = this;



// 下拉刷新，上拉加载更多
// console.log(this.widgets);
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
        if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/food/img/ajax-loader.gif');
              // ajax下拉刷新数据
              $.ajax({
                //  url: '/api/getLivelist.php',
                url: '/food/mock/livelist-refresh.json',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  var newArray = rs.data.concat(that.livelistArray);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;

                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/food/img/arrow.png');
                }
                })

                setTimeout(function(){
                  head.attr('src', '/food/img/ajax-loader.gif');
                },1000)
              }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/food/img/ajax-loader.gif');


              // ajax上拉加载数据

              $.ajax({
              //  url: '/api/getLivelist.php',
                url:'/food/mock/livelist-more.json',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  var newArray = that.livelistArray.concat(rs.data);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;
                  myScroll.refresh();

                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/course-footballSNS/images/arrow.png');

                }
              })

              setTimeout(function(){
                foot.attr('src', '/food/img/ajax-loader.gif');
              },1000)

              }
              })
              }
      }
});
