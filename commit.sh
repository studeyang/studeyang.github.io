#!/bin/bash

git add .
git commit -m $1
git push
echo -e "\033[32m push SUCCESS. \033[0m"

