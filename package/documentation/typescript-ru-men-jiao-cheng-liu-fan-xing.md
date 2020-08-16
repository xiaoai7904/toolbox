---
title: 'TypeScript入门教程(六) - 泛型'
date: 2019-11-24 08:16:00
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-liu-fan-xing.jpeg
isTop: false
---

> **维基百科**  泛型是程序设计语言的一种风格或范式。泛型允许程序员在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型
<!--more-->

### 入门

下面通过两个例子来介绍`泛型`的基础用法

```typescript
// 不适用泛型的情况
function fn1(arg: number): number {
    return arg
}
function fn2(arg: any): any {
    return arg
}
```
上面例子是没有使用泛型的情况，我们使用泛型修改代码

```typescript
function fn1<T>(arg: T): T {
    return arg
}
```

我们通过添加类型变量`T`，`T`帮助我们捕获用户传入的类型，之后我们就可以使用这个类型，函数在返回`T`,这样我们可以知道参数类型和返回类型是相同并且可以跟踪函数使用的类型信息

上面一个简单的例子就是最简单的`泛型`的写法，`<>`里面的`T`可以随意修改，不一定是`T`

### 泛型变量

使用泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型，也就是说你必须把这些参数当做是任意或所有类型

```typescript
function fn1<T>(arg:[]): T[] {
    console.log(Array.isArray(arg))
    return arg
}

function fn2<T>(arg: Array<T>): Array<T> {
    return arg
}
```

**上面代码是一样的效果**

### 泛型类型

泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样

```typescript
function fn1<T>(arg: T):T {
    return arg
}
let f1: <T>(arg: T) => T = fn1
```

我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型

```typescript
interface fn1Face<T> {
    (arg: T): T;
}

function fn1<T>(arg: T): T {
    return arg
}

let f1: fn1Face<number> = fn1
```

### 泛型类

泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面

```typescript
class Styles<T> {
    width: T;
    height: T;
    setStyle: (width: T, height: T) => object
}
let fn1 = new Styles<number>()
fn1.width = 100
fn1.height = 100
fn1.setStyle = function(width, height) {return {width,height}}
```

上面我们介绍了`TypeScript`的泛型，第七节我们将介绍枚举

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)