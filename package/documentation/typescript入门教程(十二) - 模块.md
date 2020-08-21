---
title: "TypeScript入门教程(十二) - 模块"
date: 2018-10-20 14:20
tags:
 - TypeScript
---

模块是在自身的作用域执行,也就是说在一个模块里面声明的变量,类,函数都是在模块中可见,模块外面是不可见的，除非使用`export`导出,其他模块使用`import`引入就可以使用其他模块导出的变量,类,函数等
<!--more-->

### 导出

任何声明(变量,函数,类,类别别名或接口)都能够通过添加`export`关键字来导出

```typescript
export const a = '112'
export interface Styles {
    width: string
    height: string
}
export function fn1() {}
export class Fn {}
export {Fn as fn} // 导出的部分重命名
export * from '文件路径'
export default class Styles {} // 默认导出
```

### 导入

模块的导入操作与导出一样简单。 可以使用以下 import形式之一来导入其它模块中的导出内容

```typescript
import { Fn } from '引入的文件路径'
import {Fn as fn } from '引入的文件路径' // 导入内容重命名
import * as styles from '引入的文件路径' // 将整个模块导入到一个变量
import '引入的文件路径' // 引入文件
import style from '引入的文件路径' // 引入默认导出文件
```

### export = 和 import = require()

`CommonJS`和`AMD`的环境里都有一个`exports`变量，这个变量包含了一个模块的所有导出内容。

`CommonJS`和`AMD`的`exports`都可以被赋值为一个对象, 这种情况下其作用就类似于`es6`语法里的默认导出，即`export default`语法了。虽然作用相似，但是`export default`语法并不能兼容`CommonJS`和`AMD`的exports。

为了支持`CommonJS`和`AMD`的`exports`, `TypeScript`提供了`export =`语法。

`export =`语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。

若使用`export =`导出一个模块，则必须使用`TypeScript`的特定语法`import module = require("module")`来导入此模块

```typescript
class Styles {
    constructor(public styles: object)
    getStyle(key: string): number | string {
        return this.styles[key]
    }
}

export = Styles
// 使用方式如下

import Styles = require('文件路径')

let s = new Styles({ width : 200 })
s.getStyle('width') // 200
```

上面我们介绍了`TypeScript`的模块，第十三节我们将介绍命名空间

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)