# 复合条件的编写

# if-then语句可以使用布尔逻辑来组合测试，格式如下：

# [ condition1 ] && [ condition2 ]
# [ condition1 ] || [ condition2 ]
 

# if-then高级特性

# (( expression ))    用于对expression进行简单比较或计算，其中的比较操作符>等不需要转义
# [[ expression ]]    主要用于字符串模式匹配

val1=10

if (( $val1 ** 2 > 90 ))
then
　　(( val2=$val1 ** 2 ))
　　echo "The square of $val1 is $val2"
fi
