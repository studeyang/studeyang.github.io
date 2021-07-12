<center><h1>Shell样例笔记</h1></center>

> date：2021-07-12

---

# 01 | 脚本样例

## 样例1：循环调用接口

```shell
# !/bin/bash

for i in {100..786}
do
  id="sdbc0$i"
  data="{\"ids\":[\"$id\"],\"startTime\":\"2021-07-03 00:00:00\",\"endTime\":\"2021-07-03 23:59:59\"}"
  curl -v -H "accept: */*" -H "Content-Type:application/json" -X POST http://xxx/a -d "$data" >> reconsume.log
done
```

## 样例2：带颜色输出

```shell
# 蓝色
echo -e "\033[32m success. \033[0m"
```

