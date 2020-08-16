---
title: 'JavaScript函数'
date: 2018-03-23 09:10:05
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/javascript-han-shu.jpg
isTop: false
---

### 概念
* 函数是由事件驱动的或者当它被调用执行的可复用的代码块

`js`支持两种函数：

* 语言内部的函数（如`eval()`）
* 自己创建的函数

在`js`函数内部声明的变量(使用`var`)是局部变量，只能在函数内部访问它
你可以在不同的函数声明相同的变量名称，因为它们是局部变量，两个不会相互影响
### 函数调用

四种调用方式：

* 作为函数
* 作为方法
* 作为构造函数
* 通过`call()`和`apply()`

### 返回函数的函数

1. 当函数无明确返回值时，返回`undefined`
2. 当函数结束有`return`,返回什么就是什么

我们可以利用`return`语句实现将函数返回值，或者单纯的结束函数
在使用了`return`的时候，函数会立即停止执行，如果`return`了值出去，函数的值就为返回的值

***函数通常会返回一个唯一值，这个值可能是另一个函数***

```javascript
function fn(){
	var a = 10;
	var b = 20;
	var c = a +ｂ；
	return c;
}
console.log(fn());//输出30；
//我们可以返回的函数赋值给你个变量
var fn1 = fn();
console.log(fn1);//输出30；
//如果我们想返回的函数立即执行我们可以这样
var fn2 = fn()();//在加一个括号表示立即执行函数
```

`js`函数传递参数都是按照值传递。

<font color='red'>引用类型</font>：

`js`中引用类型都是存储在堆内存中的对象，变量中保存的实际只是一个指针，这个指针执行内存中的另一个位置，这个位置保存对象。

### 创建匿名函数

```javascript
function(){
	console.log('我是一个没有名字的函数')
}()
```

这种函数的好处是在我们只使用一次，省的在去定义一个函数名，避免命名冲突，`js`中没有命名空间的概念，因此有两个相同的函数名字，`js`会执行后面那个函数，因为`js`解析代码是一段一段的执行，他会按照最后出现的执行

* 通过自我执行来执行匿名函数：

```javascript
(function(){
	console.log('打开程序我马上就执行啦！！！')
})()
```
* 把匿名函数自我执行的返回值赋值给变量：

```javascript
var fn = (function(){
	return 'hi';
})();
console.log(fn);//输出hi
```

* 自我执行匿名函数的传参：

```javascript
(function(a){
	console.log(a);//输出10
})(10)
```

### `js`创建动态函数
`js`支持创建动态函数，动态函数必须用`Function`对象来定义(Function是`js`中的一个对象，他是引用类型，是固定不变的，对象中的Function中的'F'必须大小）

创建动态函数的基本格式：`var 变量名 = new Function('参数1','参数2'，'参数n','执行语句')`

```javascript
var fn = new Function('x','y','var sum ; sum = x + y ; return sum;')
console.log(fn(2,3));//输出5

//上面的代码等同于：
var fn = function(x,y){
	var sum;
	sum = x + y;
	return sum;
}
console.log(fn(2,3));//输出5
//第一个函数是动态函数，第二个函数是静态函数
```

***一般情况下我们不使用动态函数***

### 回调函数
回调函数是一个函数的调用的过程，简单理解就是一个函数里面传参数，传的参数是一个函数，第一个函数执行完成后再去执行第二个函数。

```javascript
function fn(fn1){
	console.log('aa')；
	fn1();
}
function fn1(){
	console.log('bb');
}
fn(fn1);
//先执行fn函数，fn函数执行完成后再执行fn1函数
//这里fn1函数就是回调函数
```

### 方法和函数的区别

```javascript
var arr = [1,2,3,4,5]
var a =12;   // 变量：自由的
arr.a= 5;     //属性：属于一个对象
function show()     //函数：自由的
{
		alert(‘a’);
}
arr.fn = function()   //方法：属于一个对象
{
		alert(‘b’);
}
```

***其实方法就是函数，只不过方法是所属的对象***
### `JS`全局函数
js中有7中全局函数：

```javascript	
escape( )、eval( )、isFinite( )、isNaN( )、parseFloat( )、parseInt( )、unescape( )
```
### 函数的几个作用
* 作为一个类构造器使用

```javascript
function Class(){};
Class.prototype = {};
var item = new Class();
```

* 作为闭包使用

```javascript
(function(){
	//独立的作用域
})（）
```
* 作为构造函数调用

```javascript
function Person(name,age){
	this.name = name;
	this.age = age;
}
var per1 = new Person('xiaoming',19);
var per2 = new Person('xiaohong',20);
per1.name;//输出'xiaoming'
per1.age;//输出19
per2.name;//输出'xiaohong'
per2.age;//输出20
```

可以使用 new 运算符结合像 Object()、Date() 和 Function() 这样的预定义的构造函数来创建对象并对其初始化。面向对象的编程其强有力的特征是定义自定义构造函数以创建脚本中使用的自定义对象的能力。创建了自定义的构造函数，这样就可以创建具有已定义属性的对象。

***优缺点：***
使用构造器函数的优点是，它可以根据参数来构造不同的对象。 缺点是构造时每个实例对象都会生成重复调用对象的方法，造成了内存的浪费

### 作为值的函数
* `JS`中函数是一种语法，也是一个值，我们可以把函数赋值给一个变量

```javascript
function fn(x,y){
	return x * y
}
var newFn = fn();
fn(2,3);//输出6
newFn(3,4);//输出12
```

* 函数也可以赋值给一个对象的属性，我们称为方法

```javascript
function fn(x,y){
	return x * y
}
var obj = {};//我们这里定义了一个空对象obj
obj.seque = fn(2.3);//我们给空对象obj动态赋值了一个属性为seque
```

### 高阶函数
这里的高阶函数可不是高数里的那个高阶函数，所谓高阶函数就是操作函数的函数，它接收一个或多个函数作为参数，并返回新函数

### call()和apply()
call()函数里面第一个参数是执行上下文，第二个是传递的参数。。。可以传递多个参数

```javascript
function.call(this,1,2,3);
```

apply()函数里面第一个参数是执行上下文，第二个是一个数组对象。

```javascript
function.apply(this,[1,2,3]);
```

***这部分后面还要完善，这里只是简单的介绍一下 add 2016.8.12***

### 函数里面的参数(arguments)
当函数被调用的时候，会得到一个参数数组，那就是`arguments`数组，通过它，函数可以访问所有它被调用时传递给它的参数

```javascript
var sum = function(){
	var i ,sum =0;
	for(i = 0;i<arguments.length;i+=1){
		sum+=arguments[i];
	}
	return sum;
};
console.log(sum(4,5,23,13,35,46,-10));//116
```

**实际上，arguments并不是一个真正的数组，它只是一个类数组的对象，它拥有一个length属性，但他缺少所有数组的方法。另外，arguments对象的长度是由传入的参数个数决定的，而不是由定义函数时的命名参数的个数决定的**

**函数在定义或者声明的时候，所有的参数都是形参，因此，我们可以根据实际情况来命名参数，函数也只有在被调用时才会传入实参。而每个函数在被调用时都会自动取得两个特殊变量：this 和 arguments**

### 递归函数
函数的递归，即一个函数在通过名字调用自身的情况下构成的

### 私有变量和私有函数
- 定义在函数内部的变量和函数，如果不对外提供接口，外面是访问不到这些函数和变量的，这就叫做私有变量和私有函数

```javascript
function Fn(){
	var a = 10;//私有变量
	var fn1 = function(){};//私有函数
}
var newFn = new Fn();
console.log(newFn.a);//undefined
console.log(newFn.fn1);//undefined
```

### 静态变量和函数
* 当定义一个函数后通过点号 “.”为其添加的属性和函数，通过对象本身仍然可以访问得到，但是其实例却访问不到，这样的变量和函数分别被称为静态变量和静态函数。

```javascript
function Obj(){};

Obj.num = 72;//静态变量
Obj.fn = function(){}//静态函数 

alert(Obj.num);//72
alert(typeof Obj.fn)//function

var t = new Obj();
alert(t.name);//undefined
alert(typeof t.fn);//undefined
```

### 实例变量和函数
* 在面向对象编程中除了一些库函数我们还是希望在对象定义的时候同时定义一些属性和方法，实例化后可以访问，js也能做到这样

```javascript
function Box(){
	this.a=[]; //实例变量
	this.fn=function(){ //实例方法
		
	}
}

console.log(typeof Box.a); //undefined
console.log(typeof Box.fn); //undefined

var box=new Box();
console.log(typeof box.a); //object
console.log(typeof box.fn); //function
```

为实例变量和方法添加新的方法和属性

```javascript
function Box(){
	this.a=[]; //实例变量
	this.fn=function(){ //实例方法
		
	}
}
		
var box1=new Box();
box1.a.push(1);
box1.fn={};
console.log(box1.a); //[1]
console.log(typeof box1.fn); //object

var box2=new Box();
console.log(box2.a); //[]
console.log(typeof box2.fn); //function
```

**在box1中修改了a和fn，而在box2中没有改变，由于数组和函数都是对象，是引用类型，这就说明box1中的属性和方法与box2中的属性与方法虽然同名但却不是一个引用，而是对Box对象定义的属性和方法的一个复制。**

**这个对属性来说没有什么问题，但是对于方法来说问题就很大了，因为方法都是在做完全一样的功能，但是却又两份复制，如果一个函数对象有上千和实例方法，那么它的每个实例都要保持一份上千个方法的复制，这显然是不科学的，这可肿么办呢，prototype应运而生。**

### prototype属性
**基本概念：**

我们创建的每个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。那么，prototype就是通过调用构造函数而创建的那个对象实例的原型对象。

使用原型的好处是可以让对象实例共享它所包含的属性和方法。也就是说，不必在构造函数中添加定义对象信息，而是可以直接将这些信息添加到原型中。使用构造函数的主要问题就是每个方法都要在每个实例中创建一遍。

在JavaScript中,一共有两种类型的值,原始值和对象值。每个对象都有一个内部属性 prototype ,我们通常称之为原型。原型的值可以是一个对象,也可以是null。如果它的值是一个对象，则这个对象也一定有自己的原型。这样就形成了一条线性的链，我们称之为原型链