> 参考资料：
>
> - 原版：http://logback.qos.ch/manual/index.html
> - 翻译版：https://github.com/YLongo/logback-chinese-manual/blob/master
> - https://logbackcn.gitbook.io/logback/

# 01 | logback介绍

**入门**

在 classpath 添加 slf4j-api.jar、logback-core.jar 以及 logback-classic.jar。

```java
package chapters.introduction;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld1 {

    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger("chapters.introduction.HelloWorld1");
        logger.debug("hello world");
    }
}
```

当没有默认的配置时，logback 将会在 root logger 中新增一个 `ConsoleAppender`。输出结果如下：

```log
11:58:56.662 [main] DEBUG chapters.introduction.HelloWorld1 - hello world
```

**打印内部状态**

```java
package chapters.introduction;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.core.util.StatusPrinter;

public class HelloWorld2 {

    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger("chapters.introduction.HelloWorld2");
        logger.debug("Hello world");
        
        // 打印内部的状态
        LoggerContext lc = (LoggerContext)LoggerFactory.getILoggerFactory();
        StatusPrinter.print(lc);
    }
}
```

运行结果如下：

```
12:23:49.324 [main] DEBUG chapters.introduction.HelloWorld2 - Hello world
12:23:49,258 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback-test.xml]
12:23:49,258 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback.groovy]
12:23:49,258 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback.xml]
12:23:49,262 |-INFO in ch.qos.logback.classic.BasicConfigurator@2e5d6d97 - Setting up default configuration.
```

Logback 没有找到 *logback-test.xml* 和 *logback.xml* 配置文件，所以通过默认的配置策略--添加一个基本的 `ConsoleAppender` 来进行配置。

> logback 的内部状态对查找 logback 相关的问题非常的有用。

# 02 | logback架构

**架构**

![img](https://github.com/YLongo/logback-chinese-manual/raw/master/images/log.png)

**有效层级**

Logger 能够被分成不同的等级。不同的等级（TRACE, DEBUG, INFO, WARN, ERROR）定义在 `ch.qos.logback.classic.Level` 类中。如果一个给定的 logger 没有指定一个层级，那么它就会继承离它最近的一个祖先的层级。为了确保所有的 logger 都有一个层级，root logger 会有一个默认层级 --- DEBUG。

以下四个例子指定不同的层级，以及根据继承规则得到的最终有效层级。

*Example 1*

| logger 的名字 | 指定的层级 | 有效层级 |
| ------------- | ---------- | -------- |
| root          | DEBUG      | DEBUG    |
| X             | none       | DEBUG    |
| X.Y           | none       | DEBUG    |
| X.Y.Z         | none       | DEBUG    |

在这个例子中，只有 root logger 被指定了层级，所以 logger **X**，**X.Y**，**X.Y.Z** 的有效层级都是 DEBUG。

*Example 2*

| logger 的名字 | 指定的层级 | 有效层级 |
| ------------- | ---------- | -------- |
| root          | ERROR      | ERROR    |
| X             | INFO       | INFO     |
| X.Y           | DEBUG      | DEBUG    |
| X.Y.Z         | WARN       | WARN     |

在这个例子中，每个 logger 都分配了层级，所以有效层级就是指定的层级。

*Example 3*

| logger 的名字 | 指定的层级 | 有效层级 |
| ------------- | ---------- | -------- |
| root          | DEBUG      | DEBUG    |
| X             | INFO       | INFO     |
| X.Y           | none       | INFO     |
| X.Y.Z         | ERROR      | ERROR    |

在这个例子中，logger **root**，**X**，**X.Y.Z** 都分别分配了层级。logger **X.Y** 继承它的父级 logger **X**。

*Example 4*

| logger 的名字 | 指定的层级 | 有效层级 |
| ------------- | ---------- | -------- |
| root          | DEBUG      | DEBUG    |
| X             | INFO       | INFO     |
| X.Y           | none       | INFO     |
| X.Y.Z         | none       | INFO     |

在这个例子中，logger **root**，**X** 都分配了层级。logger **X.Y**，**X.Y.Z** 的层级继承它们最近的父级 **X**。

**日志打印规则**

> 日志的打印级别为 *p*，Logger 实例的级别为 *q*，如果 *p* >= *q*，则该条日志可以打印出来。

这条规则是 logbakc 的核心。各级别的排序为：**TRACE** < **DEBUG** < **INFO** < **WARN** < **ERROR**。

例子：

```java
package chapters.architecture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Level;

public class SelectionRule {

    public static void main(String[] args) {
        
        // ch.qos.logback.classic.Logger 可以设置日志的级别
        // 获取一个名为 "com.foo" 的 logger 实例
        ch.qos.logback.classic.Logger logger = 
                (ch.qos.logback.classic.Logger)LoggerFactory.getLogger("com.foo");
        // 设置 logger 的级别为 INFO
        logger.setLevel(Level.INFO);
        
        // 这条日志可以打印，因为 WARN >= INFO
        logger.warn("警告信息");
        // 这条日志不会打印，因为 DEBUG < INFO
        logger.debug("调试信息");
        
        // "com.foo.bar" 会继承 "com.foo" 的有效级别
        Logger barLogger = LoggerFactory.getLogger("com.foo.bar");
        // 这条日志会打印，因为 INFO >= INFO
        barLogger.info("子级信息");
        // 这条日志不会打印，因为 DEBUG < INFO
        barLogger.debug("子级调试信息");
    }
}
```
**Appender与Layout**







