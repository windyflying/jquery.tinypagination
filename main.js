requirejs.config({
  baseUrl: 'js/app',
  paths: {
    'jquery': 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min'
  }
});

require(['jquery.page', 'jquery'], function () {
  console.log('arguments.length = %d', arguments.length)
  var jQ = arguments[1];
  var $pagination = jQ('#pagination');

  $pagination.tinyPagination({
    pageCount: 999,
    current: 100,
    // 默认关闭跳页
    // allowedGo: true,
    preTxt: 'GoTo',
    goBtnTxt: 'GO',
    backFn: function (pageNuber) {
      console.log(pageNuber)
    }
  });
});