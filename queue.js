'use strict';

function createNode(data=null, next=null, prev=null){
  return {
    data, next, prev
  };
}

class Queue {
  constructor(){
    this.first = null,
    this.last = null;
  }

  enqueue(data){
    let node = createNode(data);
    if(this.last){
      this.last.prev = node;
    }
    this.last = node;

    if(this.first === null){
      this.first = node;
    }


  }

  dequeue(){
    if(this.first === null){
      return null;
    }
    let node = this.first;
    this.first = this.first.prev;
    this.first.next = null;
    
    if(node === this.last){
      this.last = null;
    }
    return node.data;
  }

  peek(){
    if(this.first === null){
      return null;
    }
    return this.first.data;

  }


  display(){
    let node = this.first;
    while(node !== null){
      console.log(node.data);
      node = node.prev;
    }
  }
}

module.exports = Queue;