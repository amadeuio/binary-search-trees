// node constructor
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// tree constructor
class Tree {
  constructor(root) {
    this.root = root;
  }
}

let myNode = new Node("hi", null, null);

console.log(myNode);
