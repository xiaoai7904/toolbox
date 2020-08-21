---
title: "TypeScript入门教程(二) - 变量声明"
date: 2018-10-05 13:00
tags:
 - TypeScript
---
在es5中js声明变量是通过`var`关键字进行变量声明，在es6中我们可以通过`let`,`const`两个关键字来进行声明，typescript中支持`let`,`const`进行声明变量
<!--more-->

### Var

在过去的js中(es5之前包括es5)我们声明变量是通过`var`来声明一个变量，但是var声明变量也有它不足的地方，我们接下来会详细介绍它

```javascript
var a = 'mickey'
```
通过上面的方式我们就声明了一个变量`a`类型是字符串值为`'mickey'`
我们也可以在函数中声明变量

```javascript
function fn1() {
    var age = 26
}
```

如果你是像`Java`,`C`等其他语言开发人员会对js中的var声明的变量作用域看起来很奇怪

```typescript
function fn1(flag: boolean): void | number {
    if(flag) {
        var num = 26
    }
    return num
}
fn1(false) // return undefined
fn1(true) // 26
```
上面的例子中，变量`num`声明在`if`语句中，但是我们在语句的外面还是可以访问它，这是因为`var`声明可以包含在函数，模块，命名空间和全局作用域内部任何位置被访问，js通过var声明的变量是没有块级作用域

我们在看一个例子

```typescript
var a = document.getElementsByTagName("a");
for(var i = 0; i < 7; i++){ 
   a[i].onclick = function(){
    console.log(i)
   }
}
// 这里我们点击a标签会输入 7
// 因为循环创建了i变量后面会直接覆盖前面的变量值
```
为了解决上面的问题我们可以通过闭包来解决

```javascript
var a = document.getElementsByTagName("a");
for(var i =0; i<a.length; i++){ 
   a[i].onclick = (function(i){
        return function(){alert(i);}
   })(i);
}
```
还有一种方式通过es6中的`let`来解决,接下来我们详细介绍`let`
### Let
使用`let`和之前`var`声明变量一样

```typescript
let a = 'mickey'
let b: number = 26
```
我们通过`let`声明的方式解决上面的问题

```typescript
var a = document.getElementsByTagName("a");
for(let i = 0; i < 7; i++){ 
   a[i].onclick = function(){
    console.log(i)
   }
}
// 这里我们点击a标签会输入 0,1,2,3,4,5,6,7
```
如果你想了解比较详细`let`如果使用和新的特性你可以参考[ECMAScript 6 入门-阮一峰](http://es6.ruanyifeng.com/#docs/let)

### Const
使用`Const`和之前`var`声明变量一样

```typescript
const a = 'mickey'
const b: number = 26
```
如果你想了解比较详细`Const`如果使用和新的特性你可以参考[ECMAScript 6 入门-阮一峰](http://es6.ruanyifeng.com/#docs/let)

### 解构

* 数组解构

```typescript
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```

```typescript
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f(input);
```

```typescript
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

* 对象解构

```typescript
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
```

```typescript
({ a, b } = { a: "baz", b: 101 });
```

上面简单的介绍了数组解构和对象解构，如果你想详情了解还是推荐你去[ECMAScript 6 入门-阮一峰](http://es6.ruanyifeng.com/#docs/let)这个对ES6进行非常详细的介绍，相信你会学到很多ES6中所有新特性


上面我们介绍了`TypeScript`的变量声明，第三节我们将介绍接口

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)
