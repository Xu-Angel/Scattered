class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    // 根节点
    this.root = null;
  }
  // 插入节点的方法(递归)
  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (node.right === null) {
      node.right = newNode;
    } else {
      this.insertNode(node.right, newNode);
    }
  }
  // 插入节点的接口
  insert(key) {
    const newNode = new Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  // 中序排序
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node !== null && node !== undefined) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  // 先序排序
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node !== null && node !== undefined) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  // 后序排序
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node !== null && node !== undefined) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  // 二叉树查找给定的值
  search(value) {
    return this.searchNode(this.root, value);
  }
  searchNode(node, key) {
    if (node !== null && node !== undefined) {
      if (key < node.key) {
        return this.searchNode(node.left, key);
      } else if (key > node.key) {
        return this.searchNode(node.right, key);
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}


const nodes = [8, 3, 10, 1, 6, 11, 2, 9, 12];
const binaryTree = new BinaryTree();
nodes.forEach((key) => {
  binaryTree.insert(key);
});

const callback = (key) => {
  console.log(key);
};

console.log('中序遍历--------------------------');
binaryTree.inOrderTraverse(callback);
console.log('先序遍历--------------------------');
binaryTree.preOrderTraverse(callback);
console.log('后序遍历--------------------------');
binaryTree.postOrderTraverse(callback);

const searchResult1 = binaryTree.search(9);
const searchResult2 = binaryTree.search(100);

console.log(searchResult1 ? '查询成功' : '查询失败');
console.log(searchResult2 ? '查询成功' : '查询失败');