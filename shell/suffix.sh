#截断字符串：${var%suffix} 和 ${var#prefix}。例如，假设 var=foo.pdf，那么 echo ${var%.pdf}.txt 将输出 foo.txt。
var=foo.pdf
echo ${var%.pdf} # foo