class Item {
  double price;
  String name;
  Item(name, price) {
    this.name = name;
    this.price = price;
  }
}

class ShoppingCart {+
  String name;
  DateTime date;
  String code;
  List < Item > bookings;

  price() {
    double sum = 0.0;
    for (var i in bookings) {
      sum += i.price;
    }
    return sum;
  }

  // ShoppingCart(name, code) {
  //   this.name = name;
  //   this.code = code;
  //   this.date = DateTime.now();
  // }
  /* 语法糖 初始化列表*/
  ShoppingCart(this.name, this.code) : date = DateTime.now();

  getInfo() {
    return '购物车信息:' + '\n-----------------------------' + '\n用户名: ' + name + '\n优惠码: ' + code + '\n总价: ' + price().toString() + '\n日期: ' + date.toString() + '\n-----------------------------';
  }
}

void main() {
  ShoppingCart sc = ShoppingCart('小李子', '123456');
  sc.bookings = [Item('苹果', 10.0), Item('鸭梨', 20.0)];
  print(sc.getInfo());
}