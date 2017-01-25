class Block {
  constructor(value, row, col) {
    this.value = value;
    this.row = row;
    this.col = col;
  }



  getColor() {
    switch (this.value) {
      case -1:
        return "white";
      case 0:
        return "pink";
      case 1:
        return "lightblue";
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
