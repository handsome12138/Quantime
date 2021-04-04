# Quantime 需求文档

## 文档说明

### 更新日志

| 更新者 | 更新时间 | 更新内容   | 备注 |
| ------ | -------- | ---------- | ---- |
| 剩女   | 2021.4.1 | initialize |      |



## 产品结构

![](./src/Quantime.png)

## 用户画像

+ 青椒炒蛋 —— 马原课的组长

  + 场景：每次需要统计组员时间都非常麻烦，并且需要人工下载结果，肉眼分析。
  + 需求：能够自动得出推荐的选择时间，拯救选择困难症。

+ 麦芽炒蛋 —— 史纲课的组员

  + 场景：每次组长统计时间时都是问卷，一个个看文字选时间非常麻烦，而且选错了还修改麻烦
  + 需求：有一个可以实时修改的问卷

  

## 功能说明

**时间统计：**

+ 发布统计

  + 可以选择需要统计的时间
  + 可以选择时间粒度
    + 允许全天选择

+ 分享统计

  + 二维码分享
  + 链接分享
  + 分享到群聊

+ 用户选择

  + 点选，批量选择
  + 可以即时修改

+ 修改表单状态

  + 允许/暂停填写
  + 允许/禁止其他用户查看统计结果
  + 新增原先没有的时间段
  + 删除表单
  + 拷贝表单

+ 结果统计

  + 整体热图
  + 每个时间段的具体到场人数
  + 根据用户筛选时间
  + 生成结果截图

+ UI功能：

  + 搜索人名，表单名
  + 为表单新建集合

  

## 页面逻辑

![](./src/Quantime2.png)



## 开发时间轴

+ 四月第一周：原型，简单页面结构搭建
+ 四月第二周：简单页面的前端完成（美化前的版本），设计稿完成
+ 四月第三周：主要技术攻关统计结果页面，简单后端搭建与学习
+ 四月第四周：考试周，各自努力
+ 五月第一周：完成前端的所有工作
+ 五月第二周：完成后端的所有工作

## 页面结构

+ components

  + tabbar
  + (Time需要的)
    + FormDisplay: 表单组件
    + TimeBar：时间条组件，用于发布选择，和对象点选
    + Calendar：日历组件
    + TouchBar：选择具体日期的组件（也就是表盘的替代品）

  

+ Login：登录页面

+ Mine：我的

+ Home: 主页，两个按钮

  + TeamMain： 待开发

  + TimeMain：当前核心功能，首页就是各个表单

    + Form：表单具体页面，一些设置和跳转处

    + （发布逻辑）

      + TimePublish：发布时选择时间的页面
      + FormShared：分享出去的表单页面

    + （从分享处进入）

      + TimeSelect：用户选择时间的页面

    + （统计结果）

      + Stat：统计结果页面

        



## 数据库设计

实体：

User

```sql
create table User(
	OpenID varchar(20) NOT NULL COMMENT 'VX OpenID',
    Name varchar(20) NOT NULL COMMENT 'Name displayed',
    Avatar varchar(100) COMMENT 'user avatar from vx itself',
    primary key(OpenID)
)
```



TimeTable

```sql
create table TimeTableLv1(
	TableID int NOT NULL auto increment COMMENT 'TableID Level 1'
    Name varchar(20) NOT NULL COMMENT 'Name of Table'
    primary key(TableID)
)
```



```sql
create table TimeTableLv2(
	TableID varchar(20) NOT NULL auto increment COMMENT 'TableID Level 2'
    Name varchar(20) NOT NULL COMMENT 'Name of Table',
    Status int NOT NULL COMMENT 'Status of the table listed in the following',
    
    primary key(TableID)
)
```

| statu code bit  | 状态                 |
| --------------- | -------------------- |
| 0b00000000**1** | 是否发布             |
| 0b0000000**1**0 | 是否允许用户查看结果 |





关系：

```sql
create table User_TimeTablev1_Relation(
	ID int not null auto increment COMMENT 'ID'，
    UserID varchar(20) not null comment 'user open id',
    TableID int not null comment 'Time Table v1 ID',
    primary key(ID)
)
```



```sql
create table TimeTablev1_v2_Relation(
	
)
```



