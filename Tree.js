const LEFT = 0;
const RIGHT = 1;
  
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendents = [];
    this.parent = null;
  }

  get left() {
    return this.descendents[LEFT];
  }

  set left(node) {
    this.descendents[LEFT] = node;
    if (node) {
      node.parent = this;
    }
  }

  get right() {
    return this.descendents[RIGHT];
  }

  set right(node) {
    this.descendents[RIGHT] = node;
    if (node) {
      node.parent = this;
    }
  }
}

class BinarySerachTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  add(value) {
    const newNode = new TreeNode(value);

    if (this.root) {
      const { found, parent } = this.findNodeAndParent(value);

      if (found) {
        found.meta.multiplicity = (found.meta.multiplicity || 0) + 1;
      } else if (value < parent.value) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    } else {
      this.root = newNode;
    }

    this.size += 1;
    return newNode;
  }

  findNodeAndParent(value) {
    let node = this.root;
    let parent;

    while (node) {
      if (node.value === value) {
        break;
      }
      parent = node;

      node = (value >= node.value) ? node.right : node.left;
    }

    return { found: node, parent };
  }

  find(value) {
    const { found } = this.findNodeAndParent(value);
    return found;
  }

  combineLeftIntoRightSubtree(node) {
    if (node.right) {
      const leftmost = this.getLeftMost(node.right);
      leftmost.left = node.left;
      return node.right;
    }
    return node.left;
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) return false;

    const nodeToRemoveChildren = this.combineLeftIntoRightSubtree(nodeToRemove);

    if (nodeToRemove.meta.multiplicity && nodeToRemove.meta.multiplicity > 1) {
      nodeToRemove.meta.multiplicity -= 1;
    } else if (nodeToRemove === this.root) {
      this.root = nodeToRemoveChildren;
      this.root.parent = null;
    } else {
      const side = nodeToRemoveChildren.isParentLeftChild ? 'left' : 'right';
      const { parent } = nodeToRemove;
      parent[side] = nodeToRemoveChildren;
    }

    this.size -= 1;

    return true;
  }
}

class SplayTree {
  constructor() {

  }
}
