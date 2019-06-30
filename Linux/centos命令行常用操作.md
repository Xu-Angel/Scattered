# centos命令行常用操作

**1、查看某个端口占用**

lsof -i tcp:80 

**2、查看是否安装了防火墙**

service iptables status 

查看是否启用防火墙
/etc/init.d/iptables status 

**3、查看全部安装的文件包**
yum list installed 

**4、查看有多少个php-fpm执行**
ps -fe |grep "php-fpm"|grep "pool"|wc -l 

**5、centos内存占用过高**

sync

echo 3 > /proc/sys/vm/drop_caches

**6、查看linux版本**

cat /etc/issue 

**7、nginx安装路径**
 whereis nginx

**8、服务器重启reboot**
**9、服务器关机halt**

**10、文件转zip**

zip -r name.zip /www/
封装gz
tar -zcvf db1.tar.gz db1
tar -zxvf db1.tar.gz 解压gz

**11、linux中tar解压tar.xz文件**

使用xz -d xxx.tar.xz 将 xxx.tar.xz解压成 xxx.tar

再用tar -xvf xxx.tar解压

**12、查看当前文件夹文件大小**
du -sh /home
ls -lh

**13、复制文件夹123文件夹重命名为456**
cp -rv /ecmoban/123 /ecmoban/456
**14、复制到当前文件夹并改名**
cp -r mm ./mmmm
拷贝A文件夹到B目录
cp -rv A B
如果你正在B目录下,可以这样:
cp -rv A ./
拷贝A文件下的A1文件
cp -v A/A1 ./
或者
cp -v A/A1 B/

**15、vim使用**

crontab -e进行编辑
ctrl+c => shift+: =>输入wq进行保存
:q!退出不保存

**16、查看使用资源**
df -h

**17、删除文件**
rm -rf ..

**18、修改文件夹或者文件名称**
mv .. ..

**19、更改文件夹及子文件夹权限**
chmod -R 777 ..

chown -R -v root:mail test6

**20、linux之间拷贝命令**
scp -r /home/work/source.txt work@192.168.0.10:/home/work/ #把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下

scp -r work@192.168.0.10:/home/work/source.txt /home/work/ #把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下

**21、查看系统版本**

cat /etc/issue	位数	getconf LONG_BIT

cat /proc/cpuinfo |grep "processor"|wc -l 查看cpu个数

**22、查看php-cgi进程数**

netstat -anpo | grep "php-fpm" | wc -l 

**23、查看内存占用最高的5个**
ps -aux | sort -k4nr | head -5

**24、清理内存方法**
sync
echo 3 > /proc/sys/vm/drop_caches

**25、nginx ab测试**

ab -c 100 -n 1000000 -k http://127.0.0.1:8080/ 

**26、安装sar工具获取网卡级别流量图**
yum install sysstat 
\#获取网卡流量图
sar -n DEV 1 5//每一秒取一次值，一共取五次。eth0 为内网网卡，eth1 为外网网卡。

**27、服务器内部安装 iftop 流量监控工具**
yum install iftop -y //安装工具
iftop -i eth1 -P //使用	netstat -tunlp |grep 53139//端口对应的进程