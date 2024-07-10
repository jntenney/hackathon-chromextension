/**
 *
 * constructor for node in linked list
 */
function Node(left, top, bodyElement) {
  this.bodyElement = bodyElement;
  this.next = null;
  this.previous = null;
  this.top = top;
  this.left = left;
}

// this class is for the body segments of the snake
// which are separate from the head
// it is basically a linked list which tracks each
// body segment keeping track of the the element within
// the HTML and the element's top and left position
class Body {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * add - Adds given value to the end of the linked list
   *
   * @param {string|number|boolean} val - value to be stored in linked list
   * @return {number} The new length of the linked list
   */
  add(left, top, bodyElement) {
    const node = new Node(left, top, bodyElement);
    node.top = top;
    node.left = left;

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;

    return this.length;
  }
}
