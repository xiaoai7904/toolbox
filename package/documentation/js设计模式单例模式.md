---
title: js设计模式单例模式
date: 2017-08-21 09:46:30
tags: [设计模式]
---
单例模式是一种常见的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象等。在js开发中，单例模式的用途同样非常广泛......
<!--more-->
### JavaScript 设计模式-单例模式

### 单例模式的定义
* 定义：`保证一个类仅有一个实例，并提供一个访问它的全局访问点。`

### 实现单例模式
* 原理：`用一个变量来保存当前是否已经为某个类创建对象，如果创建了就直接返回该对象，反之就重新实例化`

```javascript
    var Fn = function(name){
        this.name = name;
    }
    Fn.prototype.getName = function(){
        console.log(this.name);
    }
    Fn.getInstance = (function(){
        var instance = null;
        return function(name){
            if(!instance){
                instance = new Fn(name);
            }
            return instance;
        }
    })();
    var a = Fn.getInstance('xxx');
    var b = Fn.getInstance('ooo');
    
    console.log(a === b);//true
```

### 透明的单例模式
我们创建一个CreateDiv单例类来负责在页面中创建唯一的div节点，实现一个**‘透明’**的单例类，用户从这个类中创建对象的时候，可以像使用任何普通类一样。

```javascript
    var CreateDiv = (function(){
        var instance;
        var CreateDiv = function(html){
            if(instance){
                return instance;
            }
            this.html= html;
            this.init();
            return instance = this;
        };
        CreateDiv.prototype.init = function(){
            var div = $('<div></div>');
            div.html(this.html);
            $(body).append(div);
        }
        return CreateDiv;
    })()
        
    var a = new CreateDiv('one');
    var b = new CreateDiv('two');
    
    console.log(a === b); //true
```
        
    上面的代码实现了**透明**单例，但是也有它的缺点，上面我们使用了自执行函数和闭包，并且让这个匿名函数返回真正的构造函数，这样增加了一些程序的复杂度。
    如果某天我们需要利用这个类，在页面上创建很多个div，既要让这个单例类变成一个普通的可以产生多个实例，那我们就需要修改CreateDiv构造函数，把控制创建唯一对象的那段代码删除掉，这样就会刚给我带来一些不必要的麻烦，所有我们利用另外一种方式去实现，这种方式叫着**代理模式**,后面的笔记中我会详细介绍**代理模式**的具体实习方式
    
### 利用代理模式实现单例模式 
我们把上面的透明单例代码中间创建div部分代码移除出去，使他成为一个普通的创建DIV类

```javascript
    //创建div类
    var CreateDiv = function(html){
        this.html = html;
        this.init();
    }
    
    CreateDiv.prototype = function(){
        var div = $('<div></div>');
        div.html(this.html);
        $('body').append(div);
    }
    
    //代理类
    var ProxySingleton = (function(){
        var instance;
        return function(){
            if(!instance){
                instance = new CreateDiv(html);
            }
            return instance;
        }
    })()
    
    //测试
    var a = new ProxySingleton('one');
    var b = new ProxySingleton('two');
    
    console.log(a === b );//true
```
        
    通过引入代理类的方式，我们也实现了单例模式，我们把负责管理单例的逻辑移到代理类**ProxySingleton**中，**CreateDiv**就变成一个普通类，它更**ProxySingleton**组合起来就可以实现单例模式的效果，这样的代码会更叫好维护。
    
### JavaScript中的单例模式
* 上面提到的创建单例模式，更多的是接近面向对象语言中的实现，单例对象从**‘类’**创建而来，在类为中心得语言中，这是很自然的做法。
* 在JavaScript中，其实是一门无类语言，没有类这个概念，在JS中创建单例模式方法很简单，我们只需要创建一个唯一的类。
* 全局变量不是单例模式，但是在js开发中，我们经常把全局变量当成单例模式来使用
##### 我们在js开发中有必要减少全局变量的使用，如果使用了也要把它的污染降到最低，以下两种方式就是降低全局变量带来的命名污染

1. 使用命名空间

    ###### 使用对象字面量的方式来创建：

    ```javascript
        var name = {
            a:function(){
                console.log('1');
            },
            b:function(){
                console.log('2');
            }
        };
    ```

    ###### 使用动态创建命名空间

    ```javascript
        var My = {};
        My.name = function(name){
            var parts = name.split('.');
            var current = My;
            for(var i in parts){
                if(!current[parts[i]]){
                    current[parts[i]] = {};
                }
                current = current[parts[i]];
            }
        }
        My.name = ('init');
        My.name = ('dom.style');
        //上面创建结果等价于：
        var My = {
            init:{},
            dom:{
                style:{}
            }
        };
    ```

2. 使用闭包封装私有变量

```javascript
var user = (function(){
    var __name = 'anjie',
        __age = 25,
        
    return {
        getUserInfo:function(){
            return __name + '-' + __age;
        }
    }    
})();
```        
        
**我们使用下划线来约定私有变量__name和__age,他们被封装在闭包产生的作用域中，外部是访问不到这两个变量的，这样就避免了对全局的命令污染。**
   
###  通用单例模式     

```javascript
var getSingle = function(fn){
    var result;
    return function(){
        return result || (result = fn.apply(this,arguments));
    }
}

//实例
var createDiv = function(){
    var div = $('<div></div>');
    div.html('这个是测试div');
    div.css('display','none');
    $('body').append(div);
    return div;
}

var createSingleLoginLayer = getSingle(createDiv);

$('loginBtn').on('click',function(){
    var loginLayer = createSingleLoginLayer();
    loginLayer.css('display','block');
})
```

**上面代码是一个通用的单例模式，我们在日常开发中可以直接利用这段代码来实现单例模式。**

****
**以上代码借鉴于《JavaScript设计模式与开发实践》 -- 曾探,这本书对设计模式进行的详细的介绍，推荐大家学习**