---
title: 'FromData Blob ArrayBuffe'
date: 2019-11-24 09:28:07
tags: [JavaScript]
published: true
hideInList: false
feature: /post-images/fromdata-blob-arraybuffe.png
isTop: false
---
利用`FormData`对象,我们可以通过`JavaScript`用一些键值对来模拟一系列表单控件,我们还可以使用`XMLHttpRequest`的`send()`方法来异步的提交这个"表单",`Blob`对象表示一个不可变、原始数据的类文件对象,`ArrayBuffer`对象用来表示通用的、固定长度的原始二进制数据缓冲区
<!--more-->

### FormData

> XMLHttpRequest Level 2添加了一个新的接口FormData.利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件

上文是[MDN](https://developer.mozilla.org)官方解释,在实际开发中我们可以利用它来进行做上传文件操作,下面代码简单介绍了`FormData`如何使用

```javascript
let xhr= new XMLHttpRequest();
let fromdata = new FormData()
formdata.append("token", 'ddddd-ddd-dd');
xhr.open("POST", "xxx.php");
xhr.send();
```

#### api
**append() 给当前FormData对象添加一个键/值对**
`void append(DOMString name, Blob value, optional DOMString filename)`
* name: 字段名称
* value: 字段值.可以是,或者一个字符串,如果全都不是,则该值会被自动转换成字符串
* filename[可选] 指定文件的文件名,当value参数被指定为一个Blob对象或者一个File对象时,该文件名会被发送到服务器上,对于Blob对象来说,这个值默认为"blob")

### Blob

`Blob`即二进制大数据对象,提供相应的接口,其他操作二进制的对象都是建立在`Blob`基础之上,并继承了该对象的属性和方法

* 使用 Blob 创建一个指向类型化数组的URL
```javascript
var typedArray = GetTheTypedArraySomehow();
var blob = new Blob([typedArray], {type: "application/octet-binary"});// 传入一个合适的MIME类型
var url = URL.createObjectURL(blob);
// 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用一个普通URL那样使用它，比如用在img.src上
```
#### api
* `Blob.size`[只读]  `Blob`对象中所包含数据的大小（字节）
* `Blob.type`[只读]  一个字符串，表明该Blob对象所包含数据的MIME类型。如果类型未知，则该值为空字符串
* `Blob.slice(start,end)` 返回一个新的 Blob对象，包含了源 Blob对象中指定范围内的数据


### ArrayBuffer

`ArrayBuffer`对象用来表示通用的、固定长度的原始二进制数据缓冲区。`ArrayBuffer`不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容

```javascript
// 创建一个8字节的ArrayBuffer  
var b = new ArrayBuffer(8);  
  
// 创建一个指向b的视图v1，采用Int32类型，开始于默认的字节索引0，直到缓冲区的末尾  
var v1 = new Int32Array(b);  
  
// 创建一个指向b的视图v2，采用Uint8类型，开始于字节索引2，直到缓冲区的末尾  
var v2 = new Uint8Array(b, 2);  
  
// 创建一个指向b的视图v3，采用Int16类型，开始于字节索引2，长度为2  
var v3 = new Int16Array(b, 2, 2);  
```

#### api

* `new ArrayBuffer(length)`
`length`要创建的 ArrayBuffer 的大小，单位为字节,返回一个指定大小的 ArrayBuffer 对象，其内容被初始化为 0


* `get ArrayBuffer[@@species]`
返回 ArrayBuffer 的构造函数


* `ArrayBuffer.isView(arg)`
如果参数是 ArrayBuffer 的视图实例则返回 true，例如 类型数组对象 或 DataView 对象；否则返回 false

* `ArrayBuffer.transfer(oldBuffer [, newByteLength])`
返回一个新的 ArrayBuffer 对象，其内容取自 oldBuffer 中的数据，并且根据 newByteLength 的大小对数据进行截取或补 0


* `ArrayBuffer.slice()`
返回一个新的 ArrayBuffer ，它的内容是这个 ArrayBuffer 的字节副本，从begin（包括），到end（不包括）。如果begin或end是负数，则指的是从数组末尾开始的索引，而不是从头开始

> 文章参考  
[ArrayBuffer-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
[Blob-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
[FormData-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)