---
title: 'TypeScript入门教程(三) - 接口'
date: 2019-11-24 08:14:59
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-san-jie-kou.jpeg
isTop: false
---

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
<!--more-->

### 初次见面接口
先看一段实例代码

```typescript
function fn1(styles: {wdith: number}): void {
    console.log(styles.wdith)
}
fn1({width: 100, height: 200})
```
上面的代码函数接受一个参数名`styles`里面有属性`width`类型是`number`,但是我们传了其他属性，编译器只会检查那些必需的属性是否存在，然而，有些时候TypeScript却并不会这么宽松

我们修改一下上面的例子，通过接口在实现

```typescript
interface Styles {
    width: number
}

function fn1(styles: Styles): void {
    console.log(styles.wdith)
}
fn1({width: 100, height: 200}) // 这里会报错说height没有定义在接口中
```
`Styles`接口就是名字，用来描述上面例子里面的需求，它表示有一个`width`属性类型为`number`， 需要注意的是，我们在这里并不能像在其它语言里一样，说传给`fn1`的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的

**类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以**

### 可选属性
接口里面的属性不全部是必须的，我们可以不传一些参数

```typescript
interface Styles {
    width: number,
    height?: number
}

function fn1(styles: Styles): void {
    console.log(style)
}
fn1({width: 100}) // ok
```
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号

### 只读属性
一些对象属性只是只读，你不能修改它的值

```typescript
interface Styles {
    readonly width: number,
    readonly height: number
}
let styles: Styles = {width: 100, height: 200}
styles.width = 200 // error widht是只读属性不能修改
```

数组也可以创建只读，TypeScript具有ReadonlyArray<T>类型，可以确保数组创建后再也不能被修改：

```typescript
let list1: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
list1 = ro; // error!
```
上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写

```typescript
list1 = ro as number[];
```

### 函数类型
接口可以描述对象也可以描述函数类型

```typescript
interface fn1 {
    (width: number, height: number): object<{width: number, height: number}>
}
```
上面我们定义了一个函数类型的接口，下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量

```typescript
let stylesFn: fn1
stylesFn =  function(width: number, height: number){
    return { width,height }
}
```

### 可索引的类型
与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如styles[0]或styles["width"],可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型

```typescript
interface Styles {
    [index: number]: number
}
let styles: Styles
styles = [100, 200]
let width: number = styles[0]
```

### 类类型
与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约

```typescript
interface Styles {
    width: number,
    setStyle(s: object)
}
class CreateStyles implements Styles {
    width: number
    constructor() {}
    setStyle(s: object): void {}
}
```

### 继承接口
和类一样，接口也可以相互继承，我们可以从一个接口复制成员到另一个接口

```typescript
interface Styles {
    width: number
    height: number
}
interface Styles1 extends Styles {
    color: string
}
let s = <Styles1>{}
s.color = 'red'
s.width = 100
s.height = 200
```

接口可以继承多个接口

```typescript
interface Styles {
    width: number
    height: number
}
interface Styles1 {
    border: string
}
interface Styles2 extends Styles, Styles1{
    color: string
}
let s = <Styles2>{}
s.color = 'red'
s.width = 100
s.height = 200
s.border = '1px solid red'
```

### 混合类型
接口可以同时用于对象和函数使用

```typescript
interface Styles {
    width: number
    reset(): void
    (style: object): void
}
function createStyles(): Styles {
    let initStyle = <Styles>function(style: object){}
    initStyle.width = 200
    initStyle.reset = function() {}
}
```
在使用`JavaScript`第三方库的时候，你可能需要像上面那样去完整地定义类型


上面我们介绍了`TypeScript`的接口，第四节我们将介绍类

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/interfaces.html)