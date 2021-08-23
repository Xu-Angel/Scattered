#!/bin/bash
 
string="hello,shell,split,test"  
array=(${string//,/ })  
 
for var in ${array[@]}
do
   echo $var
done

#shell编程之命令执行的状态结果 $?