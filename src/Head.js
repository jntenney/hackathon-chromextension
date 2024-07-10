class Head {
  constructor(el) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'head');
    el.appendChild(this.node);

    this.node.style.top = `0px`;
    this.node.style.left = `0px`;
    this.boardElement = el;
    this.body = new Body();
  }

  setPosition(left = 0, top = 0) {
    // update each body segments to previous segment's old position
    // this make each segment follow the position of the segment
    // in front of it
    let bodySegment = this.body.tail;
    while (bodySegment) {
      bodySegment.top = bodySegment.previous
        ? bodySegment.previous.top
        : this.topPosition;
      bodySegment.left = bodySegment.previous
        ? bodySegment.previous.left
        : this.leftPosition;

      bodySegment = bodySegment.previous;
    }

    //advance all body segments to their new position
    bodySegment = this.body.head;
    while (bodySegment) {
      bodySegment.bodyElement.style.left = `${bodySegment.left}px`;
      bodySegment.bodyElement.style.top = `${bodySegment.top}px`;

      bodySegment = bodySegment.next;
    }

    this.topPosition = top;
    this.leftPosition = left;

    this.node.style.left = `${left}px`;
    this.node.style.top = `${top}px`;
  }

  // get the current position of the head
  getPosition() {
    let topPosition = Number(this.node.style.top.replace('px', ''));
    let leftPosition = Number(this.node.style.left.replace('px', ''));

    return { headLeftPosition: leftPosition, headTopPosition: topPosition };
  }

  // add a number of new segments to the body of the snake
  addToBody(num) {
    let top = Number(this.node.style.top.replace('px', ''));
    let left = Number(this.node.style.left.replace('px', ''));

    for (let i = 0; i < num; i++) {
      const bodyElement = document.createElement('div');
      bodyElement.setAttribute('id', 'body');
      this.boardElement.appendChild(bodyElement);

      bodyElement.style.left = `${left}px`;
      bodyElement.style.top = `${top}px`;

      this.body.add(left, top, bodyElement);
    }
    console.log(this.body);
  }

  //reset the body for a new game
  resetBody() {
    //advance all segments to their new position
    let bodySegment = this.body.head;
    while (bodySegment) {
      this.boardElement.removeChild(bodySegment.bodyElement);
      bodySegment = bodySegment.next;
    }

    this.body = new Body();
  }
}
