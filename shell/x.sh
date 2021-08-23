#! /bin/bash
# testing the read option
# -t 超时时间
read -t 5  -p "Please enter your name: " name
echo "Hello $name."
if