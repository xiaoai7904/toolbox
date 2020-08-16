---
title: '移动端开中遇到的问题整理'
date: 2019-11-24 09:27:35
tags: [JavaScript,H5]
published: true
hideInList: false
feature: https://assets.hardwarezone.com/img/2017/11/ipxfront.jpg
---
在日常开发中移动端遇到的问题进行一个整理，方便后面查看
<!--more-->
* input文本框宽度设置100%时越界的解决方法

在开发H5页面时碰到这么一个坑，input文本框的宽度设置为100%时，其实际宽度居然会超出父元素，然而在PC上一切正常

```css
&-search__ipt {
    width: 100%;
    height: 60px;
    background-color: #eaeaea;
    border:0;
    outline: 0;
    border-radius: 30px;
    color: #b0b0b0;
    text-align: center;
    font-size: 20px;
}
```
解决办法: 添加`box-sizing: border-box`属性即可解决

产生原因: W3C标准定义：content宽度就是实际定义的宽度，width你定义多款conten就是多宽传统的,IE下定义：content包括：width、padding、border，也就是content=width+padding+border


* 弹出遮罩滚动条事件穿透

```javascript
// 方法一:
document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, false);

//方法二:
.scroll {
    position: fixed;
    width: 100%;
}
var scroll = (function (className) {
    var scrollTop;
    return {
        afterOpen: function () {
            scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
            document.body.classList.add(className);
            document.body.style.top = -scrollTop + 'px';
        },
        beforeClose: function () {
            document.body.classList.remove(className);
            document.scrollingElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;
        }
    };
})('scroll');
```

* IOS滚动条卡顿问题

以下代码可解决这种卡顿的问题：`-webkit-overflow-scrolling: touch;`，是因为这行代码启用了硬件加速特性，所以滑动很流畅

推荐一个插件[iScroll](https://github.com/cubiq/iscroll)

* 微信浏览器用户调整字体大小后页面矬了，怎么阻止用户调整

```javascript
//以下代码可使Android机页面不再受用户字体缩放强制改变大小，但是会有1S左右延时，期间可以考虑loading来处理
if (typeof(WeixinJSBridge) == "undefined") {
    document.addEventListener("WeixinJSBridgeReady", function (e) {
        setTimeout(function(){
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
                alert(JSON.stringify(res));
            })
        }, 0)
    });
}else{  
    setTimeout(function(){
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
            alert(JSON.stringify(res));
        })
    }, 0)   
}

//IOS下可使用 -webkit-text-size-adjust禁止用户调整字体大小
body { -webkit-text-size-adjust:100%!important; }
//最好的解决方案：最好使用rem或百分比布局

作者：我是大师兄啊
链接：https://www.jianshu.com/p/220b56eb20e9
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
```

* 屏幕旋转的事件和样式
```javascript
function orientInit(){
    var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight?'landscape':'portrait';
    if(orientChk =='lapdscape'){
        //这里是横屏下需要执行的事件
    }else{
        //这里是竖屏下需要执行的事件
    }
}
orientInit();
window.addEventListener('onorientationchange' in window?'orientationchange':'resize', function(){
    setTimeout(orientInit, 100);
},false)
//CSS处理
//竖屏时样式
@media all and (orientation:portrait){   }
//横屏时样式
@media all and (orientation:landscape){   }

作者：我是大师兄啊
链接：https://www.jianshu.com/p/220b56eb20e9
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
```

* audio元素和video元素在ios和andriod中无法自动播放

```html
<audio src="music/bg.mp3" autoplay loop controls>你的浏览器还不支持哦</audio>
<audio controls="controls"> 
    <source src="music/bg.ogg" type="audio/ogg"></source>
    <source src="music/bg.mp3" type="audio/mpeg"></source>
    优先播放音乐bg.ogg，不支持在播放bg.mp3
</audio>
```
```javascript
//JS绑定自动播放（操作window时，播放音乐）
$(window).one('touchstart', function(){
    music.play();
})
//微信下兼容处理
document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);
//小结
//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常
//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间

作者：我是大师兄啊
链接：https://www.jianshu.com/p/220b56eb20e9
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
```

* 重力感应事件

```javascript
// 运用HTML5的deviceMotion，调用重力感应事件
if(window.DeviceMotionEvent){
    document.addEventListener('devicemotion', deviceMotionHandler, false)
}
var speed = 30;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandler(eventData){
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y; 
    z = acceleration.z;
    if(Math.abs(x-lastX)>speed || Math.abs(y-lastY)>speed || Math.abs(z-lastZ)>speed ){
        //这里是摇动后要执行的方法 
        yaoAfter();
    }
    lastX = x;
    lastY = y;
    lastZ = z;
}
function yaoAfter(){
    //do something
}
```

* 开启硬件加速 

```css
.css {
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}
```

* 消除transition闪屏

```css
.css {
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
}
```

持续更新中...