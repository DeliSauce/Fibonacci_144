class Block {
  constructor(value) {
    this.value = value;
    this.positionShift = 0;
    this.nextValue = -1;
    this.isNew = false;
    // this.row = row;
    // this.col = col;
  }

  getColor() {
    switch (this.value) {
      case -1:
        return "#b2a7a7"; //#f1f1f2
      case 0:
        return "#c4dfe6";
      case 1:
        return "#66a5ad";
      case 2:
        return "#75b1a9";
      case 3:
        return "#2c7873";
      case 5:
        return "#1995ad";
      case 8:
        return "#07575b";
      case 13:
        return "#6e6702";
      case 21:
        return "#86ac41";
      case 34:
        return "#b3c100";
      case 55:
        return "#d9b44a";
      case 89:
        return "#ffd64d";
      case 144:
        return "#cb6318";
    }
  }
}

module.exports = Block;
