/**
 *@Name: tiny-pagination
 *@VERSION: 1.3.3
 *@Author: valley
 */
 
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD模块，注册一个匿名模块
    define(['jquery'], factory);
  } else {
    // 浏览器全局变量
    factory(jQuery);
  }
}(function ($) {

// 插件逻辑封装在这个对象里
var ms = {
  defaults: {
    pageCount: 1,
    current: 1,
    allowedGo: false,
    preTxt: '转到第',
    goBtnTxt: '跳转',
    backFn: function () {}
  },
  
  init: function(obj, settings) {
    ms.fillHtml(obj, settings);
    ms.bindEvent(obj, settings);
    return this;
  },
  
  fillHtml: function(obj, settings) {
    var start = 0, 
      end     = 0,
      $first  = null,
      $last   = null;
      
    obj.empty().addClass('tiny-paging');
    settings.current = parseInt(settings.current, 10);
    settings.pageCount = parseInt(settings.pageCount, 10);
    
    // 如果settings.current不是数字或是小于等于0的数字,则设置为 1
    if (!$.isNumeric(settings.current) || settings.current <= 0) {
      settings.current = 1;
    }
    // 如果总页数不是数字,或是小于等于0的数字,则设置为 1
    if (!$.isNumeric(settings.pageCount) || settings.pageCount <= 0) {
      settings.pageCount = 1;
    }
    // 如果当前页大于总页数，则设当前页等于总页数
    if (settings.pageCount < settings.current) {
      settings.current = settings.pageCount;
    }
    start = settings.current - 2;
    end = settings.current + 2;
    
    if (settings.current > 1) {
      obj.append('<a href="#" class="prev">&lt;&lt;</a>');
    } else {
      obj.append('<span class="disabled">&lt;&lt;</span>');
    }
    if (settings.current !== 1 && settings.current >= 4 &&
        settings.pageCount !== 4) {
      obj.append('<a href="#" class="tiny-page">' + 1 + '</a>');
    }
    if (settings.current - 2 > 2 && settings.current <= settings.pageCount &&
        settings.pageCount > 5) {
      obj.append('<span>...</span>');
    }
    if ((start > 1 && settings.current < 4) || settings.current === 1) {
      end += 1 ;
    }
    if (settings.current > settings.pageCount - 4 && settings.current >=
        settings.pageCount) {
      start -= 1;
    }
    for (; start <= end; start += 1) {
      if (start <= settings.pageCount && start >= 1) {
        if (start !== settings.current) {
          obj.append('<a href="#" class="tiny-page">' +  start  + '</a>');
        } else {
          obj.append('<span class="current">' +  start  + '</span>');
        }
      }
    }
    if (settings.current + 2 < settings.pageCount - 1 && settings.current >=
        1 && settings.pageCount > 5) {
      obj.append('<span>...</span>');
    }
    if (settings.current !== settings.pageCount && settings.current <
        settings.pageCount - 2  && settings.pageCount !== 4) {
      obj.append(
        '<a href="#" class="tiny-page">' + settings.pageCount + '</a>'
      );
    }
    if (settings.current < settings.pageCount) {
      obj.append('<a href="#" class="next">&gt;&gt;</a>');
    } else {
      obj.append('<span class="disabled">&gt;&gt;</span>');
    }
    
    $first = obj.find('.tiny-page').first();
    if (parseInt($first.text(), 10) === parseInt($first.next().text(), 10)) {
      $first.remove();		
    }
    $last = obj.find('.tiny-page').last();
    if (parseInt($last.text(), 10) === parseInt($last.prev().text(), 10)) {
      $last.remove();		
    }

    // 如果开启跳页功能且总页数大于等于2页,则创建跳页元素
    if (settings.allowedGo && settings.pageCount >= 2) {
      obj.append(
        '<div class="go-to-wrap">' + settings.preTxt  + 
          '<input type="text"/>' + 
          '<a class="go-to-btn" href="#">' + 
            settings.goBtnTxt + 
          '</a>' +
        '</div>'
      );
    }
  },

  bindEvent: function(obj, settings) {
    obj.on('click', function (event) {
      event.preventDefault();
      var current, pageCount;
      var elem = event.target || event.srcElement;
      var $elem = $(elem);
      
      var helper = function () {
        var ret = true;
        switch (elem.className) {
          case 'tiny-page':
            current = parseInt($elem.text(), 10);
            break;
          case 'prev':
            current = parseInt(obj.children('.current').text(), 10) - 1;
            break;
          case 'next':
            current = parseInt(obj.children('.current').text(), 10) + 1;
            break;
          case 'go-to-btn':
            current = parseInt($elem.prev('input').val(), 10);
            pageCount = parseInt(settings.pageCount, 10);
            if (!$.isNumeric(current) || !$.isNumeric(pageCount)) {
              return !ret;
            }
            
            // 对小于等于零的输入进行转换，使分页程序正确跳转
            if (current <= 0) {
              current = 1;
            } else if (current > pageCount) {
              current = pageCount;
            }
            break;
          default:
            ret = !ret;
        }
        return ret;
      };
      
      if (!helper()) {
        return false;
      }
      ms.fillHtml(obj, {
        'current': current,
        'pageCount': settings.pageCount,
        'allowedGo': settings.allowedGo,
        'preTxt': settings.preTxt,
        'goBtnTxt': settings.goBtnTxt
      });
      if (typeof settings.backFn === 'function') {
        settings.backFn(current);
      }
    });
  }
};

// 为不支持Object.create方法的浏览器创建Object.create方法
var create = function(proto) {
  var F = function () {};
  F.prototype = proto;
  return new F();
};
Object.create = Object.create || create;

// 用jquery对象初始化插件
$.fn.tinyPagination = function(options) {
  var settings = $.extend({}, ms.defaults, options);
  return this.each(function () {
    Object.create(ms).init($(this), settings);
  });
};

}));
