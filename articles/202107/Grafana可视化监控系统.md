# Grafana可视化监控系统<!-- {docsify-ignore-all} -->

> data：2021-07-27<br>资料：<br/>https://mp.weixin.qq.com/s/F392WVfVlqBNlUQVtQUn8A<br/>https://grafana.com/docs/grafana/latest/best-practices/

---

# 01 | 环境安装

## 1.1 下载安装Grafana

下载Docker镜像：

```shell
docker pull grafana/grafana
```

运行Grafana：

```shell
docker run -p 3000:3000 --name grafana \
-d grafana/grafana
```

访问地址：http://localhost:3000，登录账号密码为`admin:admin`。

## 1.2 下载安装Prometheus

下载Docker镜像：

```shell
docker pull prom/prometheus
```

创建`prometheus.yml`：

```yml
global:
  scrape_interval: 5s
```

运行Prometheus：

```shell
docker run -p 9090:9090 --name prometheus \
-v /Users/yanglulu/dev/docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
-d prom/prometheus
```

Prometheus也有可视化界面，访问地址：`http://localhost:9090/`。

> 也可本地安装，启动命令：./prometheus --config.file=prometheus.yml
>
> 

# 02 | 监控系统信息

下载`node_explorer`的安装包并解压，下载地址：https://prometheus.io/download/#node_exporter。

```shell
cd /mydata
tar -zxvf node_exporter-1.1.2.linux-amd64.tar.gz
mv node_exporter-1.1.2.linux-amd64 node_exporter
```

进入解压目录，使用如下命令运行`node_explorer`，服务将运行在`9100`端口上。

```
./node_exporter > log.file 2>&1 &
```

使用`curl`命令访问获取指标信息接口，获取到信息表示运行成功。

```
curl http://localhost:9100/metrics
```

```shell
# HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 2175
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
```

接下来修改Prometheus的配置文件`prometheus.yml`，创建一个任务定时扫描`node_explorer`暴露的指标信息。

```
scrape_configs:
  - job_name: node
    static_configs:
    - targets: ['localhost:9100']
```

重启Prometheus容器。
