---
title: 'TypeScript入门教程(十三) - 命名空间'
date: 2019-11-24 08:17:56
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/typescript-ru-men-jiao-cheng-shi-san-ming-ming-kong-jian.jpeg
isTop: false
---
描述了如何在TypeScript里使用命名空间（之前叫做“内部模块”）来组织你的代码。任何使用`module`关键字来声明一个内部模块的地方都应该使用`namespace`关键字来替换
<!--more-->

### 命名空间

使用命名空间不用担心与其它对象产生命名冲突

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```

### 别名

另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字。 不要与用来加载模块的 import x = require('name')语法弄混了，这里的语法是为指定的符号创建一个别名。 你可以用这种方法为任意标识符创建别名，也包括导入的模块中的对象

```typescript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
```

### 外部命名空间

流行的程序库D3在全局对象d3里定义它的功能。 因为这个库通过一个 <script>标签加载（不是通过模块加载器），它的声明文件使用内部模块来定义它的类型。 为了让TypeScript编译器识别它的类型，我们使用外部命名空间声明。 比如，我们可以像下面这样写

```typescript
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;
```

上面我们介绍了`TypeScript`的命名空间，第十四节我们将介绍装饰器

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)