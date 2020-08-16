---
title: 'TypeScript入门教程(十) - Symbols'
date: 2019-11-24 08:17:10
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-shi-symbols.jpeg
isTop: false
---
自ECMAScript 2015(ES6)起，symbol成为了一种新的原生类型，就像number和string一样
<!--more-->

### 介绍

`symbol`类型的值是通过`Symbol`构造函数创建的

```typescript
let sym1 = Symbol();

let sym2 = Symbol("key"); // 可选的字符串key
```

需要注意的是`symbol`是唯一的
像字符串一样，symbols也可以被用做对象属性的键,也可以计算出的属性名声明相结合来声明对象的属性和类成员

```typescript
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"


const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"
```

更多`Symbols`用法建议查看[阮一峰ES6](http://es6.ruanyifeng.com/#docs/symbol)里面写的很详细


上面我们介绍了`TypeScript`的Symbols，第十一节我们将介绍迭代器和生成器

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)