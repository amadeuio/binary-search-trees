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

  // build the balanced binary tree from a sorted array
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

  // visit the tree in breadth-first traversal and process every node in function fn
  // if no function provided, return an array
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
        // pass each node to the provided function, if it exists
        fn(node);
      } else {
        // append each node to resut array if no function is provided
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

    // return result array only if no function is provided
    if (!fn) {
      return result;
    }
  }

  // depth-first: inorder traversal (left, current, right)
  // if no function provided, return an array
  inorder(fn) {
    let result = [];

    // visit the tree in inorder traversal starting from 'node'
    const inorderTraverse = (node) => {
      // base case
      if (node === null) {
        return;
      }

      // navigate left
      inorderTraverse(node.left);

      // process result
      if (fn) {
        fn(node);
      } else {
        result.push(node.value);
      }

      // navigate right
      inorderTraverse(node.right);
    };

    // call traverse starting from root
    inorderTraverse(this.root);

    // return result array
    return result;
  }

  // depth-first: preorder traversal (current, left, right)
  preorder(fn) {
    let result = [];

    const preorderTraverse = (node) => {
      // base case
      if (node === null) {
        return;
      }

      // process current node
      if (fn) {
        fn(node);
      } else {
        result.push(node.value);
      }

      // navigate left
      preorderTraverse(node.left);

      // navigate right
      preorderTraverse(node.right);
    };

    // call traverse starting from root
    preorderTraverse(this.root);

    // return result array
    return result;
  }

  // depth-first: postorder traversal (left, right, current)
  postorder(fn) {
    let result = [];

    const postorderTraverse = (node) => {
      // base case
      if (node === null) {
        return;
      }

      // navigate left
      postorderTraverse(node.left);

      // navigate right
      postorderTraverse(node.right);

      // process current node
      if (fn) {
        fn(node);
      } else {
        result.push(node.value);
      }
    };

    // call traverse starting from root
    postorderTraverse(this.root);

    // return result array
    return result;
  }

  // returns the height starting from a given node
  // defined as the number of edges (steps) in longest path from a given node to a leaf node
  height(node = this.root) {
    // if the node is null, return -1 (as we are counting the number of edges)
    if (node === null) {
      return -1;
    }

    // compute the height of each subtree
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    // return the greater height of the two subtrees, and add 1 for the current node
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // finds the number of edges (distance) between a node and the root
  depth(root, node) {
    if (root === null || root === node) {
      // base case: either the root is null or we've found the desired node
      return 0;
    }

    // we navigate the tree, and at each step we add +1 to depth
    if (node.value < root.value) {
      // the desired node is in the left subtree
      return 1 + this.depth(root.left, node);
    } else {
      // the desired node is in the right subtree
      return 1 + this.depth(root.right, node);
    }
  }

  // checks if tree is balanced
  isBalanced(node = this.root) {
    // base case: an empty subtree is balanced
    if (node === null) {
      return true;
    }

    // check if the heights of the left and right subtrees differ by more than 1
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    }

    // recursively navigate the tree and check if balanced
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  // rebalance an unbalanced tree
  rebalance() {
    // reminder 1: inorder traversal of the BST gives the values of the nodes in sorted order
    // reminder 2: if inorder is called without a function as argument, it returns an array
    // perform inorder traversal and assign sorted array to constant
    const sortedArray = this.inorder();

    // simply rebuild the tree using the sorted array
    this.root = this.buildTree(sortedArray);
  }
}

// function that prints every node
function print(node) {
  console.log(node.value);
}

// import mergeSort & getRandomArray functions (Node.js environment)
("use strict");
const { mergeSort, getRandomArray } = require("./utils/arraySortUtils.js");

// example tree

// 1. create a BST from an array of random numbers
let myRandomArray = getRandomArray(5);
let mySortedArray = mergeSort(myRandomArray);
let treee = new Tree(mySortedArray);
tree.prettyPrint();

// 2. confirm the tree is balanced
console.log(`Is it balanced: ${tree.isBalanced()}`); // true

// 3. print out all elements in level, pre, post, and in order
console.log(`Level order traversal:`);
tree.levelOrder(print);

console.log(`Inorder traversal: `);
tree.inorder(print);

console.log(`Preorder traversal: `);
tree.preorder(print);

console.log(`Postorder traversal: `);
tree.postorder(print);

// 4. unbalace the tree by adding several numbers
tree.insert(34);
tree.insert(1);
tree.insert(68);

// 5. confirm the tree is unbalanced
console.log(`Is it balanced: ${tree.isBalanced()}`); // false

// 6. balance the tree by calling rebalance
tree.rebalance();

// 7. confirm the tree is balanced
console.log(`Is it balanced: ${tree.isBalanced()}`); // true

// 8. print out all elements in level, pre, post, and in order
console.log(`Level order traversal:`);
tree.levelOrder(print);

console.log(`Inorder traversal: `);
tree.inorder(print);

console.log(`Preorder traversal: `);
tree.preorder(print);

console.log(`Postorder traversal: `);
tree.postorder(print);
