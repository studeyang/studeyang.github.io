#!/bin/sh

nohup docsify serve -p 4000 &
nohup go run hooks/pullFromGit.go &
doc_pid=`pgrep -f 'docsify serve -p 4000'`
sync_pid=`pgrep -f 'pullFromGit.go'`

echo -e "\033[32m start success, docsify pid: $doc_pid . sync hook pid: $sync_pid . \033[0m"
