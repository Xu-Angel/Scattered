/** @function */
/** @function myFunction */
// the above is the same as:
/** @function
 * @name myFunction */
var paginate = paginateFactory(pages)

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
/**
 * Does something asynchronously and executes the callback on completion.
 * @param {requestCallback} cb - The callback that handles the response.
 */
function doSomethingAsynchronously(cb) {
  // code
}

/**
 * @function 处理表格的行
 * @description 合并Grid的行
 * @param grid {Ext.Grid.Panel} 需要合并的Grid
 * @param cols {Array} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
 * @param isAllSome {Boolean} ：是否2个tr的cols必须完成一样才能进行合并。true：完成一样；false(默认)：不完全一样
 * @return void
 * @author polk6 2015/07/21
 * @example
 * _________________ _________________
 * | 年龄 | 姓名 | | 年龄 | 姓名 |
 * ----------------- mergeCells(grid,[0]) -----------------
 * | 18 | 张三 | => | | 张三 |
 * ----------------- - 18 ---------
 * | 18 | 王五 | | | 王五 |
 * ----------------- -----------------
 */
function mergeCells(grid: Ext.Grid.Panel, cols: Number[], isAllSome: boolean = false) {
  // Do Something
}

/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {
  // ...stuff...

  return element
}
