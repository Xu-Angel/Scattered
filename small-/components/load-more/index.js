Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loadingText: {
      type: String,
      value: "加载中..."
    },
    failText: {
      type: String,
      value: "加载失败，请点击重试！"
    },
    noMoreText: {
      type: String,
      value: "没有更多了"
    },
    listRenderingDelay: {
      type: Number,
      value: 500
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    text: "",
    loadShow: false,
    isLoading: false,
    iconShow: true,
    hasMore: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //加载更多的入口方法, 直接在page中使用时请在onReachBottom() 方法中调用这个方法, 并实现loadMoreListener方法去获取数据
    loadMoreStart() {
      if (!this.data.hasMore) {
        // console.log('没有更多内容了');
        this.setData({
          loadShow: true,
          iconShow: false,
          text: this.properties.noMoreText
        });
        setTimeout(() => {
          this.setData({
            loadShow: false
          });
        }, 2000);
        return;
      }
      if (this.data.isLoading) {
        console.log("不要着急，加载中...");
        return;
      }
      // console.log('开始加载');
      this.setData({
        isLoading: true,
        loadShow: true,
        iconShow: true,
        text: this.properties.loadingText
      });
      setTimeout(() => {
        this.triggerEvent("loadMoreListener");
      }, 300);
      // this.triggerEvent('loadMoreListener');
    },
    //加载完成[需要传递异步获取列表数据获得的 curPage 和 totalPage]
    loadComplete(data) {
      // console.log('加载结束');
      const hasMore = data.curPage < data.totalPage && data.totalPage != 1;
      this.setData({
        loadShow: false,
        hasMore: hasMore
      });
      console.log(new Date().getTime() / 1000);
      //界面渲染延迟, 避免列表还未渲染完成就再次触发 loadMoreStart 方法
      setTimeout(() => {
        this.setData({
          isLoading: false
        });
      }, this.properties.listRenderingDelay);
    },
    // 加载失败
    loadFail() {
      // console.log('加载失败了');
      this.setData({
        isLoading: false,
        iconShow: false,
        text: this.properties.failText
      });
    },
    //点击 loadmore 控件时触发, 只有加载失败时才会进入页面回调方法
    clickLoadMore() {
      if (this.data.text != this.properties.failText) {
        return;
      }
      this.setData({
        isLoading: false,
        iconShow: true,
        text: this.properties.loadingText
      });
      this.triggerEvent("clickLoadMore");
    }
  }
});
