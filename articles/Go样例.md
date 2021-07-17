# Go样例笔记

> data：2021-07-12

---

# 01 | 使用样例

**样例1：开发 http 接口，执行 shell 脚本**

```go
package main

import (
    "fmt"
	"time"
    "net/http"
    "io/ioutil"
    "os/exec"
)

func main() {
    //第一个参数是接口名，第二个参数 http handle func
    http.HandleFunc("/sync", sync)
    //服务器要监听的主机地址和端口号
    http.ListenAndServe("localhost:4001", nil)
}

// http handle func
func sync(rw http.ResponseWriter, req *http.Request) {
    execCommand("cd /home/infra/infra-blog")
    execCommand("git pull")

	fmt.Println("sync success at: " + time.Now().String())
    fmt.Fprint(rw, "sync success.")
}

func execCommand(strCommand string) string {
	cmd := exec.Command("/bin/bash", "-c", strCommand)

	stdout, _ := cmd.StdoutPipe()
	if err := cmd.Start(); err != nil {
		fmt.Println("Execute failed when Start:" + err.Error())
		return ""
	}

	out_bytes, _ := ioutil.ReadAll(stdout)
	stdout.Close()

	if err := cmd.Wait(); err != nil {
		fmt.Println("Execute failed when Wait:" + err.Error())
		return ""
	}

	return string(out_bytes)
}
```

