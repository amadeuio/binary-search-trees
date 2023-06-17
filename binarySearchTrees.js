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

  // insert a value
  insert(value) {
    // if there is no tree, create a root node
    if (this.root === null) {
      this.root = new Node(value);
      // if there is, call insertNode on the tree's root node
    } else {
      this.insertNode(this.root, value);
    }
  }

  // insert a value at a node
  insertNode(node, value) {
    if (value < node.value) {
      // if value is less than node's value, go left
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else {
      // if value is more than node's value, go right
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
  }

  // delete a value starting from root (in all the tree)
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  // delete a value starting from a node
  deleteNode(node, value) {
    if (node === null) {
      // value not found in tree
      return null;
    }

    // navigate through the tree until the value is found
    if (value < node.value) {
      // value is less than node's value, go left
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.value) {
      // value is more than node's value, go right
      node.right = this.deleteNode(node.right, value);
      return node;
    } else {
      // value is equal to node's value, this is the node to be deleted

      // node with no child or one child
      // if it has no child: replace it for null (effectivey deleting it)
      // it has one child: replace it for that child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // node with two children: we need to replace the node for it's in-order predecessor
      // get the in-order predecessor (maximum value in the left subtree)
      let tempNode = this.getMaxValueNode(node.left);

      // replace the current node to be deleted with the in-order predecessor
      node.value = tempNode.value;

      // delete the duplicate in-order predecessor from it's original position (the left subtree)
      node.left = this.deleteNode(node.left, tempNode.value);

      return node;
    }
  }

  // returns the maximum value of the tree starting from a given node
  getMaxValueNode(node) {
    // since it's a BTS, the maximum value will be found by navigating to the right
    // until there are no right children
    while (node && node.right !== null) {
      node = node.right;
    }

    // return that node
    return node;
  }

  // finds the node containing a value
  // node = this.root uses  the feature 'default parameters'
  find(value, node = this.root) {
    // tree is empty or the node is not found
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      // if the value is less than the node's value, navigate to the left subtree
      return this.find(value, node.left);
    } else if (value > node.value) {
      // if the value is more than the node's value, navigate to the right subtree
      return this.find(value, node.right);
    } else {
      // if this else block is executed, it means we found the node. return
      return node;
    }
  }

  // visit the tree in breadthFirstTraversal and process every node in function fn
  levelOrder(fn) {
    if (!this.root) {
      return;
    }

    let queue = [];
    let result = [];
    queue.push(this.root);

    while (queue.length > 0) {
      // remove first element of que and store in node variable (fifo)
      let node = queue.shift();

      // process node variable
      if (fn) {
        fn(node.value);
      } else {
        result.push(node.value);
      }

      // add the left and right children to the queue, if they exist
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    if (!fn) return result;
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

function print(node) {
  console.log(node);
}

let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//tree.prettyPrint();
console.log(tree.levelOrder());
