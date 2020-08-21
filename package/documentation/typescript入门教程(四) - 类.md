---
title: "TypeScript入门教程(四) - 类"
date: 2018-10-07 19:00
tags:
 - TypeScript
---

在传统`JavaScript`中类是基于原型模拟出来的类，在ES6中新增`class`关键字来书写基于类的面向对象(底层还是基于原型的方式)
<!--more-->

### 类

> 维基百科 -> 在面向对象编程，类（英语：class）是一种面向对象计算机编程语言的构造，是创建对象的蓝图，描述了所创建的对象共同的属性和方法

* ES5中的模拟类:

```typescript
function Fn1(name, age) {
    this.name = name
    this.age = age
}
Fn1.prototype = {
    constructor: Fn1,
    setAge: function(age) {
        this.age = age
        console.log(age)
    }
}
```

* ES6中的类

```typescript
class Fn1 {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    setAge(age) {
        this.age = age
        console.log(age)
    }   
}
```

* TypeScript中的类

```typescript
class Fn1 {
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    setAge(age: number): void{
        this.age = age
        console.log(age)
    }   
}
```

### 继承

在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类

```typescript
class Fn1 {
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    setAge(age: number): void {
        this.age = age
        console.log(this.age)
    }
}
class Fn2 extends Fn1{
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

let fn1 = new Fn2('mickey', 26)
fn1.setAge(27) // 27
```

继承我们可以通过关键字`extends`来继承


ES5中的继承方式推荐大家看一下阮一峰的博客[构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)


### public修饰符
C#要求必须明确地使用 public指定成员是可见的。 在TypeScript里，成员都默认为 public

```typescript
class Fn1 {
    public name: string
    public constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    public setAge(age: number): void {
        this.age = age
    }
}
```

### private修饰符

当成员被标记成 private时，它就不能在声明它的类的外部访问

```typescript
class Fn1 {
    private name: string
    public constructor(name: string, age: number) {
        this.name = name
    }
}
new Fn1().name // error 'name'是私有的
```

### protected

protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问

```typescript
class Fn1 {
    protected name: string
    constructor(name: string, age: number) {
        this.name = name
    }
}
class Fn2 extends Fn1{
    constructor(name: string) {
       super(name)
    }
    public getName() {
        console.log(this.name)
    }
}
new Fn2('mickey').name // error 
new Fn2('mickey').getName() // mickey
```


**我们不能在Fn1类外使用name，但是我们可以在派生出来的实例方法上使用name**

### readonly修饰符


你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化

```typescript
class Fn1 {
    readonly name: string
    constructor(name: string) {
        this.name = name
    }
}
let f = new Fn2('mickey')
f.name = 'xxx' // error name是只读
```

### 参数属性

```typescript
class Fn1 {
    constructor(private name: string) { }
    getName(): string {
        console.log(this.name)
        return this.name
    }
}
```
上面代码我们通过在`constructor`参数`private name: string`来进行创建和初始化,我们就声明和赋值合并在一起了，public和 protected的使用也是一样

### 存取器

TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问

```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 其次，只带有`get`不带有`set`的存取器自动被推断为 readonly。 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值

### static修饰符

我们可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上

```typescript
class Styles {
    static width = 200
    constructor(public style: object) {}
    getWidth() {
        console.log(Styles.width) // 200
    }
}
new Styles({height: 200})
```

### 抽象类 

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法

```typescript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```

上面我们介绍了`TypeScript`的类，第五节我们将介绍函数

> 文章参考[TypeScript中文网](https://www.tslang.cn/docs/handbook/variable-declarations.html)
[阮一峰Es6](http://es6.ruanyifeng.com/#docs/class)