function BinaryTree() {
  // 生产节点对象
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  // 根节点
  this.root = null;

  // 插入节点的方法(递归)

  var insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }

  // 插入节点的接口
  this.insert = function (key) {
    var newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
    }
  }

  // 中序排序
  this.inOrderTraverse = function(callback){
    inOrderTraverseNode(this.root,callback);
  }

  var inOrderTraverseNode = function(node,callback){
    if(node !== null && node !== undefined){
      inOrderTraverseNode(node.left,callback);
      callback(node.key);
      inOrderTraverseNode(node.right,callback);
    }
  }

  // 先序排序
  this.preOrderTraverse = function(callback){
    preOrderTraverseNode(this.root,callback);
  }

  var preOrderTraverseNode = function(node,callback){
    if(node !== null && node !== undefined){
      callback(node.key);
      preOrderTraverseNode(node.left,callback);
      preOrderTraverseNode(node.right,callback);
    }
  }

  // 后序排序
  this.postOrderTraverse = function(callback){
    postOrderTraverseNode(this.root,callback);
  }

  var postOrderTraverseNode = function(node,callback){
    if(node !== null && node !== undefined){
      postOrderTraverseNode(node.left,callback);
      postOrderTraverseNode(node.right,callback);
      callback(node.key);
    }
  }

  // 二叉树查找给定的值
  this.search = function(value){
    return searchNode(this.root,value);
  }

  var searchNode = function(node,key){
    if(node !== null && node !== undefined){
      if(key < node.key){
        return searchNode(node.left,key);
      } else if(key > node.key){
        return searchNode(node.right,key);
      } else{
        return true;
      }
    } else {
      return false;
    }
  }

}


var nodes = [8,3,10,1,6,11,2,9,12];
var binaryTree = new BinaryTree();
nodes.forEach(function(key) {
  binaryTree.insert(key);
});

var callback = function(key){
  console.log(key);
}

console.log('中序遍历--------------------------');
binaryTree.inOrderTraverse(callback);
console.log('先序遍历--------------------------');
binaryTree.preOrderTraverse(callback);
console.log('后序遍历--------------------------');
binaryTree.postOrderTraverse(callback);

var searchResult1 = binaryTree.search(9);
var searchResult2 = binaryTree.search(100);

console.log(searchResult1 ? '查询成功' :'查询失败');
console.log(searchResult2 ? '查询成功' :'查询失败');