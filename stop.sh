#! /bin/bash

pid=`pgrep -f 'docsify serve -p 4000'`
kill -9 $pid

echo -e "\033[32m stop $pid success. \033[0m"
