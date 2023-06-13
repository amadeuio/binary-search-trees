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
}

let tree = new Tree([1, 2, 3, 4, 6, 7, 8, 9, 10]);
console.log(tree.root.left.left);
