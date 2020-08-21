---
title: "TypeScript入门教程(十一) - 迭代器和生成器"
date: 2018-10-18 19:20
tags:
 - TypeScript
---

迭代器和生成器
<!--more-->
### for..of 语句

```typescript
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
```

### for..in 语句

```typescript
let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}
```

### 区别

for..of和for..in均可迭代一个列表；但是用于迭代的值却不同，for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值，for..in可以操作任何对象；它提供了查看对象属性的一种方法。 但是 for..of关注于迭代对象的值


这节的内容比较简单,所以只是写了几段代码来进行解释

上面我们介绍了`TypeScript`的迭代器和生成器，第十二节我们将介绍模块

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)