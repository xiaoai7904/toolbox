---
title: 'CSS BEM书写规'
date: 2019-11-24 10:27:51
tags: [Css]
published: true
hideInList: false
feature: https://snipcart.com/media/203926/bem-css-methodology.png?width=800&format=webp&quality=80&upscale=false
---
`BEM`的意思就是块（`block`）、元素（`element`）、修饰符（`modifier`）,是由[Yandex](https://yandex.ru/)团队提出的一种前端命名方法论。这种巧妙的命名方法让你的CSS类对其他开发者来说更加透明而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目
<!--more-->

### 介绍

如果你是一个`Vue`爱好者，并且你是一个喜欢接受新鲜事物和追求技术高度,那么你一定使用或者知道[Element-Ui](http://element.eleme.io/#/zh-CN)(或者其他UI库),在`element-ui`中你去观察它的源码你会发现它的组件`css`的定义方式

```css
@include b(tree-node) {
  white-space: nowrap;
  outline: none;
  &:focus { /* focus */
    > .el-tree-node__content {
      background-color: $--tree-node-hover-color;
    }
  }

  @include when(drop-inner) {
    > .el-tree-node__content .el-tree-node__label {
      background-color: $--color-primary;
      color: #fff;
    }
  }
}
```
上面代码是`element-ui`中组件`tree`组件的部分样式

不难从上面代码中可以看到`element-ui`是怎么来命名`class`类名和`sass`变量都使用了`-`,`__`,'--'这个连字符,下面我们介绍为什么要这样写,这样写的好处是什么

### BEM

`BEM`代表“`块（block`）,`元素（element`）,`修饰符（modifier`”,我们常用这三个实体开发组件。

在选择器中，由以下三种符合来表示扩展的关系:

```text
-  中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号
__  双下划线：双下划线用来连接块和块的子元素
_   单下划线：单下划线用来描述一个块或者块的子元素的一种状态

type-block__element_modifier
```

#### 块（block）

一个块是设计或布局的一部分，它有具体且唯一地意义 ，要么是语义上的要么是视觉上的

例如我们有一个菜单列表

```html
<ul class="menu">
    <li>1</li>
    <li>2</li>
</ul>
```
类名`menu`就是代表菜单这个`块`或者`区域`

#### 元素（element）

块中的子元素是块的子元素，并且子元素的子元素在 bem 里也被认为是块的直接子元素。一个块中元素的类名必须用父级块的名称作为前缀

```html
<ul class="menu">
    <li class="menu__item">1</li>
    <li class="menu__item">2</li>
</ul>
```
类名`menu__item`中的`__item`就是代表元素项

#### 修饰符（modifier）

一个“修饰符”可以理解为一个块的特定状态，标识着它持有一个特定的属性

```html
<ul class="menu">
    <li class="menu__item menu__item-actived">1</li>
    <li class="menu__item">2</li>
</ul>
```
类名`menu__item-actived`中的`-actived`代表修饰符


### 可供选择的命名方案

`BEM`只是一种命名约定方案不一定要按照固定写法来执行,主要是在项目中要保持一致的命名约定即可

下面有几种方案提供参考

#### Two Dashes style（双连字符风格）

`block-name__elem-name--mod-name`

* 名字全部使用小写
* BEM 实体的名称中的每一个单词使用一个连字符分隔
* 使用双下划线（__）将元素的名称和模块的名称分离开
* 使用双连字符（--）分隔 Boolean 类型的修饰符
* 不使用 key-value 类型的修饰符

#### CamelCase style（驼峰命名风格）

`MyBlock__SomeElem_modName_modVla`

这种风格的命名方案的不同点在于，在`BEM`实体中分隔单词时使用驼峰命名法代替了一个连字符（`-`）

#### "Sans underscore" style（无下划线风格）

`blockName-elemName--modName--modVal`

* 名称使用驼峰命名法书写
* 元素名称与模块名称使用一个连字符（-）分隔
* 修饰符使用双连字符（--）与模块或元素分隔
* 修饰符的名称和值使用双连字符（--）分隔



`BEM`方法论为`BEM`实体的命名提供了基本的原则。选择哪一种命名方式取决于你项目的需求和你的个人喜好。使用方法论中提到的命名约定的一大优势在于具有现成的面向“经典命名”的开发工具


> 文章参考  
[【译】BEM CSS命名规范三 Naming convention](https://www.jianshu.com/p/410a71771d78)
[W3cschool](https://www.w3cschool.cn/weflow/weflow-bem.html)
[Yandex BEM/OOCSS](https://docs.emmet.io/filters/bem/)