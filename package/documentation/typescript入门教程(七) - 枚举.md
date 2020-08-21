---
title: "TypeScript入门教程(七) - 枚举"
date: 2018-10-10 14:00
tags:
 - TypeScript
---

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举
<!--more-->

### 数字枚举

```typescript
enum des {
    top = 1,
    right,
    bottom,
    left
}
```

上面代码定义了数字枚举,top使用初始化值为`1`,其余的成员就会从`1`开始自动增长

我们也可以不制定初始化值，那么`top`就会是`0`，其他成员就会从`0`开始增长

### 字符串枚举

 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化

 ```typescript
 enum des {
    top = 'TOP',
    right = 'RIGHT',
    bottom = 'BOTTOM',
    left = 'LEFT'
 }
 ```
由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息（尽管`反向映射`(后面会讲解)会有所帮助），字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字

### 使用枚举

使用枚举很简单：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：

```typescript
enum Des {
    top = 1,
    right,
    bottom,
    left
}

function fn1(des: Des):void {
    console.log(des) // 1
}

fn1(Des.top)
```

### 计算的和常量成员

每个枚举成员都带有一个值，它可以是`常量`或`计算出来的`。 当满足如下条件时，枚举成员被当作是常量

* 它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值`0`:
```typescript
// E.X is constant:
enum E { X }
```
* 它不带有初始化器且它之前的枚举成员是一个 数字常量。 这种情况下，当前枚举成员的值为它上一个枚举成员的值加`1`
```typescript
// All enum members in 'E1' and 'E2' are constant.

enum E1 { X, Y, Z }

enum E2 {
    A = 1, B, C
}
```
- 枚举成员使用 常量枚举表达式初始化。 常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。 当一个表达式满足下面条件之一时，它就是一个常量枚举表达式
    * 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
    * 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
    * 带括号的常量枚举表达式
    * 一元运算符`+`,`-`,`~`其中之一应用在了常量枚举表达式
    * 常量枚举表达式做为二元运算符`+`,`-`,`*`,`/`,`%`,`<<`,`>>`,`>>>`,`&`,`|`,`^`的操作对象。 若常数枚举表达式求值后为`NaN`或`Infinity`，则会在编译阶段报错

```typescript
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
```

### 联合枚举与枚举成员的类型
存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为
* 任何字符串字面量（例如：`"foo"`，`"bar"`，`"baz"`）
* 任何数字字面量（例如：`1`,`100`）
* 应用了一元 `-`符号的数字字面量（例如：`-1`,`-100`）

```typescript
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    kind: ShapeKind.Square,
    radius: 100,
}
```

```typescript
enum E {
    Foo,
    Bar,
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
        // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
    }
}
```

### 运行时的枚举

```typescript
enum E {
    X, Y, Z
}

function f(obj: { X: number }) {
    return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);
```

### 反向映射

除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字

```typescript
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

上面代码编译成`Javascript`

```javascript
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
```

### const枚举

```typescript
const enum Enum {
    A = 1,
    B = A * 2
}
```

### 外部枚举
外部枚举用来描述已经存在的枚举类型的形状

```typescript
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```

外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的


上面我们介绍了`TypeScript`的枚举，第八节我们将介绍类型推论

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)