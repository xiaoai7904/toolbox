---
title: 'JSON.stringify和JSON.parse'
date: 2019-12-09 09:55:19
tags: [JavaScript]
published: true
hideInList: false
feature: https://www.jiangweishan.com/zb_users/upload/2019/05/201905071557215190103671.jpg
---
在日常开发中，我们会使用到`JSON.stringify`和`JSON.parse`对json数据进行转换,也可以通过这两个方法进行数据深度拷贝
<!--more-->

## JSON.stringify
JSON.stringify() 方法将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
#### 语法
`JSON.stringify(value[, replacer [, space]])`
#### 参数介绍
##### value
 将要序列化成 一个 JSON 字符串的值
##### replacer(可选)
如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化
##### space(可选)
指定缩进用的空白字符串，用于美化输出，如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格

#### 转换注意事项  
* 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
* 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
* 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
* `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成`null`（出现在数组中时）。函数、`undefined` 被单独转换时，会返回 `undefined`，如`JSON.stringify(function(){}) or JSON.stringify(undefined)`
* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误
* 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
* `Date`日期调用了 `toJSON()` 将其转换为了 `string` 字符串（同`Date.toISOString()`），因此会被当做字符串处理。 
* `NaN` 和 `Infinity` 格式的数值及 `ull` 都会被当做 `null`
* 其他类型的对象，包括 `Map/Set/WeakMap/WeakSet`，仅会序列化可枚举的属性

#### toJSON 方法
如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是该对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，示例如下:

```javascript
let obj = {
  a: 'a',
  toJSON: function () {
    return 'a';
  }
};
JSON.stringify(obj);      // '"a"'
JSON.stringify({x: obj}); // '{"x":"a"}'
```

#### 示例代码:  

```javascript
let obj = {
    a: '1',
    b: 1,
    c: function() { return 1 }
}
// 通过JSON.stringify方法进行字符串序列化

let str = JSON.stringify(obj)
// 函数会被忽略,详情见上面 转换注意事项
console.log(str) // "{"a":"1","b":1}"

// 可以通过JSON.stringify第一个参数进行特殊处理
let str = JSON.stringify(obj, function(key, value) {
    if(typeof value === 'function') {
        return value.toString()
    }
    return value
})
console.log(str) // "{"a":"1","b":1,"c":"function() { return 1 }"}"
```

## JSON.parse

#### 语法
`JSON.parse(text[, reviver])`
#### 参数介绍
##### text
要被解析成 JavaScript 值的字符串
##### reviver(可选)
转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前
#### 注意事项
`JSON.parse()`不允许用逗号作为结尾
#### 示例代码

```javascript
let str = "{"a":"1","b":1,"c":"function() { return 1 }"}"
let obj = JSON.parse(str)
console.log(obj); // {a: '1', b: 1, c: 'function() {return 1}'}
// 如果想函数转换成可执行函数
let obj = JSON.parse(str, function(key, value) {
    // 也可以判断value中是否有function字段
    if(key === 'c') {
        return eval("(function(){return " + value + " })()")
    }
    return value
})
console.log(obj); // {a: '1', b: 1, c: function() {return 1}}

```

#### 深度拷贝对象

可以通过`JSON.stringify`和`JSON.parse`进行数据拷贝, 数据中不应该有`function`, `undefined`因为它们会被忽略

```javascript
let obj = {a: 1, b: { b1: 11 }}
let copyObj = JSON.parse(JSON.stringify(obj))

console.log(obj === copyObj); // false
```