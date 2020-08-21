---
title: "TypeScript入门教程(八) - 类型推断"
date: 2018-10-15 14:00
tags:
 - TypeScript
---

`typescript`类型是在那里如何被推断的？
<!--more-->

### 介绍

我们声明变量时不指定变量类型，`TypeScript`会进行类型推断来帮助我们提供类型

```typescript
let a = 1 
let b = 'string'
```
上面代码中变量`a`,`b`分别会被类型推断推断为`number`和`string`

但是有的情况类型推断无法自动推断出类型,下面小节会介绍

### 最佳通用类型

当需要从几个表达式中推断类型的时候，会使用这些表达式的类型来推断一个最适合的通用类型

```typescript
let a = [0, 1, null]
```
为了推断变量`a`的类型，我们必须考虑所有元素的类型。 这里有两种选择： `number`和`null`。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型

有时候候选类型共享相同的通用类型,但是却没有一个类型能做为所有候选类型的类型

```typescript
let style = [new Width(), new Height(), new Color()]
```

上面代码我们想`style`被推断为`Style[]`类型,但是数组没有对象时`Style`类型,因此不能推断出结果，修改一下代码如下:


```typescript
let style: Style[] = [new Width(), new Height(), new Color()]
```

**如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型`(Width | Height| color)[]`**


### 上下文类型

```typescript
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
}
```

`TypeScript`类型检查器使用`Window.onmousedown`函数的类型来推断右边函数表达式的类型,如果函数表达式不是在上下文类型的位置， mouseEvent参数的类型需要指定为any，这样也不会报错了


```typescript
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);  //ok
}
```


上面我们介绍了`TypeScript`的类型推断，第九节我们将介绍高级类型

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)