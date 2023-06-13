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

  // Recursively build the left and right subtrees
  root.left = buildTree(arr.slice(0, midIdx));
  root.right = buildTree(arr.slice(midIdx + 1));

  // Return the root node
  return root;
}

let myArray = [1, 2, 3, 4];

let myTree = new Tree(buildTree(myArray));

console.log(myTree);
