---
title: '函数节流和防抖'
date: 2019-12-11 11:08:03
tags: [JavaScript]
published: true
hideInList: false
feature: https://pic1.zhimg.com/v2-80bf6407212ecd7a5ec3a38a15d75638_1200x500.jpg
---
日常开发中会遇到很多事件执行频率很大比如:
resize、scroll、mousedown、mousemove...
执行频率越多，对应函数执行次数增多，通过引入`节流`和`防抖`可以有效解决这一问题
<!--more-->

#### 防抖(debounce)
触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

##### 示例代码
```javascript
    // 防抖函数
    function debounce(fn, wait) {
        let timer;
        return function() {
            let _this = this;
            let args = arguments;
            if(timer) { clearTimeout(timer) }
            timer = setTimeout(function(){
                fn.apply(_this, args)
            }, wait);      
        }
    }
    // 使用
    window.onresize = debounce(function() {console.log('resize')}, 500)
```

#### 节流(throttle)
高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
##### 示例代码

```javascript
    // 方式1: 使用时间戳
    function throttle1(fn, wait) {
        let time = 0;
        return function() {
            let _this = this;
            let args = arguments;
            let now = Date.now()
            if(now - time > wait) {
                fn.apply(_this, args);
                time = now;
            }
        }
    }
    // 方式2: 使用定时器
    function thorttle2(fn, wait) {
        let timer;
        return function () {
            let _this = this;
            let args = arguments;
            
            if(!timer) {
                timer = setTimeout(function(){
                    timer = null;
                    fn.apply(_this, args)
                }, wait)
            }
        }
    }
```

上面`节流`和`防抖`实现方式比较简单，但是已经可以满足日常使用，如果想更近一步了解可以查看[underscore](https://www.bootcss.com/p/underscore/)和[lodash](https://www.lodashjs.com/docs/latest)文档中`debounce`和`thorttle`