Component({
  /**
   * 组件的初始数据
   */
  data: {
    tabbar: {
      backgroundColor: "#ffffff",
      color: "#999",
      selectedColor: "#007dfc",
      currentPagePath: "/pages/home/home",
      list: [
        {
          pagePath: "/pages/home/home",
          iconPath: "images/home.png",
          handler: "handleHome",
          selectedIconPath: "images/home-active.png",
          text: "首页"
        },
        {
          pagePath: "/pages/release/release",
          iconPath: "images/release.png",
          isSpecial: true,
          handler: "handleRelease",
          text: "发需求"
        },
        {
          pagePath: "/pages/my/my",
          iconPath: "images/my.png",
          handler: "handleMy",
          selectedIconPath: "images/my-active.png",
          text: "我的"
        }
      ]
    }
  },
  attached() {
    const currentPages = getCurrentPages();
    const currentPagePath = `/${currentPages[currentPages.length - 1].route}`;
    this.setData({
      currentPagePath
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHome() {
      wx.switchTab({
        url: "/pages/home/home"
      });
    },
    handleRelease() {
      wx.navigateTo({
        url: "/pages/release/release"
      });
    },
    handleMy() {
      wx.switchTab({
        url: "/pages/my/my"
      });
    }
  }
});
