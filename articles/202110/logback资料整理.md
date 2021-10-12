> 参考资料：
>
> - 原版：http://logback.qos.ch/manual/index.html
> - 翻译版：https://github.com/YLongo/logback-chinese-manual/
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

站在 logback 的角度来说，输出目的地叫做 appender。appender 包括console、file、remote socket server、MySQL、PostgreSQL、Oracle 或者其它的数据库、JMS、remote UNIX Syslog daemons 中。

> 一个 logger 可以有多个 appender。

如果 root logger 添加了一个 console appender，所有允许输出的日志至少会在控制台打印出来。如果再给一个叫做 ***L*** 的 logger 添加了一个 file appender，那么 ***L*** 以及 ***L*** 的子级 logger 都可以在文件和控制台打印日志。可以通过设置 additivity = false 来改写默认的设置，这样 appender 将不再具有叠加性。

例子：

| Logger          | Appender   | Additivity 标识 | 输出目的地             | 说明                                                         |
| --------------- | ---------- | --------------- | ---------------------- | ------------------------------------------------------------ |
| root            | A1         | 不适用          | A1                     | root logger 为 logger 层级中的最高层，additivity 对它不适用  |
| x               | A-x1, A-x2 | True            | A1, A-x1, A-x2         | x 与 root 的 appender                                        |
| x.y             | 无         | true            | A1, A-x1, A-x2         | x 与 root 的 appender                                        |
| x.y.z           | A-xyz1     | true            | A1, A-x1, A-x2, A-xyz1 | x 与 x.y 与 root 的 appender                                 |
| security        | A-sec      | **false**       | A-sec                  | 因为 additivity = false，所以只有 A-sec 这个 appender        |
| security.access | 无         | true            | A-sec                  | 因为它的父级 logger security 设置了 additivity = false，所以只有 A-sec 这一个 appender |

通常，用户既想自定义日志的输出地，也想自定义日志的输出格式。通过给 appender 添加一个 *layout* 可以做到。layout 的作用是将日志格式化，而 appender 的作用是将格式化后的日志输出到指定的目的地。**PatternLayout** 能够根据用户指定的格式来格式化日志，类似于 C 语言的 printf 函数。

例：PatternLayout 通过格式化串 "%-4relative [%thread] %-5level %logger{32} - %msg%n" 会将日志格式化成如下结果：

```
176  [main] DEBUG manual.architecture.HelloWorld2 - Hello world.
```

> 第一个参数表示程序启动以来的耗时，单位为毫秒。第二个参数表示当前的线程号。第三个参数表示当前日志的级别。第四个参数是 logger 的名字。“-” 之后是具体的日志信息。

**底层实现初探**

![点击查看大图](https://gitee.com/yanglu_u/ImgRepository/raw/master/images/20211012102927.gif)

# 03 | logback配置

**logback初始化步骤**

以下是 logback 的初始化步骤：

1. logback 会在类路径下寻找名为 logback-test.xml 的文件。
2. 如果没有找到，logback 会继续寻找名为 logback.groovy 的文件。
3. 如果没有找到，logback 会继续寻找名为 logback.xml 的文件。
4. 如果没有找到，将会通过 JDK 提供的 [ServiceLoader](https://docs.oracle.com/javase/6/docs/api/java/util/ServiceLoader.html) 工具在类路径下寻找文件 *META-INFO/services/ch.qos.logback.classic.spi.Configurator*，该文件的内容为实现了 [`Configurator`](https://logback.qos.ch/xref/ch/qos/logback/classic/spi/Configurator.html) 接口的实现类的全限定类名。
5. 如果以上都没有成功，logback 会通过 [BasicConfigurator](https://logback.qos.ch/xref/ch/qos/logback/classic/BasicConfigurator.html) 为自己进行配置，并且日志将会全部在控制台打印出来。

**状态数据**

你可以通过构造一个配置文件来打印状态信息，而不需要通过编码的方式调用 `StatusPrinter` 去实现。只需要在 *configuration* 元素上添加 *debug* 属性。配置文件如下所示。

> 注意：debug 属性只跟状态信息有关，并不会影响 logback 的配置文件，也不会影响 logger 的日志级别。

*Example: sample1.xml*

```xml
<configuration debug="true">
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

如果配置文件的配置有问题，logback 会检测到这个错误并且在控制台打印它的内部状态。

**当配置文件更改时，自动加载**

为了让 logback 能够在配置文件改变的时候自动去扫描，需要在 `<configuration>` 标签上添加 `scan=true` 属性。

*Example*

```xml
<configuration scan="true">
    ...
</configuration>
```

# 04 | Appenders















