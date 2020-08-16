---
title: 'TypeScript入门教程(五) - 函'
date: 2019-11-24 08:15:38
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-wu-han.jpeg
isTop: false
---

函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块
<!--more-->

### 函数
TypeScript中的函数和JavaScript中的函数一样，可以创建匿名函数和有名字的函数

```typescript
// 命名函数
function fn1() {}
// 匿名函数
let fn2 = function(){}
```

### 函数定义类型

我们可以给每个参数添加类型,而且可以给函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们一般会省略它，但是为了提升代码可以读性，一般我喜欢加上返回类型

```typescript
function fn1(x: number, y: number): number {
    return x + y
}

let fn2: (x: number, y:number) => number = function(x: number, y:number):number{ return x + y}

// 可以定义参数为可选参数
function fn3(x:number, y?:number): number {
    if(y) {
        return x + y 
    }
    return x
}
```

### this

通俗解释:**this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象**

```javascript
function fn1() {
    console.log(this)
}
fn1() // window

var fn = {
    fn1: function() {
        console.log(this)
    }
}
fn.fn1() // fn
```

### 重载

JavaScript是个动态语言，JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的

```typescript
function fn1(data: object | string | any): any{
    if(typeof data === 'object') {
        return {}
    }else if(typeof data === 'string') {
        return ''
    }
    return false
}
```
上面代码函数`fn1`接受一个参数,这个参数类型可以是对象，字符串或者其他类型，函数体内会根据接受的参数返回不同值


方法是为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用

```typescript
function fn1(data: object): object;
function fn1(data: number): boolean
function fn1(data: any): any {
    if(typeof data === 'object') {
        return {}
    }else if(typeof data === 'string') {
        return ''
    }
    return false
}
fn1({})
fn1(1)
fn1('')
```
这样改变后，重载的`fn1`函数在调用的时候会进行正确的类型检查

为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面


上面我们介绍了`TypeScript`的函数，第六节我们将介绍泛型

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html) 
[彻底理解this](https://www.cnblogs.com/pssp/p/5216085.html)
[JavaScript中的this-阮一峰](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)


