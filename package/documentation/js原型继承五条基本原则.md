---
title: js原型继承五条基本原则
date: 2017-08-23 09:12:52
tags: [学习笔记]
categories: js原型继承
---

js中的原型继承，遵守5个基本原则：

* 所有的数据都是对象
* 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
* 对象会记住它的原型
* 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型

接下来我们将详细讲解这个5个基本原则.....

<!--more-->
### 所有的数据都是对象
js在设计的时候引入了java两套类型机制：**基本类型**和**引用类型**

基本类型包括：`undefined、number、boolean、string、function、object`

我们不能说js中所有的数据都是对象，但是可以说绝大多数的数据都是对象，那么相信在js中也一定会存在一个根对象(**Object.prototype**)

在js中根对象(**Object.prototype**)是一个空的对象，我们遇到的每一个对象都是从**Object.prototype**对象克隆而来，**Object.prototype**对象就是它们的原型。

```javascript
    var obj_1 = new Object();
    var obj_2 = {};
    
    //通过Object.getPrototypeOf来查看它们的原型
    console.log(Object.getPrototypeOf(obj_1) === Object.prototype); // true
    console.log(Object.getPrototypeOf(obj_2) === Object.prototype); // true    
```

### 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
在js中我们并不需要关心克隆的细节，因为这些操作浏览器引擎内部已经实现了，我们只需要显式地调用`var obj = new Object()或者var obj = {}`，引擎会从`Object.prototype`上克隆一个对象出来。

我们也可以通过new操作符来创建一个对象

```javascript
    function Person(name){
        this.name= name;
    };
    
    Person.prototype.getName = function(){
        return this.name;
    }
    
    var r = new Person('anjie'); // 通过new操作符得到一个对象
    
    console.log(r.name);//anjie
    console.log(r.getName());//anjie
    console.log(Object.getPrototypeOf(r) === Person.prototype); // true
```

**我们通过new得到的对象具体做了什么？**
要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4
个步骤：

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性；
4. 返回新对象；

new操作符具体做了3件事
```javascript
    // 创建空对象
    var r = {}; 
    //将这个空对象的__proto__成员指向了Person函数对象prototype成员对象
    r.__proto__ = Person.prototype  
    //将Person函数对象的this指针替换成r，然后再调用Person函数,给r添加属性和方法
    Person.call(r)
```

**模仿new操作符**
```javascript
    function Person(name){
        this.name = name;
    }
    
    Person.prototype.getName = function(){
        return this.name;
    }
    
    var simulationNew = function(){
        var obj = new Object(); // 从Objecet.prototype克隆一个对象
        var Constructor = [].shift.call(arguments); // 获取外部参数
        obj.__proto__ = Constructor.prototype;//指向正确的原型
        var newObj = Constructor.apply(obj,arguments); //借用外部传入的构造器给obj设置属性
        return typeof newObj === 'object' ? newObj : obj; //确保返回的永远是一个对象
    }
    
    var a = simulationNew(Person,'anjie');
    
    console.log(a.name);//anjie
    console.log(a.getName());//anjie
    console.log(Object.getPrototypeOf(a) === Person.prototype); // true
```

### 对象会记住它的原型
js给对象提供了一个名为`__proto__`的隐藏属性，某个对象的`__proto__`属性默认会指向它的构造器的原型对象，即`{Constructor.prototype}`,在一些浏览器中，`__proto__`被公开出来了(Chrome/Firefox)

```javascript
    var a = new Object();
    console.log(a.__proto__ === Object.prototype); //true
```

`__proto__`就是对象跟对象构造器的原型联系起来的桥梁，正因为对象通过`__proto__`来记住的构造器的原型，我们上面模拟new操作符需要手动的给obj对象设置正确的`__proto__`指向

### 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型
在js中，每个对象都是通过`Object.prototype`克隆出来的，如果是这样的话我们只能得到单一的继承关系，即每个对象都是继承自`Object.prototype`对象，这样的对象显然是非常受限的。

js对象最初都是由`Object.prototype`克隆而来，但是对象构造器的原型并不仅限于`Object.prototype`上，而是可以动态指向其他对象，这样一来，但对象a需要借用b对象的能力时，可以选择性的把对象a的原型指向对象b，从而达到继承的效果。

**下面的代码是我们常用的原型继承方式：**

```javascript
    var obj = {name:'anjie'};
    
    var A = function(){}
    
    A.prototype = obj;
    
    var a = new A();
    
    console.log(a.name);//anjie
```

**上面的代码引擎内部做了什么？**

* 遍历对象a中的所有属性，但是没有name这个属性
* 查找name属性的这个请求委托对象a的构造器的原型，它被`a.__proto__`记录着并且指向`A.prototype`,而`A.prototype`被设置为对象obj
* 在对象obj中找到name属性，并返回它的值

**当我们期望得到一个类继承自另一个类时**我们通常会使用下面这段代码：

```javascript
    var A = function(){};
    A.prototype = {
        name:'anjie'
    }
    
    var B = function(){}
    B.prototype = new A();
    
    var b = new B();
    console.log(b.name);//anjie
```

**上面的代码引擎内部做了什么？**

* 遍历对象a中的所有属性，但是没有name这个属性
* 查找name属性的这个请求委托对象b的构造器的原型，它被`b.__proto__`记录着并且指向`B.prototype`,而`B.prototype`被设置为通过`new A()`创建出来的对象
* 在该对象中依然没有找到name属性，于是请求将继续委托给这个对象构造器的原型`A.prototype`
* 在`A.prototype`中找到name属性，并返回它的值

如果`A.prototype`中还没有知道name属性，请求会被传递给`A.prototype`的原型`Object.prototype`，如果没有name属性，会继续传递给`Object.prototype`的原型，`Object.prototype`的原型是`null`,所以会返回`undefined`

ES6的中带来了新的`Class`语法，让js看起来更加想一门基于类的语言，其实背后还是通过原型机制来实现的。

```javascript
    Class Person{
        constructor(name){
            this.name = name;
        },
        getName(){
            return this.name
        }
    }
    
    Class manPerson extends Person {
        constructor(name){
            super(name);
        }
    }
    
    var a = new manPerson('anjie');
    console.log(a.getName());//anjie
```

总结就写到这里了，本文简单介绍了js中原型继承的机制，希望通过学习的我们的学习总结笔记让大家也有收获，如果有什么不对的地方，望大家指点出来，我们共同学习。