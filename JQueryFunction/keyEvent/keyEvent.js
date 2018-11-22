/* 全局变量 */
window.focusArea = ''; // 焦点定位模块
window.focusIndex = 0;
window.focusItem = '';
var VK_BACK = window.VK_BACK || 8;
var VK_ESC = window.VK_ESC || 27;
var VK_ENTER = window.VK_ENTER || 13;
var VK_LEFT = window.VK_LEFT || 37;
var VK_RIGHT = window.VK_RIGHT || 39;
var VK_UP = window.VK_UP || 38;
var VK_DOWN = window.VK_DOWN || 40;
var VK_MENU = window.VK_MENU || 17;
var VK_HOME = window.VK_HOME || 18;
var VK_RED = window.VK_RED || 112;
var VK_GREEN = window.VK_GREEN || 113;
var VK_YELLOW = window.VK_YELLOW || 114;
var VK_BLUE = window.VK_BLUE || 115;
var VK_PLAY = window.VK_PLAY || 116;
window.KEY_CODE = {
  [VK_BACK]: 'BACK',
  [VK_ENTER]: 'ENTER',
  [VK_MENU]: 'MENU',
  [VK_HOME]: 'HOME', // alt
  [VK_ESC]: 'ESC',
  [VK_LEFT]: 'LEFT',
  [VK_UP]: 'UP',
  [VK_RIGHT]: 'RIGHT',
  [VK_DOWN]: 'DOWN',
  [VK_RED]: 'RED', // F1
  [VK_GREEN]: 'GREEN', // F2
  [VK_YELLOW]: 'YELLOW', // F3
  [VK_BLUE]: 'BLUE', // F4
  [VK_PLAY]: 'PLAY' // F5
};

/* 封装方法 */
const CORE = {
  /**
   * 按键事件
   * @description
   *
   * @param {Object} event 按键事件对象
   * @param {String} area 事件区块
   * @param {String} parent 关联的父级菜单
   * @param {String} col 区块内的子块的每行列数
   * @param {[{String: 'left', area: 'menu'}]} neighbors 在页面中相邻区的位置以及区域标识
   * @param {[{code, callback1}, {code, callback2},]} actions 可触发的按键事件集合, code为按键码，callback为焦点不符合切换时执行的回调函数,没有回调函数时默认调用切换区块方法。
   * @param {Function} switchFocus 当前区内切换焦点时的执行函数
   *
   */
  keyEvents(
    event,
    area,
    col,
    actions,
    neighbors = null,
    switchFocus = null,
    parent = ''
  ) {
    const items = $(`#${area}`).find('.item') || $(`#${area}`);
    const total = items.length;
    if (focusArea === area) {
      // console.log(KEY_CODE[event.which]);
      switch (KEY_CODE[event.which]) {
        case 'RIGHT':
          event.preventDefault();
          const r = this.isInArray(actions, 'RIGHT');
          if (r !== -1) {
            if ((focusIndex + 1) % col && focusIndex < total - 1) {
              focusIndex += 1;
              this.switchFocus(items, focusIndex, switchFocus);
            } else if (actions[r].callback) {
              actions[r].callback();
            } else {
              this.switchArea(neighbors, parent, 'right');
            }
          }
          break;
        case 'LEFT':
          event.preventDefault();
          const l = this.isInArray(actions, 'LEFT');
          if (l !== -1) {
            if (focusIndex % col) {
              focusIndex -= 1;
              this.switchFocus(items, focusIndex, switchFocus);
            } else if (actions[l].callback) {
              actions[l].callback();
            } else {
              this.switchArea(neighbors, parent, 'left', parent);
            }
          }
          break;
        case 'UP':
          event.preventDefault();
          const u = this.isInArray(actions, 'UP');
          if (u !== -1) {
            if (focusIndex > col - 1) {
              focusIndex -= col;
              this.switchFocus(items, focusIndex, switchFocus);
            } else if (actions[u].callback) {
              actions[u].callback();
            } else {
              this.switchArea(neighbors, parent, 'top', parent);
            }
          }
          break;
        case 'DOWN':
          event.preventDefault();
          const d = this.isInArray(actions, 'DOWN');
          if (d !== -1) {
            const lastLine =
              total % col == 0 ? total : Math.floor(total / col + 1) * col;
            if (focusIndex + col < lastLine) {
              focusIndex =
                focusIndex + col > total - 1 ? total - 1 : focusIndex + col;
              this.switchFocus(items, focusIndex, switchFocus);
            } else if (actions[d].callback) {
              actions[d].callback();
            } else {
              this.switchArea(neighbors, parent, 'bottom', parent);
            }
          }
          break;
        case 'ENTER':
          event.preventDefault();
          const i = this.isInArray(actions, 'ENTER');
          if (i !== -1) {
            actions[i].callback && actions[i].callback();
          }
          break;
        case 'RED':
          event.preventDefault();
          {
            const i = this.isInArray(actions, 'RED');
            if (i !== -1) {
              actions[i].callback && actions[i].callback();
            }
          }
          break;
        case 'GREEN':
          event.preventDefault();
          {
            const i = this.isInArray(actions, 'GREEN');
            if (i !== -1) {
              actions[i].callback && actions[i].callback();
            }
          }
          break;
        case 'YELLOW':
          event.preventDefault();
          {
            const i = this.isInArray(actions, 'YELLOW');
            if (i !== -1) {
              actions[i].callback && actions[i].callback();
            }
          }
          break;
        case 'BLUE':
          event.preventDefault();
          {
            const i = this.isInArray(actions, 'BLUE');
            if (i !== -1) {
              actions[i].callback && actions[i].callback();
            }
          }
          break;
        case 'BACK':
          console.log('press BACK');
          event.preventDefault();
          event.stopPropagation();
          {
            const i = this.isInArray(actions, 'BACK');
            if (i !== -1) {
              actions[i].callback && actions[i].callback();
            }
          }
          break;
        case 'PLAY':
          event.preventDefault();
          event.stopPropagation();
          {
            const i = this.isInArray(actions, 'PLAY');
            if (i !== -1) {
              actions[i].callback && actions[i].callback();
            }
          }
          break;
        default:
          break;
      }
    }
  },

  /**
   * 页面切换
   * @description
   *
   * @param {String} next 将切换到的页面id
   * @param {String} area focus的区域
   * @param {Number} index focus的索引
   * @param {Function} event 回调函数
   *
   */
  switchPage(next, area, index, callback) {
    $(`#${next}`)
      .show()
      .siblings()
      .hide();
    focusIndex = index || 0;
    focusArea = area || next;
    this.switchFocus(focusArea, focusIndex);
    callback && callback();
  },

  /**
   * 焦点区域切换
   * @description
   *
   * @param {String or Array} 当前焦点区域的元素集合 相邻区域集合，指定移动区域时，为字符串
   * @param {Number} index 索引 / {String}parent 父级区域id
   * @param {Array} position 相对位置
   */
  switchArea(neighbor, index, position) {
    if (!neighbor) return;
    const i =
      typeof neighbor === 'string'
        ? neighbor
        : this.isInArray(neighbor, position);
    if (i !== -1) {
      focusArea = typeof i === 'string' ? i : neighbor[i].area;
      this.switchFocus();
      if (index && focusArea === index) {
        const oParent = $(`#${focusArea}`).find('.active');
        focusIndex = oParent.index();
        oParent.removeClass('active').addClass('focus');
      } else {
        focusIndex = Number(index) || 0;
        const items =
          $(`#${focusArea}`).find('.item').length > 0
            ? $(`#${focusArea} .item`)
            : $(`#${focusArea}`);
        this.switchFocus(items, focusIndex);
      }
    }
  },

  /**
   * 焦点切换
   * @description
   *
   * @param {NodeList or String} nodes 当前焦点区域的元素集合
   * @param {Number} index 焦点索引
   * @param {Function} callback 回调函数
   *
   */
  switchFocus(nodes, index, callback) {
    let $focus = $('.focus');
    let isItem;
    if ($focus.length) {
      isItem = $focus.hasClass('item') && $focus.find('.ellipsis').length;
      isItem && this.rollTitle($focus, 1);
      $focus.removeClass('focus');
    }
    if (!nodes) return false;
    if (typeof nodes === 'string') {
      var len = $(`#${nodes}`).find('.item').length;
      nodes = len ? $(`#${nodes} .item`) : $(`#${nodes}`);
    } else {
      len = nodes.length;
    }
    $focus = nodes.eq(index || 0);
    $focus.addClass('focus');
    isItem = $focus.hasClass('item') && $focus.find('.ellipsis').length;
    isItem && this.rollTitle($focus);
    callback && callback();
  },

  /**
   * 获取数组内能够匹配指定键值的元素索引
   * @description 区分数组内元素为对象或数组或的情况
   *
   * @param {Array} arr 待遍历数组
   * @param {String} val 匹配值
   *
   */
  isInArray(arr, val) {
    let flag = -1;
    if (typeof arr !== 'object') {
      return flag;
    } else {
      if (arr[0] instanceof Array) {
        arr.map((item, index) => {
          for (const i in item) {
            if (item[i] == val) {
              flag = index;
            }
          }
        });
        return flag;
      } else if (arr[0] instanceof Object) {
        arr.map((object, index) => {
          for (const key in object) {
            if (object.hasOwnProperty(key) && object[key] == val) {
              flag = index;
            }
          }
        });
        return flag;
      } else {
        return arr.indexOf(val);
      }
    }
  }
};
