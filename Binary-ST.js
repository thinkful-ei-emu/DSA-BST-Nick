class BST {
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value = null){
    if(this.key === null){
      this.key = key;
      this.value = value;
    }

    else if(key < this.key){
      if(this.left === null){
        this.left = new BST(key, value, this);
      }

      else {
        this.left.insert(key, value);
      }
    }

    else {
      if(this.right === null){
        this.right = new BST(key, value, this);
      }

      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key){
    if(this.key === key){
      return this.value;
    }

    else if(key < this.key && this.left){
      return this.left.find(key);
    }

    else if(key > this.key && this.right){
      return this.right.find(key);
    }

    else {
      throw new Error('Key Error');
    }
  }

  remove(key){
    if(this.key === key){
      if(this.left && this.right){
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }

      else if(this.left){
        this._replaceWith(this.left);
      }

      else if(this.right){
        this._replaceWith(this.right);
      }

      else {
        this._replaceWith(null);
      }
    }

    else if(key < this.key && this.left){
      this.left.remove(key);
    }

    else if(key > this.key && this.right){
      this.right.remove(key);
    }
    
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node){
    if(this.parent){
      if(this == this.parent.left){
        this.parent.left = node;
      }
      else if(this == this.parent.right){
        this.parent.right = node;
      }
      if(node) {
        node.parent = this.parent;
      }
    }
    else {
      if(node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin(){
    if(!this.left){
      return this;
    }
    return this.left._findMin();
  }
 
}

// #4
//this function returns the sum of all of the values in a binary search tree.
// The run time of this O(n) because it must scan the whole tree.
function tree(t){
  if(!t){
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

function treeTest(){

  const binaryST = new BST();

  binaryST.insert(4, 4);
  binaryST.insert(3, 3);
  binaryST.insert(6, 6);

  
  console.log(tree(binaryST));

}

// treeTest();


function heightOfBST(t, leftVal = 1, rightVal = 1){

  if(t.key === null && t.parent === null){
    return 0;
  }

  if(!t.left && !t.right){
    if(leftVal >= rightVal){
      return leftVal;
    } else {
      return rightVal;
    }
  }

  if(t.left && t.right){
    console.log('both');
    leftVal++;
    rightVal++;
    return heightOfBST(t.left, leftVal, rightVal), heightOfBST(t.right, leftVal, rightVal);
  }

  if(t.left && !t.right){
    console.log('left');
    leftVal++;
    return heightOfBST(t.left, leftVal, rightVal);
  }

  if(t.right && !t.left){
    console.log('right');
    rightVal++;
    return heightOfBST(t.right, leftVal, rightVal);
  }
}

function isBST(t){

  if(t === null){
    return;
  }

  let result = true;

  if(t.left || t.right){
    if(t.left && t.key < t.left){
      result = false;
    }
    if(t.right && t.key > t.right){
      result = false;
    }
    else {
      return isBST(t.left), isBST(t.right);
    }
  }

  return result;
}

// let notSearchTree = {key: 5, left: 6, right: 4};
// console.log(isBST(notSearchTree));

function thirdLargestNode(t){
  let currNode = t;
  //next node ends up being the largest node after the loop
  let nextNode = currNode.right;
  let leftCounter = 0;

  while (nextNode.right !== null){
    currNode = nextNode;
    nextNode = currNode.right;
  }

  // console.log(nextNode);

  let leftMost = nextNode.left;

  while(leftMost !== null){
    leftCounter+=1;
    leftMost = leftMost.left;
  }

  // console.log(leftCounter);

  if(leftCounter === 0 && currNode.left === null){
    return currNode.parent;
  }

  if(leftCounter === 0 && currNode.left !== null){
    return currNode.left;
  }

  if(leftCounter === 1){
    return currNode;
  }

  if(leftCounter >= 2){
    return nextNode.left.left;
  }

}



function isBalancedBST(t, leftVal = 1, rightVal = 1){

  if(t.key === null && t.parent === null){
    return 0;
  }

  if(!t.left && !t.right){
    if(leftVal >= rightVal){
      return leftVal;
    } else {
      return rightVal;
    }
  }

  if(t.left && t.right){
    console.log('both');
    leftVal++;
    rightVal++;
    return heightOfBST(t.left, leftVal, rightVal), heightOfBST(t.right, leftVal, rightVal);
  }

  if(t.left && !t.right){
    console.log('left');
    leftVal++;
    return heightOfBST(t.left, leftVal, rightVal);
  }

  if(t.right && !t.left){
    console.log('right');
    rightVal++;
    return heightOfBST(t.right, leftVal, rightVal);
  }
}


function main(){

  const binaryST = new BST();

  binaryST.insert(1,0);
  binaryST.insert(4,0);
  binaryST.insert(8,0);
  binaryST.insert(12,0);
  binaryST.insert(11,0);
  binaryST.insert(10,0);
  binaryST.insert(13,0);

  console.log(thirdLargestNode(binaryST));
  
}

main();