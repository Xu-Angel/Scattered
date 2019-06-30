centos解压

```
1.以.a为扩展名的文件:
#tar xv file.a
2.以.z为扩展名的文件:
#uncompress file.Z
3.以.gz为扩展名的文件:
#gunzip file.gz
4.以.bz2为扩展名的文件:
#bunzip2 file.bz2
5.以.tar.Z为扩展名的文件:
#tar xvZf file.tar.Z
或 #compress -dc file.tar.Z | tar xvf
6.以.tar.gz/.tgz为扩展名的文件:
#tar xvzf file.tar.gz
或 gzip -dc file.tar.gz | tar xvf –
7.以.tar.bz2为扩展名的文件:
#tar xvIf file.tar.bz2
或 bzip2 -dc file.tar.bz2 | xvf –
8.以.cpio.gz/.cgz为扩展名的文件:
#gzip -dc file.cgz | cpio -div
9.以.cpio/cpio为扩展名的文件:
#cpio -div file.cpio
或cpio -divc file.cpio
10.以.rpm为扩展名的文件安装:
#rpm -i file.rpm
11.以.rpm为扩展名的文件解压缩：
#rpm2cpio file.rpm | cpio -div
12.以.deb为扩展名的文件安装：
#dpkg -i file.deb
13.以.deb为扩展名的文件解压缩:
#dpkg-deb –fsys-tarfile file.deb | tar xvf – ar p
file.deb data.tar.gz | tar xvzf –
14.以.zip为扩展名的文件:
#unzip file.zip
15.在linux下解压Winzip格式的文件：
要是装了jdk的话，可以用jar命令；还可以使用unzip命令。
16.直接解压.tar.gz文件：
xxxx.tar.gz文件使用tar带zxvf参数，可以一次解压开。XXXX为文件名。 例如：$tar zxvf xxxx.tar.gz 各种压缩文件的解压（安装方法）
17.文件扩展名解压（安装方法）：
.a ar xv file.a.Z uncompress file.Z.gz gunzip file.gz.bz2 bunzip2 file.bz2.tar.Z tar xvZf file.tar.Zcompress -dc file.tar.Z | tar xvf –.tar.gz/.tgz tar xvzf file.tar.gzgzip -dc file.tar.gz | tar xvf –.tar.bz2 tar xvIf file.tar.bz2bzip2 -dc file.tar.bz2 | xvf –.cpio.gz/.cgz gzip -dc file.cgz | cpio -div.cpio/cpio cpio -div file.cpiocpio -divc file.cpio.rpm/install rpm -i file.rpm.rpm/extract rpm2cpio file.rpm | cpio -div.deb/install dpkg -i file.deb.deb/exrtact dpkg-deb –fsys-tarfile file.deb | tar xvf –ar p file.deb data.tar.gz | tar xvzf –.zip unzip file.zip
bzip2 -d myfile.tar.bz2 | tar xvf
18.tar xvfz myfile.tar.bz2x 是解压v 是复杂输出f 是指定文件z gz格式
```

