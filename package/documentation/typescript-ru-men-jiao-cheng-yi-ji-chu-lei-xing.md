---
title: 'TypeScript入门教程(一) - 基础类型'
date: 2019-11-24 08:13:23
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-yi-ji-chu-lei-xing.jpeg
isTop: false
---

<!-- more -->

`Typescript`中的基础类型和`JavaScript`中定义的五种基本类型(`Number`,`String`,`Boolean`,`Undefined`,`Null`)几乎相同,还新增了枚举类型,接下来我们详细介绍`TypeScript`中的基础类型
<!--more-->

### 布尔值(Boolean)
* 布尔值类型就是简单的`true` or `false`

```typescript
let isShow: boolean = true 
// :后面是指定变量isShow的类型，如果修改了isShow的变量类型为非boolean值就会报错
```
### 数字(Number)
* `Typescript`中的数字类型和`Javascript`中的数字类型一样都是浮点数

```typescript
let age: number = 26
let money: number = 6000.04
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
```
### 字符串(String)
* `Typescript`中的字符串和`JavaScript`字符串写法一样都是通过双引号(`""`)或者单引号(`''`)表示字符串

```typescript
let str1: string = 'hi'
let str2: string = "hi"
```
### Null和Undefined
* `Typescript`中`null`和`undefined`两个各自有自己的类型分别是`null`和`undefined`

```typescript
let u: undefined = undefined
let n: null = null
// undefined和null是所有类型的子集，就是你可以把所有类型赋值成undefined和null
```
### 数组(Array)
* `Typescript`里面的数组和JavaScript中一样都可以操作数组元素,在`Typescript`中有两种定义数组的方式

```typescript
// 方法一:
let list1: string[] = ['name1', 'name2', 'name3']
let list2: number[] = [1,2,3]
// 方法二:
let list3: Array<string> = ['name1', 'name2', 'name3']
let list4: Array<number> = [1,2,3]
```
### 元组(Tuple)
* 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组

```typescript
let t: [string, number]
t = ['mickey', 26] // ok
t = [26, 'mickey'] // error
```
### 枚举(Enum)
* `enum`类型是在`JavaScript`类型中新增的类型, 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字

```typescript
enum Style {width, height, color}
let warp: Style = Style.width
```

默认情况下，枚举里面的值是从`0`开始为元素编号，也可以手动的指定成员的数值

```typescript
enum Style {width = 1, height = 2, color = 4}
let wrap: Style = Style.width
// 也可以通过枚举的值得到它的名字
let wrap: Style = Style[2] // height
```
### Any
* 我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查就可以使用`any`类型来标记这些变量

```typescript
let a: any = 'mickey'
a = 26
a = function(){}

let list1: Array<any> = [1,'name1', true]
```

***通过any定义的变量在后面可以随意赋值成其他类型的变量,这个就和js使用一样，js是弱类型语言定义变量可以不指定类型而且可以随意修改变量类型***
### Void
* 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void

```typescript
function fn(): void { console.log('test...') }

// 声明变量为void 你只能为它赋值为 undefined和null
let a: void = undefined
let b: void = null
```
### Never
* never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时
* never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never

```typescript
// 返回never的函数必须存在无法达到的终点
function fn1(): never {
    throw new Error('error')
}
// 推断的返回值类型为never
function fn2(): never {
    return error('error')
}
// 返回never的函数必须存在无法达到的终点
function fn3(): never {
    while(true) {}
}
```

上面我们介绍了`TypeScript`的基础类型，第二节我们将介绍变量声明

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/basic-types.html)