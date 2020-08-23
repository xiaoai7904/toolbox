# Java动态代理机制

在先说动态代理之前，先看看什么是代理

### 代理

什么代理？给某一个对象提供一个代理，并由代理对象来控制对真实对象的访问，例如：
- `对象A`提供了一个接口，但是这个接口只能通过`对象B`进行调用,如果其他对象需要调用必须通过`对象B`来调用`对象A`提供的接口,这样就可以称`对象B`为代理对象
- 有一个生产汽车的工厂,如果普通人要去购买汽车,必须通过4s店去购买，这里的4s店就是代理

简单理解了什么是代理之后，通过程序代码来模拟代理

我们还是以购买汽车为例
> Tips：==以下示例只是部分代码片段,不是完整代码==

##### 汽车工厂类

```java
// 汽车工厂接口
public interface CarFactoryService {
    public Integer getPrice();
    public void setPrice(int price);
    public void sell(String carName);
}

// 汽车工厂实现类
public class CarFactoryImpl implements CarFactoryService {
   // 汽车价格(单位: 万)
    private Integer carPrice = 100;

    @Override
    public Integer getPrice() {
        return carPrice;
    }

    @Override
    public void setPrice(int price) {
        carPrice += price;
    }

    @Override
    public void sell(String carName) {
        System.out.println("4s店购买了" + carName + "汽车,价格是" + carPrice);
    }}     
```
    
##### 4S店

```java
public class Shop4s implements CarFactoryService {
    private Integer carPrice = 20;

    @Override
    public void sell(String carName) {
        CarFactoryService carFactory;
        carFactory = new CarFactoryImpl();
        carFactory.sell(carName);
        setPrice(carFactory.getPrice());
        System.out.println("消费者购买了" + carName + "汽车,价格是" + carPrice);
    }

    @Override
    public Integer getPrice() {
        return carPrice;
    }

    @Override
    public void setPrice(int price) {
        carPrice += price;
    }}
``` 

##### 普通消费者

```java
public class NormalConsumer {
    public void sell(String carName) {
         CarFactoryService shop4s = new Shop4s();
         shop4s.sell(carName);      
    }
}
```

##### 测试方法

```java
public class TestApp {
    public static void main(String[] args) {
        NormalConsumer xiaoai = new NormalConsumer();
        xiaoai.sell("奥迪A7");
}
```

上面示例代码中实现简单代理方式,其中`4S`店就是代理对象, 在`Java`中我们称上面这种代理为**静态代理**

### 静态代理

使用静态代理我们可以在不修改源代码的情况，对功能进行增强,但是使用静态代理也有一定缺点,例如我们如果需要对工厂进行增加新功能,就需要在源代码和代理对象代码中新增逻辑

总结:
- 优点
    - 实现简单,易理解
    - 保护实际对象的业务逻辑对外暴露，从而提高安全性 

- 缺点
    - 代理对象和目标对象要实现统一的接口，新增功能会增加很多过多的代理类
    - 不易维护,如果新增功能,代理类和目标类都需要新增代码

结合上面的优缺点这时候就出现了新的解决方案**动态代理**

### 动态代理

动态代理相比静态代理主要特点是，静态代理是在编译完成时已经产生`Class`文件，然而动态代理是在运行时动态生成类字节码，并加载到`JVM`中

Tips: **动态代理不需要实现接口，但是要求目标对象必须实现接口**

在`Java`中有目前以下动态代理方式:

* JDK动态代理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->  &nbsp;&nbsp;&nbsp;根据接口创建代理对象
* CGLIB动态代理&nbsp;&nbsp;&nbsp; -->  &nbsp;&nbsp;&nbsp;使用继承实现

    
#### JDK动态代理

JDK动代理主要使用了Java中的反射机制，JDK动态代理使用了`java.lang.reflect.Proxy`和`java.lang.reflect.InvocationHandler`两个类来实现

我们还是以购买汽车为例，通过动态代理改造上面静态代理方式的代码
示例代码：


##### 汽车工厂类

```java
// 汽车工厂接口
public interface CarFactoryService {

    public Integer getPrice();
    public void setPrice(int price);
    public void sell(String carName);
    
}

// 汽车工厂实现类
public class CarFactoryImpl implements CarFactoryService {
    // 汽车价格(单位: 万)
    private Integer carPrice = 100;

    @Override
    public Integer getPrice() {
        return carPrice;
    }

    @Override
    public void setPrice(int price) {
        carPrice += price;
    }

    @Override
    public void sell(String carName) {
        System.out.println("4s店购买了" + carName + "汽车,价格是" + carPrice);
    }
}     
```

##### 代理处理类


```java
public class MyHandler implements InvocationHandler {
   private Object target = null;

    public MyHandler1(Object target) {
        // 传入目标对象方法
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 1.可以对调用目标方法之前进行处理
        System.out.println("消费者购买" + args[0] + "汽车,价格是汽车店基础上涨20万");
        // 2. 调用目标方法
        // target: 目标对象方法， arg: 调用目标方法参数 return 当前方法执行结果
        Object res = method.invoke(target, args);

        // 3.可以对调用完目标方法进行增强处理
        System.out.println("消费者购买了" + args[0] + "汽车,价格是" + 120);

        return res;
    }}
``` 

##### 测试方法


```java
public class TestApp {
    public static void main(String[] args) {
    CarFactoryService proxyTarget = new CarFactoryImpl();
    CarFactoryService proxy = (CarFactoryService)Proxy.newProxyInstance(proxyTarget.getClass().getClassLoader(), proxyTarget.getClass().getInterfaces(), new MyHandler(proxyTarget));
    
    proxy.sell("奥迪A7")
}

```

#### CGLIB动态代理

是一个基于ASM的字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。CGLIB通过继承方式实现代理

基于cglib动态代理去实现购车代码:

##### 汽车工厂类


```java
// 汽车工厂实现类
public class CarFactoryImpl {
    // 汽车价格(单位: 万)
    private Integer carPrice = 100;

    public Integer getPrice() {
        return carPrice;
    }

    public void setPrice(int price) {
        carPrice += price;
    }

    public void sell(String carName) {
        System.out.println("4s店购买了" + carName + "汽车,价格是" + carPrice);
    }
} 
```

#### 代理处理类


```java
public class MyMethodInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
    
        System.out.println("消费者购买" + args[0] + "汽车,价格是汽车店基础上涨20万");
        
        Object object = methodProxy.invokeSuper(o, objects);
        
        System.out.println("消费者购买了" + args[0] + "汽车,价格是" + 120);
        
        return object;
    }
}

```

##### 测试方法


```java
public class TestApp {
    public static void main(String[] args) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(CglibService.class);
        // 设置enhancer的回调对象
        enhancer.setCallback(new MyMethodInterceptor());
        // 创建代理对象
        CglibService proxy= (CglibService)enhancer.create();
        // 通过代理对象调用目标方法
        proxy.sell("奥迪A7")
    }
}
```
