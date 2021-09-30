添加数据库配置：

application.properties

```
spring.datasource.platform=mysql
db.num=1
db.url.0=jdbc:mysql://10.118.32.170:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1000&socketTimeout=10000&autoReconnect=true
db.user=root
db.password=root
```

本地启动：

```
-Dnacos.standalone=true -Dnacos.home=D:\github\nacos
```

![image-20210928093901316](https://gitee.com/yanglu_u/ImgRepository/raw/master/image-20210928093901316.png)

打包：

```
mvn -Prelease-nacos clean install -U  -Dmaven.test.skip=true
```

# 问题

## 1、多租户实现原理

