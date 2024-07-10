class Apple {
  constructor(el) {
    this.node = document.createElement('img');
    this.node.setAttribute('id', 'apple');
    this.node.setAttribute('src', 'src/assets/apple.jpg');

    el.appendChild(this.node);

    this.topPosition = 0;
    this.leftPosition = 0;

    this.setPosition();
  }

  setPosition(left = 300, top = 300) {
    let leftPosition = left;
    let topPosition = top;

    this.topPosition = topPosition;
    this.leftPosition = leftPosition;

    this.node.style.left = `${leftPosition}px`;
    this.node.style.top = `${topPosition}px`;
  }

  getPosition() {
    let topPosition = Number(this.node.style.top.replace('px', ''));
    let leftPosition = Number(this.node.style.left.replace('px', ''));

    return { appleLeftPosition: leftPosition, appleTopPosition: topPosition };
  }
}
