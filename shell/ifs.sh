
# 保存旧的 
IFS.OLD=$IFS


IFS=:

list="benxin:tuzi:benxintuzi"
for var in $list
do
    echo "The next user is $var"
done

IFS=$'\n:;'

list="benxin
tuzi:benxintuzi
tuzi;123"
for var in $list
do
    echo "The next user is $var"
done

#恢复
IFS=$IFS.OLD
