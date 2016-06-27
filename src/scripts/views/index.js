var tplIndex = require('../templates/index.string');

SPA.defineView('index', {
  html: tplIndex,
  plugins: ['delegated'],

  modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['new', 'search', 'more','home'], // 定义子视图的列表数组
    defaultTag: 'home', // 定义默认视图
    container: '.l-container' // 子视图的容器
  }],
  bindActions: {
    'switch.tabs': function (e, data) {
      // 设置当前 tab 高亮
      $(e.el).addClass('active').siblings().removeClass('active');
      this.modules.content.launch(data.tag);
    }


  }
});
