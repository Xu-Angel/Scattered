import 'dart:convert';
import 'dart:io';

class Item {
  double price;
  String name;
  Item(name, price) {
    this.name = name;
    this.price = price;
  }
}

class ShoppingCart {
  String name;
  DateTime date;
  String code;
  List<Item> bookings;

  price() {
    double sum = 0.0;
    for (var i in bookings) {
      sum += i.price;
    }
    return sum;
  }

  ShoppingCart(name, code) {
    this.name = name;
    this.code = code;
    this.date = DateTime.now();
  }

  getInfo() {
    return '购物车信息:' +
        '\n-----------------------------' +
        '\n用户名: ' +
        name +
        '\n优惠码: ' +
        code +
        '\n总价: ' +
        price().toString() +
        '\n日期: ' +
        date.toString() +
        '\n-----------------------------';
  }
}

get() async {
  //创建网络调用示例，设置通用请求行为(超时时间)
  var httpClient = HttpClient();
  httpClient.idleTimeout = Duration(seconds: 5);

  //构造URI，设置user-agent为"Custom-UA"
  var uri = Uri.parse("https://flutter.dev");
  var request = await httpClient.getUrl(uri);
  request.headers.add("user-agent", "Custom-UA");

  //发起请求，等待响应
  var response = await request.close();

  //收到响应，打印结果
  if (response.statusCode == HttpStatus.ok) {
    print(await response.transform(utf8.decoder).join());
  } else {
    print('Error: \nHttp status ${response.statusCode}');
  }
}

void main() {
  ShoppingCart sc = ShoppingCart('小李子', '123456');
  sc.bookings = [Item('苹果', 10.0), Item('鸭梨', 20.0)];
  print(sc.getInfo());
  get();
}
