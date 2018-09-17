var Jack = {
  subscribers: {
      'any': []
  },
//添加订阅
  subscribe: function (type = 'any', fn) {
      if (!this.subscribers[type]) {
          this.subscribers[type] = [];
      }
      this.subscribers[type].push(fn); //将订阅方法保存在数组里
  },
//退订
  unsubscribe: function (type = 'any', fn) {
      this.subscribers[type] =
          this.subscribers[type].filter(function (item) { 
              return item !== fn;
          }); //将退订的方法从数组中移除
  },
//发布订阅
  publish: function (type = 'any', ...args) {
      this.subscribers[type].forEach(function (item) { 
          item(...args);	//根据不同的类型调用相应的方法
      });
  }
};

var Tom = {
  readNews: function (info) {
      console.log(info);
  }
};

//Tom订阅Jack的报纸
Jack.subscribe('娱乐', Tom.readNews);
Jack.subscribe('体育', Tom.readNews);

//Tom 退订娱乐新闻：
Jack.unsubscribe('娱乐', Tom.readNews);

//发布新报纸：
Jack.publish('娱乐', 'S.H.E演唱会惊喜登台')
Jack.publish('体育', '欧国联-意大利0-1客负葡萄牙');

/*  https://juejin.im/post/5b987d92e51d450e51625080?utm_source=gold_browser_extension*/