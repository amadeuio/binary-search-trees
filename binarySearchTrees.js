// node constructor
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// tree constructor
class Tree {
  constructor(root) {
    this.root = root;
  }
}

// builds balanced binary tree, arr is sorted & without duplicated
function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }

  // get the middle element
  let midIdx = Math.floor(arr.length / 2);
  let root = new Node(arr[midIdx]);

  // recursively build the left and right subtrees
  root.left = buildTree(arr.slice(0, midIdx));
  root.right = buildTree(arr.slice(midIdx + 1));

  // return the root node
  return root;
}

// prints BST in a pretty way
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let myArray = [1, 2, 3, 4, 5, 6, 7, 8];

let myTree = buildTree(myArray);
let myPrettyTree = prettyPrint(myTree);

console.log(myPrettyTree);
