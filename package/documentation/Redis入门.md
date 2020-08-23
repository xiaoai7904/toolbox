# Redis入门

### 简介

REmote DIctionary Server(Redis) 是一个由Salvatore Sanfilippo写的key-value存储系统。

Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

它通常被称为数据结构服务器，因为值（value）可以是 字符串(String), 哈希(Hash), 列表(list), 集合(sets) 和 有序集合(sorted sets)等类型

==Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf==
### Redis操作库命令

|  命令| 描述 |
| --- | --- |
| select 下标[0~15]|  切换对于库 |
| dbsize|  当前库以存储大小 |
| flushdb|  删除当前库中所有数据 |
| flushall| 删除全部库数据 |

### Redis keys 常用命令


|  命令| 描述 |
| --- | --- |
| del key |  key 存在时删除key |
| dump key |  序列化给定key，并返回被序列化的值 |
| exists key |  检查key是否存在 |
| expire key 5 |  设置key 5秒过期 |
| keys pattern |  查找所有符合pattern条件的key |
| ttl key |  检查key过期时间剩余时间 |


### Redis String 常用命令

|  命令| 描述 |
| --- | --- |
| set key value|  设置key的值为value |
| setrang key 偏移量 value| 用value值覆写给定key所储存的字符串值，从偏移量开始|
| strlen key| 返回key字符串长度|
| setex key 5 value| 将值value关联到key，并将key的过期时间设为5秒|
| setex key value| key的值不存在就设置value值|
| get key |  获取key的值 |
| getrange key 0 1|  获取key的第一位值 |
| getset key value|  将给定key的值设为value，并返回key的旧值 |
| mset key1 value1 key2 value2 | 同时设置一个或多个key-value对|
| incr key |将key中的数字 ++|
| incrby key 10 |将key中的数字 +=10 |
| decr key |将key中的数字 -- |
| decrby key 10 |将key中的数字 -=10 |
| append key newValue |给存在的key并且值是字符串就在最后最加newValue |

### Redis Hash 常用命令

|  命令| 描述 |
| --- | --- |
| hset key field value|  设置哈希表key字段field的值为value |
| hsetnx key field value|  哈希表key字段不存在时，设置field的值为value |
| hmsetnx key field1 value1 field2 value2|  设置哈希表key字段field1的值为value1,field2 value2的值 |
| hget key field|  获取哈希表中key field的值 |
| hgetall key|  获取哈希表中key所有字段和值 |
| hkeys key|  获取所有哈希表中key所有字段 |
| hvals key|  获取所有哈希表中key所有值 |
| hexists key field|  查看哈希表中key field字段是否存在 |
| hdel key field1 field2|  删除一个或者多个哈希表字段 |


### Redis List 常用命令

|  命令| 描述 |
| --- | --- |
| lpush key value1 value2|  添加value1 value2到列表头部 |
| lpushx key value|  添加value添加到key的列表头部 |
| rpush key value1 value2|  添加value1 value2到key的列表中 |
| rpushx key value|  为存在的key添加value值 |
| lset key 0 value|  通过索引设置值(设置key的第一个字段的值为value) |
| lindex key 0|  获取key中第一个元素 |
| lrange key 0 1|  获取key中前两个元素 |
| lpop key|  移除并获取key列表的第一元素 |
| rpop key|  移除并获取key列表的最后一个元素 |
| lrem key |  移除并获取key列表的第一元素 |
| llen key |  获取key列表长度 |

### Redis Set 常用命令

|  命令| 描述 |
| --- | --- |
| sadd key value1 value2|  向集合内增加value1 value2 |
| scard key | 获取集合的成员数 |
| sdiff key key2| 返回第一个集合和其它集合的差异 |
| sdiffstore destination key1 key2| 返回key1 key2集合的差异并且存储在destination集合里面 |
| sinter key1 key2| 返回key1 key2集合交集 |
| sunion key1 key2 | 返回key1 key2集合的并集 |
| sinterstore destination key1 key2| 返回key1 key2集合的交集并且存储在destination集合里面 |
| sunionstore destination key1 key2| 返回key1 key2集合的并集并且存储在destination集合里面 |
| sismember key value| 判断value是否在集合key的成员中 |
| smember key | 返回key集合中所有成员 |
| smove key1 key2 value | 将value元素从key1集合中移动到key2集合中 |
| spop key | 移除key并返回集合中的一个随机元素 |
| srandmember key [count] | 移除并返回key集合中一个或者多个成员 |
| srem key [count] | 移除key集合中一个或者多个成员 |

### Redis Sorted Set 常用命令

|  命令| 描述 |
| --- | --- |
| zadd key 1 value|  向有序集合key中添加value 排序分数是1 |
| zcard key|  获取有序集合的成员数 |
| zcount key min max|  计算有序集合中指定分区的成员数 |
| zincrby key 10 value| 为有序集合key中value成员排序分数增加10|
| zlexcount key min max| 在有序集合key中计算区间内的成员数量|
| zrangee key start stop withscores| 通过索引区间返回有序集合指定区间内的成员|
| zrangeebylex key start stop| 通过字典区间返回有序集合的成员|
| zrank key value| 返回有序集合中指定成员的索引|
| zrem key value| 移除有序集合中的一个或多个成员|
| zremrangebylex key min max| 移除有序集合中给定的字典区间的所有成员|
| zremrangebyrank key start stop| 移除有序集合中给定的排名区间的所有成员|
| zremrangebyscore key min max| 移除有序集合中给定的分数区间的所有成员|
| zrevrange key start stop withscores | 返回有序集中指定区间内的成员，通过索引，分数从高到低|
| zrevrangebyscore key max min withscores | 返回有序集中指定分数区间内的成员，分数从高到低排序|
| zrevrank key value | 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序|
| zscore key value | 返回有序集中，成员的分数值|








    
