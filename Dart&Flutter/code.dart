
var arr1 = <String>['Tom', 'Andy', 'Jack'];
var arr2 = new List<int>.of([1,2,3]);
arr2.add(499);
arr2.forEach((v) => print('${v}'));
print(arr2 is List<int>); // true

var map1 = <String, String>{'name': 'Tom','sex': 'male',};
var map2 = new Map<String, String>();
map2['name'] = 'Tom';
map2['sex'] = 'male';
map2.forEach((k,v) => print('${k}: ${v}')); 
print(map2 is Map<String, String>); // true


bool isZero(int number) { //判断整数是否为0
  return number == 0; 
}

void printInfo(int number,Function check) { //用check函数来判断整数是否为0
  print("$number is Zero: ${check(number)}");
}

Function f = isZero;
int x = 10;
int y = 0;
printInfo(x,f);  // 输出 10 is Zero: false
printInfo(y,f);  // 输出 0 is Zero: true

// 简写  一行的时候  类似js

bool isZero(int number) => number == 0;

void printInfo(int number,Function check) => print("$number is Zero: ${check(number)}");


//要达到可选命名参数的用法，那就在定义函数的时候给参数加上 {}
void enable1Flags({bool bold, bool hidden}) => print("$bold , $hidden");

//定义可选命名参数时增加默认值
void enable2Flags({bool bold = true, bool hidden = false}) => print("$bold ,$hidden");

//可忽略的参数在函数定义时用[]符号指定
void enable3Flags(bool bold, [bool hidden]) => print("$bold ,$hidden");

//定义可忽略参数时增加默认值
void enable4Flags(bool bold, [bool hidden = false]) => print("$bold ,$hidden");

//可选命名参数函数调用
enable1Flags(bold: true, hidden: false); //true, false
enable1Flags(bold: true); //true, null
enable2Flags(bold: false); //false, false

//可忽略参数函数调用
enable3Flags(true, false); //true, false
enable3Flags(true,); //true, null
enable4Flags(true); //true, false
enable4Flags(true,true); // true, true



class Point {
  num x, y;
  static num factor = 0;
  //语法糖，等同于在函数体内：this.x = x;this.y = y;
  Point(this.x,this.y);
  void printInfo() => print('($x, $y)');
  static void printZValue() => print('$factor');
}

var p = new Point(100,200); // new 关键字可以省略
p.printInfo();  // 输出(100, 200);
Point.factor = 10;
Point.printZValue(); // 输出10


/* 
operator 是 Dart 的关键字，与运算符一起使用，表示一个类成员运算符函数。在理解时，我们应该把 operator 和运算符作为整体，看作是一个成员函数名。
 */
class Vector {
  num x, y;
  Vector(this.x, this.y);
  // 自定义相加运算符，实现向量相加
  Vector operator +(Vector v) =>  Vector(x + v.x, y + v.y);
  // 覆写相等运算符，判断向量相等
  bool operator == (dynamic v) => x == v.x && y == v.y;
}

final x = Vector(3, 3);
final y = Vector(2, 2);
final z = Vector(1, 1);
print(x == (y + z)); //  输出true
