// define Node class
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// define Tree class
class Tree {
  constructor(sortedArray) {
    this.root = this.buildTree(sortedArray);
  }

  // build the balanced binary tree
  buildTree(sortedArray) {
    if (sortedArray.length === 0) {
      return null;
    }

    // get the middle element
    let midIdx = Math.floor(sortedArray.length / 2);
    let node = new Node(sortedArray[midIdx]);

    // recursively build the left and right subtrees
    node.left = this.buildTree(sortedArray.slice(0, midIdx));
    node.right = this.buildTree(sortedArray.slice(midIdx + 1));

    // return the root node
    return node;
  }

  // print the tree
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // insert an element
  insert(node, value) {
    // base case, we've hit a leaf node
    if (node === null) {
      return new Node(value);
    }

    // recursive case
    if (value < node.value) {
      // move to left subtree
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      // move to right subtree
      node.right = this.insert(node.right, value);
    }

    // return the (potentially modified) node
    return node;
  }
}

// for visualisation purposes
myExampleTree = {
  root: {
    value: 3,
    left: {
      value: 2,
      left: {
        value: 1,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      value: 5,
      left: {
        value: 4,
        left: null,
        right: null,
      },
      right: null,
    },
  },
};

let tree = new Tree([1, 2, 3, 4, 5]);
tree.insert(tree.root, 8);
tree.prettyPrint();
