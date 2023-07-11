![languages](https://img.shields.io/badge/languages-js-F7DF1E)
[![course](https://img.shields.io/badge/learned_on-the_odin_project-d19900)](https://www.theodinproject.com/lessons/javascript-binary-search-trees)
![license](https://img.shields.io/badge/license-MIT-blue)

# Binary Search Trees 🌳

### About 📖

Binary search trees (BST) are a data structure that allow for efficient search, insertion, and deletion. When the tree is balanced, these operations have a time complexity of `O(logn)`, which is way better than the one of a regular list `O(n)`.

### Description 📚

This application features an object constructor that creates BST's from a sorted array of numbers, and it includes a bunch of methods to modify the tree.

It also provides the ability to create a list of length `n` of random numbers `> 0` & `< 100` and an array sorting utility that utilises an efficient merge sort algorithm (as developed on my [previous project](https://github.com/nightrunner4/recursion)) to create constructor ready arrays.

### Challenges 😅

Wrapping my head around the exact step-by-step process of recursive methods and gaining familiarity with creating and utilizing class constructors in JavaScript.

### Methods 🔧

- 🌳 `buildTree()`: Builds the tree from a sorted array.

- 🌿 `prettyPrint()`: Prints the tree in a visually appealing format.

- ➕ `insert(value)`: Inserts a value.

- ➖ `delete(value)`: Deletes a value.

- 🔍 `find(value)`: Finds and returns the node containing the given value.

- 🌐 `levelOrder()`: Performs a breadth-first traversal and calls the function passed as an argument with each node as its argument.

- ⏭️ `inorder()`: Performs an in-order traversal and calls the function passed as an argument with each node as its argument.

- ⏯️ `preorder()`: Performs a pre-order traversal and calls the function passed as an argument with each node as its argument.

- ⏮️ `postorder()`: Performs a post-order traversal and calls the function passed as an argument with each node as its argument.

- 📏 `height()`: Returns the height of the BST.

- ⚖️ `isBalanced()`: Checks if the BST is balanced.

- ⚖️ `rebalance()`: Rebalances an unbalanced BST.

### Usage 🖊️

* Create a tree from a simple sorted array

`let tree = new Tree([1, 3, 4, 5, 8])`

* If we `console.log(tree)` it looks like this

``` 
Tree {
  root: Node {
    value: 4,
    left: Node { value: 3, left: [Node], right: null },
    right: Node { value: 8, left: [Node], right: null }
  }
} 
```

* If we call `tree.prettyPrint()` it looks like this

```
│   ┌── 8
│   │   └── 5
└── 4
    └── 3
        └── 1
```

* Let's check if it's balanced

`console.log(tree.isBalanced()) // true`

* Let's print each value in level order

`//tree.levelOrder(print) // 4, 3, 8, 1, 5`

* Let's print each value in inorder

`tree.inorder(print) // 1, 3, 4, 5, 6`

* Let's find the height of the tree

`console.log(tree.height()) // 2`

* Delete two nodes

```
tree.delete(1)
tree.delete(4)
```

* If we use `tree.prettyPrint()` again

```
│   ┌── 8
│   │   └── 5
└── 3
```

* Is the tree balanced now? (Spoiler: When you delete or add nodes from a balanced BST, the tree's balance can be disturbed due to the removal of nodes and subsequent restructuring, so no)

`console.log(tree.isBalanced()) // false`

* Let's rebalance the tree

`tree.rebalance()`
`console.log(tree.isBalanced()) // true`










