requirejs.config({
  baseUrl: 'js/app',
  paths: {
    'jquery': 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min'
  }
});

// 注意，这里故意把'jquery'作为第二个参数，这并不会导致运行时错误
// 因为模块加载器会分析'jquery'和'jquery.page'的依赖关系。有一点
// 很重要，'jquery.page'模块的定义方式（查看js/app/jquery.page.js文件），
// 即define(['jquery'], factory)
// 说明了jquery.page模块依赖jquery，因此factory函数会等到jquery模块加载
// 完成后才会执行。
require(['jquery.page', 'jquery'], function (jpage, $) {
  // jquery和jquery.page模块加载完成才会执行这里
  var $pagination = $('#pagination');

  $pagination.tinyPagination({
    pageCount: 999,
    current: 100,
    // 默认关闭跳页
    allowedGo: false,
    preTxt: 'GoTo',
    goBtnTxt: 'GO',
    backFn: function (pageNuber) {
      console.log(pageNuber)
    }
  });
});