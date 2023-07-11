### 配置MySQL

设置密码永不过期

```mysql
alert user 'root'@'localhost' identified by 'root' password exipre never;
```

设置加密规则为mysql_native_password

```mysql
alert user 'root'@'localhost' identified with mysql_native_password by 'root';
```

### 数据库表列类型

#### 整数类型

| 类型名称      | 说明           | 存储需求 | 表数范围（有符号）                          |                           |
| ------------- | -------------- | -------- | ------------------------------------------- | ------------------------- |
| TINYINT       | 很小的整数     | 1个字节  | (-128, 127)                                 | (0, 255)                  |
| SMALLINT      | 小的整数       | 2个宇节  | (-32768, 32767)                             | (0, 65535)                |
| MEDIUMINT     | 中等大小的整数 | 3个字节  | (-8388608, 8388607)                         | (0, 16777215)             |
| INT (INTEGHR) | 普通大小的整数 | 4个字节  | (-2147483648, 2147483647)                   | (0, 4294967295)           |
| BIGINT        | 大整数         | 8个字节  | (-9223372036854775808, 9223372036854775807) | (0, 18446744073709551615) |

MySQL支持选择在该类型关键字后面的括号内指定整数值的显示宽度(例如，INT(4))。显示宽度并不限制可以在列内保存的值的范围，也不限制超过列的指定宽度的值的显示。即如果插入了大于显示宽度的值，只要该值不超过该类型整数的取值范围，数值依然可以插入，而且能够显示出来。

#### 浮点数类型

| 类型名称            | 说明               | 存储需求   |
| ------------------- | ------------------ | ---------- |
| FLOAT               | 单精度浮点数       | 4 个字节   |
| DOUBLE              | 双精度浮点数       | 8 个字节   |
| DECIMAL (M, D)，DEC | 压缩的“严格”定点数 | M+2 个字节 |

浮点类型有两种，分别是单精度浮点数（**FLOAT**）和双精度浮点数（**DOUBLE**）；定点类型只有一种，就是 **DECIMAL**。

浮点类型和定点类型都可以用`(M, D)`来表示，其中`M`称为精度，表示总共的位数；`D`称为标度，表示小数的位数。

浮点数类型的取值范围为 M（1～255）和 D（1～30，且不能大于 M-2），分别表示显示宽度和小数位数。

FLOAT 和 DOUBLE 在不指定精度时，默认会按照实际的精度（由计算机硬件和操作系统决定），DECIMAL 如果不指定精度，默认为（10，0）。

与整数类型不一样的是，浮点数类型的宽度不会自动扩充。不论是定点还是浮点类型，如果用户指定的精度超出精度范围，则会四舍五入进行处理。

在 MySQL 中，定点数以字符串形式存储，在对精度要求比较高的时候（如货币、科学数据），使用 DECIMAL 的类型比较好。另外两个浮点数进行减法和比较运算时也容易出问题，所以在使用浮点数时需要注意，并尽量避免做浮点数比较。

#### 字符串类型

| 类型名称       | 说明                                         | 存储需求                                                   |
| -------------- | -------------------------------------------- | ---------------------------------------------------------- |
| CHAR(M)        | 固定长度非二进制字符串                       | M 字节，1<=M<=255                                          |
| VARCHAR(M)     | 变长非二进制字符串                           | L+1字节，在此，L< = M和 1<=M<=255                          |
| TINYTEXT       | 非常小的非二进制字符串                       | L+1字节，在此，L<2^8                                       |
| TEXT           | 小的非二进制字符串                           | L+2字节，在此，L<2^16                                      |
| MEDIUMTEXT     | 中等大小的非二进制字符串                     | L+3字节，在此，L<2^24                                      |
| LONGTEXT       | 大的非二进制字符串                           | L+4字节，在此，L<2^32                                      |
| ENUM           | 枚举类型，只能有一个枚举字符串值             | 1或2个字节，取决于枚举值的数目 (最大值为65535)             |
| SET            | 一个设置，字符串对象可以有零个或 多个SET成员 | 1、2、3、4或8个字节，取决于集合 成员的数量（最多64个成员） |
| BIT(M)         | 位字段类型                                   | 大约 (M+7)/8 字节                                          |
| BINARY(M)      | 固定长度二进制字符串                         | M 字节                                                     |
| VARBINARY (M)  | 可变长度二进制字符串                         | M+1 字节                                                   |
| TINYBLOB (M)   | 非常小的BLOB                                 | L+1 字节，在此，L<2^8                                      |
| BLOB (M)       | 小 BLOB                                      | L+2 字节，在此，L<2^16                                     |
| MEDIUMBLOB (M) | 中等大小的BLOB                               | L+3 字节，在此，L<2^24                                     |
| LONGBLOB (M)   | 非常大的BLOB                                 | L+4 字节，在此，L<2^32                                     |

括号中的`M`表示可以为其指定长度(其代表的是字符个数)，`L`表示数据的实际长度，表第三列中的`L+1`等表示实际的存储长度，实际的存储需要字符串的长度 `L`加上一个字节以记录字符串的长度。

##### CHAR 和 VARCHAR 类型

CHAR(M) 为固定长度字符串，在定义时指定字符串列长。当保存时，在右侧填充空格以达到指定的长度。

VARCHAR(M) 是长度可变的字符串，最大实际长度由最长的行的大小和使用的字符集确定，而实际占用的空间为字符串的实际长度加 1。

下面将不同的字符串保存到 CHAR(4) 和 VARCHAR(4) 列，说明 CHAR 和 VARCHAR 之间的差别，如下表所示。

| 插入值   | CHAR(4) | 存储需求 | VARCHAR(4) | 存储需求 |
| -------- | ------- | -------- | ---------- | -------- |
| ' '      | '  '    | 4字节    | ''         | 1字节    |
| 'ab'     | 'ab '   | 4字节    | 'ab'       | 3字节    |
| 'abc'    | 'abc '  | 4字节    | 'abc'      | 4字节    |
| 'abcd'   | 'abcd'  | 4字节    | 'abcd'     | 5字节    |
| 'abcdef' | 'abcd'  | 4字节    | 'abcd'     | 5字节    |

##### TEXT 类型

TEXT列保存非二进制字符串，如文章内容、评论等。当保存或查询 TEXT 列的值时，不删除尾部空格。

##### ENUM 类型

ENUM 是一个字符串对象，值为表创建时列规定中枚举的一列值。其语法格式如下：

```mysql
<字段名> ENUM( '值1', '值1', …, '值n' )
```

ENUM 类型的字段在取值时，能在指定的枚举列表中获取，而且一次只能取一个。如果创建的成员中有空格，尾部的空格将自动被删除。

ENUM 值在内部用整数表示，每个枚举值均有一个索引值；列表值所允许的成员值从 1 开始编号，MySQL 存储的就是这个索引编号，枚举最多可以有 65535 个元素。

例如，定义 ENUM 类型的列（'first'，'second'，'third'），该列可以取的值和每个值的索引如下表所示。

| 值     | 索引 |
| ------ | ---- |
| NULL   | NULL |
| ''     | 0    |
| ’first | 1    |
| second | 2    |
| third  | 3    |

ENUM 值依照列索引顺序排列，并且空字符串排在非空字符串前，NULL 值排在其他所有枚举值前。

> 提示：ENUM 列总有一个默认值。如果将 ENUM 列声明为 NULL，NULL 值则为该列的一个有效值，并且默认值为 NULL。如果 ENUM 列被声明为 NOT NULL，其默认值为允许的值列表的第 1 个元素。

##### SET 类型

SET 是一个字符串的对象，可以有零或多个值，SET 列最多可以有 64 个成员，值为表创建时规定的一列值。指定包括多个 SET 成员的 SET 列值时，各成员之间用逗号`,`隔开，语法格式如下：

```mysql
SET( '值1', '值2', …, '值n' )
```

与 ENUM 类型相同，SET 值在内部用整数表示，列表中每个值都有一个索引编号。当创建表时，SET 成员值的尾部空格将自动删除。

但与 ENUM 类型不同的是，ENUM 类型的字段只能从定义的列值中选择一个值插入，而 SET 类型的列可从定义的列值中选择多个字符的联合。

> 提示：如果插入 SET 字段中的列值有重复，则 MySQL 自动删除重复的值；插入 SET 字段的值的顺序并不重要，MySQL 会在存入数据库时，按照定义的顺序显示；如果插入了不正确的值，默认情况下，MySQL 将忽视这些值，给出警告。

##### BIT 类型

位字段类型。M 表示每个值的位数，范围为 1～64。如果 M 被省略，默认值为 1。如果为 BIT(M) 列分配的值的长度小于 M 位，在值的左边用 0 填充。例如，为 BIT(6) 列分配一个值 b'101'，其效果与分配 b'000101' 相同。

BIT 数据类型用来保存位字段值，例如以二进制的形式保存数据 13，13 的二进制形式为 1101，在这里需要位数至少为 4 位的 BIT 类型，即可以定义列类型为 BIT(4)。大于二进制 1111 的数据是不能插入 BIT(4) 类型的字段中的。

##### BINARY 和 VARBINARY 类型

BINARY 和 VARBINARY 类型类似于 CHAR 和 VARCHAR，不同的是它们包含二进制字节字符串。

BINARY 类型的长度是固定的，指定长度后，不足最大长度的，将在它们右边填充 “\0” 补齐，以达到指定长度。例如，指定列数据类型为 BINARY(3)，当插入 a 时，存储的内容实际为 “\a0\0”，当插入 ab 时，实际存储的内容为“ab\0”，无论存储的内容是否达到指定的长度，存储空间均为指定的值 M。

VARBINARY 类型的长度是可变的，指定好长度之后，长度可以在 0 到最大值之间。例如，指定列数据类型为 VARBINARY(20)，如果插入的值长度只有 10，则实际存储空间为 10 加 1，实际占用的空间为字符串的实际长度加 1。

##### BLOB 类型

BLOB 是一个二进制的对象，用来存储可变数量的数据。

#### 日期和时间类型

| 类型名称  | 日期格式            | 日期范围                                          | 存储需求 |
| --------- | ------------------- | ------------------------------------------------- | -------- |
| YEAR      | YYYY                | 1901 ~ 2155                                       | 1 个字节 |
| TIME      | HH:MM:SS            | -838:59:59 ~ 838:59:59                            | 3 个字节 |
| DATE      | YYYY-MM-DD          | 1000-01-01 ~ 9999-12-3                            | 3 个字节 |
| DATETIME  | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59         | 8 个字节 |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | 1980-01-01 00:00:01 UTC ~ 2040-01-19 03:14:07 UTC | 4 个字节 |

DATE 类型用于仅需要日期值时，没有时间部分，可以使用 CURRENT_DATE 或者 NOW()，插入当前系统日期。

如果我们对TIMESTAMP类型的字段没有明确赋值，或是被赋与了NULL值，MySQL会自动将该字段赋值为系统当前的日期与时间。

TIMESTEMP类型还可以使用CURRENT_TIMESTAMP来获取系统当前时间。 

TIMESTAMP 与 DATETIME 除了存储字节和支持的范围不同外，还有一个最大的区别是：

- DATETIME 在存储日期数据时，按实际输入的格式存储，即输入什么就存储什么，与时区无关；
- 而 TIMESTAMP 值的存储是以 UTC（世界标准时间）格式保存的，存储时对当前时区进行转换，检索时再转换回当前时区。即查询时，根据当前时区的不同，显示的时间值是不同的。

### 操作数据

#### 创建数据表

```mysql
/*
建立一张用来存储学生信息的表
字段包含学号、姓名、性别，年龄、入学日期、班级，email等信息
*/
-- 创建数据库表：
create table t_student(
        sno int(6),
        sname varchar(5),
        sex char(1),
        age int(3),
        enterdate date,
        classname varchar(10),
        email varchar(15)
);
-- 查看表的结构：展示表的字段详细信息
desc t_student;

-- 查看表中数据：
select * from t_student;

-- 查看建表语句：
show create table t_student;
/*
CREATE TABLE `t_student` (
  `sno` int DEFAULT NULL,
  `sname` varchar(5) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `enterdate` date DEFAULT NULL,
  `classname` varchar(10) DEFAULT NULL,
  `email` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
*/
```

#### 插入数据

```mysql
-- 在t_student数据库表中插入数据：
insert into t_student values (1,'张三','男',18,'2022-5-8','软件1班','123@126.com');
insert into t_student values (10010010,'张三','男',18,'2022-5-8','软件1班','123@126.com'); -- 可以超出int(6)的范围
insert into t_student values (2,'张三','男',18,'2022.5.8','软件1班','123@126.com');
insert into t_student values (7,"张三",'男',18,now(),'软件1班','123@126.com');
#如果不是全字段插入数据的话，需要加入字段名
insert into t_student (sno,sname,enterdate) values (10,'李四','2023-7-5');
```

#### 修改、删除数据

```mysql
-- 修改表中数据
update t_student set sex = '女' ;
update t_student set sex = '男' where sno = 10 ;
UPDATE T_STUDENT SET AGE = 21 WHERE SNO = 10;
update t_student set CLASSNAME = 'java01' where sno = 10 ;
update t_student set CLASSNAME = 'JAVA01' where sno = 9 ;
update t_student set age = 29 where classname = 'java01';

-- 删除操作：
delete from t_student where sno = 2;
```

#### 修改、删除数据库表

```mysql
-- 修改表的结构：
-- 增加一列：
alter table t_student add score double(5,2) ; -- 5:总位数  2：小数位数 
update t_student set score = 123.5678 where sno = 1 ;

-- 增加一列（放在最前面）
alter table t_student add score double(5,2) first;

-- 增加一列（放在sex列的后面）
alter table t_student add score double(5,2) after sex;

-- 删除一列：
alter table t_student drop score;

-- 修改一列：
alter table t_student modify score float(4,1); -- modify修改是列的类型的定义，但是不会改变列的名字
alter table t_student change score score1 double(5,1); -- change修改列名和列的类型的定义

-- 删除表：
drop table t_student;
```



#### 注意事项

- 关键字，表名，字段名不区分大小写 

- 默认情况下，内容不区分大小写 
- 字符串不区分单引号和双引号 
- 如果不是全字段插入数据的话，需要加入字段名

- 删除操作from关键字不可缺少 

- 修改，删除数据别忘记加限制条件 