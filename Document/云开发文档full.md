
新增一个TimeTableClass

参数

```json
{
    "ClassName": "New Class Name"
}
// openid 从getWXContext中获取
```



涉及到的表：

+ TimeTableClass表中新增Class实体
+ User_TimeTableClass_Relation中新增类所属用户的关系



#### AddTimeTable

新增一个TimeTable表单

```json
{
    "Name": string,
    "Status": int,
    "Context": string,
    "BelongClassID": ID string
}
// days is set to [] because it is not chosen yet
// Table ID can be get after create Table
```

涉及到的表：

+ TimeTable：表单实体新增
+ TimeTableClass_TimeTable_Relation：新增关系



#### AlterTimeSelected

修改用户选择的时间段

```json
{
    "TableID": ID string,
    "UserID": ID string,
    "SelectTime": json 
}
```

涉及到的表：

+ TimeTable_Member_Relation：需要查询是否有关系存在，并获取RelationID
+ TimeTable_Member_Relation：修改已选择的时间段



#### AlterTimeTableBelong

移动表单到其他类下

```sql
{
	"TableID": ID string,
	"NewBelongClassID": ID string
}
```

涉及到的表：

+ TimeTableClass：先确认ClassID是否存在
+ TimeTableClass_TimeTable_Relation：修改关系



#### AlterTimeTableInfo

修改TimeTable的Info

```sql
{
	"TableID": ID string,
	// next are options
	"NewStatus": int,
	"NewContext": string
}
```

涉及到的表：

+ TimeTable：修改实体



#### JoinTimeTable

用户加入TimeTable

```json
{
    "TableID": ID string,
    "UserID": ID string. // Open ID
}
```

涉及到的表：

+ TimeTable_Member_Relation：查找关系是否已经存在
+ TimeTable_Member_Relation：新增关系



#### DeleteTimeTable

删除一个TimeTable

```json
{
    "TableID": ID string
}
```

涉及到的表：

+ TimeTable：删除实体
+ TimeTableClass_TimeTable_Relation：删除关系
+ TimeTable_Member_Relation：删除关系



#### DeleteTimeTableClass

删除一个分类并且级联删除下面的表单

```json
{
    "ClassID": ID string
}
```

涉及到的表：

+ TimeTableClass：删除实体
+ TimeTable：删除若干实体
+ TimeTableClass_TimeTable_Relation：删除关系
+ TimeTable_Member_Relation：删除关系