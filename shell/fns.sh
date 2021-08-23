#! /bin/bash
# testing the exit status of a function
# 使用变量保存，这种方式不仅可以返回任意数值，还可以返回字符串值
set -euo pipefail
trap "echo 'error: Script failed: see failed command above'" ERR

func() {
        read -p "Please enter a value: " value
        echo $[ $value * 2 ]
        echo "hello, I come"
}

result=`func`
echo "The exit status of func is: $result"
