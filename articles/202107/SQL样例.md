# SQL样例笔记<!-- {docsify-ignore-all} -->

> data：2021-07-13

---

# 01 | 统计数据

**样例1：统计失败的日期范围**

```sql
SELECT MIN(created_at), MAX(created_at) FROM fail_message;
```

**样例2：按日期统计消费失败记录数**

```sql
SELECT DATE_FORMAT(created_at, '%Y-%m-%d'), COUNT(*) 
FROM fail_message 
GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d');
```

**样例3：统计失败原因**

```sql
SELECT reason, count(*) 
FROM fail_message 
WHERE created_at BETWEEN '2021-01-04 00:00:00' AND '2021-01-04 23:59:59' 
GROUP BY right(reason, 100);
```

