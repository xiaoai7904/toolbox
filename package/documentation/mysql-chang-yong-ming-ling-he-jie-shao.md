---
title: 'MySql常用命令和介绍'
date: 2020-08-16 15:41:28
tags: []
published: true
hideInList: false
feature: /post-images/mysql-chang-yong-ming-ling-he-jie-shao.png
isTop: false
---

* ##### 创建数据表
```SQL
# create tabele 表名(字段1 数据类型, 字段2 数据类型, ...);
create tabele user(id VARCHAR(100), name VARCHAR(100), age INT);

# 创建临时表 临时表只在当前连接可见，当关闭连接时会自动删除
create TEMPORARY table userTemp(id VARCHAR(100), name VARCHAR(100), age INT) 
```
|  id   | name  | age  |
|  ---- | ----  |----  |
| null  | null  | null |


* ##### 删除数据表

```SQL
# drop tabele 表名;
drop tabele user;
```

* ##### 插入数据

```SQL
# insert into 表名(字段1， 字段2) values(字段1值，字段2值，...)
insert into user(id, name, age) values('1', 'xiaoai', 27)
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 1  | xiaoai  | 27 |

* ##### 查询数据

```SQL
# select * from 表名
select * from user
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 1  | xiaoai  | 27 |

* ##### where语句

```SQL
# select * from 表名 where 判断条件
select * from user where age=27
select * from user where age>=27
select * from user where age<=27
select * from user where age is null
select * from user where age is not null
select * from user where age in(27,29)
select * from user where age not in(27,29)
select * from user where age REGEXP '^\d+'
```

* ##### update语句

```SQL
# update 表名 set 字段1=字段值
update user set age=28
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 1  | xiaoai  | 28 |

* ##### delete语句

```SQL
# delete from 表名 where 条件
delete from user where id='1'
```

|  id   | name  | age  |
|  ---- | ----  |----  |


* ##### like语句（模糊查询）

```SQL
# select * from 表名 like 字段='值%'
select * from user like name='xiao%'
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 28 |

* ##### union(连接两个表查询结果)

```SQL
# tips: user1表暂时使用user表的数据
# select * from 表名1 union (ALL | DISTINCT) select * from 表名2
# ALL: 全部数据可以出现重复数据
# DISTINCT: 全部数据并且删除重复数据
select * from user union ALL select * from user1
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 28 |
| 1     | xiaoai| 28 |

* ##### order by语句(排序)

原始表数据:
|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 22 |
| 2     | xiaoai1| 23 |
| 3     | xiaoai2| 24 |
| 4     | xiaoai3| 25 |
| 5     | xiaoai4| 26 |

```SQL
# ASC 升序 默认
# DESC 降序
# select * from 表名1 order by 字段名 排序值[ASC|DESC]
select * from user order by age DESC
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 5     | xiaoai4| 26 |
| 4     | xiaoai3| 25 |
| 3     | xiaoai2| 24 |
| 2     | xiaoai1| 23 |
| 1     | xiaoai| 22 |


* ##### group by(分组查询)

原始表数据:
|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 22 |
| 2     | xiaoai1| 22 |
| 3     | xiaoai2| 25 |
| 4     | xiaoai3| 25 |
| 5     | xiaoai4| 26 |

```SQL
# select 分组字段, count(*) from 表名 group by 分组字段
select age, count(*) from user group by age
```

|  age   | count(*)
|  ---- | ----  |
| 22     | 2|
| 25     | 2|
| 26     | 1| 


* #### 外连接(inner join, left join, right join)

原始表数据 user:
|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 22 |
| 2     | xiaoai1| 22 |

原始表数据 subject:
|  id   | subject  | name  |
|  ---- | ----  |----  |
| 1     | java| xiaoai |
| 2     | javascript| xiaoai |
| 3 | nodeJs | xiaoai2

```SQL
# inner join 连接两个表格数据
# select 字段名,字段名 from 表名1 as 表名1别名 inner join select 字段名, 字段名 from 表名2 as 表名2别名 on 表名1别名.字段名=表名2别名.字段名

select u.name, u.age  from user as u inner join select s.subject from subject as s on a.name=s.name

```
|  u.name  | u.age  | s.subject  |
|  ----  | ----  |----  |
| xiaoai | 22| java |
| xiaoai | 22| javascript |

```SQL
# left join 连接两个表格,左边数据表的全部数据，即便右边表无对应数据
# select 字段名,字段名 from 表名1 as 表名1别名 left join select 字段名, 字段名 from 表名2 as 表名2别名 on 表名1别名.字段名=表名2别名.字段名

select u.name, u.age  from user as u left join select s.subject from subject as s on a.name=s.name
```
|  u.name  | u.age  | s.subject  |
|  ----  | ----  |----  |
| xiaoai | 22| java |
| xiaoai | 22| javascript |
| xiaoai1 | 22| null |

```SQL
# right join 连接两个表格,右边数据表的全部数据，即便左边表无对应数据
# select 字段名,字段名 from 表名1 as 表名1别名 right join select 字段名, 字段名 from 表名2 as 表名2别名 on 表名1别名.字段名=表名2别名.字段名

select u.name, u.age  from user as u right join select s.subject from subject as s on a.name=s.name
```
|  u.name  | u.age  | s.subject  |
|  ----  | ----  |----  |
| xiaoai | 22| java |
| xiaoai | 22| javascript |
| null | null| nodeJs |


* #### alter(修改数据表名或者修改数据表字段)

原始表数据 user:
|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 22 |

```SQL
alter table user add adss varchar(100) # 添加字段 
alter table user modify adss char # 修改表字段
alter table user alter adss set default 'xxxx省xxx市'
alter table user drop adss # 删除表字段
```

* #### limit语句

原始表数据 user:
|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 22 |
| 2     | xiaoai1| 23 |
| 3     | xiaoai2| 24 |

```SQL
select * from user limit 0,1
```

|  id   | name  | age  |
|  ---- | ----  |----  |
| 1     | xiaoai| 22 |

* #### 索引

```SQL
create index id_index on user(id) # 创建索引
alter table user add index id_index(id) # 修改表结构添加索引
show index from user # 显示索引
drop index id_index on user # 删除索引
```

* #### 导出sql

```SQL
select * from user into outfile './user.txt' # 导出user表数据到user.txt
```