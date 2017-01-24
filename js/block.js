class Block {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.color = this.getColor();
  }



  getColor() {
    switch (this.value) {
      case -1:
        return "grey";
      case 0:
        return "pink";
      case 1:
        return "yellow";
      case 2:
        return "green";
      case 3:
        return "pink";
      case 5:
        return "blue";
      case 8:
        return "white";
      case 13:
        return "white";
      case 21:
        return "white";
      case 34:
        return "white";
      case 55:
        return "white";
      case 89:
        return "white";
      case 144:
        return "white";
    }
  }
}

module.exports = Block;
