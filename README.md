# Fibonacci 144

Fibonacci 144 is based on the popular game 2048, replacing 2048's sequence with the Fibonacci Sequence. It is a simple game
#### [live][live]
[live]: https://delisauce.github.io/Fibonacci_144/



### Fibonacci Sequence
The Fibonacci numbers are a sequence of numbers in which every number after the first two is the sum of the two preceding ones:
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...

[Fibonacci (wikipedia)][Wikipedia]
[Wikipedia]: https://en.wikipedia.org/wiki/Fibonacci_number

### Goal
Slide the numbered blocks into each other to create new blocks with higher values. The player wins if they can get to 144 before the board fills up with blocks.

### Gameplay
Each game starts with 2 randomly placed blocks. Pressing the arrow keys on the keyboard (up, down, left, right), pushes all of the blocks on the game board in that direction. The blocks will slide as far as possible and will stop only upon coming in contact with the edge of the board or another block. If the act of sliding causes two blocks with sequential Fibonacci numbers to collide, they will reduce to one block with the next value in the sequence. After each turn a new block will be randomly added to the board.

### Board Options
The game offers a couple of options to give the user a slightly different gaming experience.
* Choice of the size of the game board from a 4x4 grid all the way up to 7x7.
* Choice of starting the Fibonacci sequence with a 0 or 1
  * 0: 0, 1, 1, 2, 3, 5, ...
  * 1: 1, 1, 2, 3, 5, ...

# Technical Details
For this game I used HTML Canvas to draw the game board and blocks, jQuery to create the "current score" board, and CSS for styling. The logic for the gameplay is in JavaScript.

One of the more difficult challenges was determining how to handle multiple collisions in a row. My approach was to have sequentially numbered blocks consolidate two at a time and chain multiple consolidation with a recursive method call.

Here is my code from the sliding block method, the first part of which simply slides the blocks as long as there is nothing blocking the way.


    slideBlocksRight(){
      let emptyCount = 0;
      for (let i = 0; i < this.size; i++) {
        for (let j = this.size - 1; j >= 0; j--) {
          if(this.positionEmpty(i,j)) {
            emptyCount++;
          } else if (emptyCount !== 0) {
            this.board[i][j + emptyCount] = this.board[i][j];
            this.board[i][j] = new Block(-1, i, j);
          }
        }
        emptyCount = 0;
      }

The second part of the method iterates over the blocks to check for possible consolidation. This was tricky to implement because we break out of the loop when we hit an empty space (because once the blocks have slid over we know that if we reach an empty space all successive spaces will be empty too) but empty spaces are also created upon consolidation of two blocks. I had to add a conditional (using "skipConsolidated" boolean) to continue the consolidation check if the blank space was created by a consolidation:

      let consolidated = false;
      let skipConsolidated = true;

      for (let i = 0; i < this.size; i++) {
        for (let j = this.size - 1; j > 0; j--) {
          if ( this.positionEmpty(i,j) && skipConsolidated ) {
            break; //breaks out of inner for loop when nothing to consolidate
          } else if (!skipConsolidated) {
            skipConsolidated  = true;
          } else {
            let nextFib = this.nextFib(this.board[i][j].value, this.board[i][j-1].value);
            if (nextFib !== -1) {
              this.board[i][j].value = nextFib;
              this.board[i][j-1].value = -1;
              skipConsolidated  = false;
              consolidated = true;
            }
          }
        }
      }

The final step of method is to recursively call itself if any consolidations occur. Thus, with one move we can achieve consolidation of 3 or more blocks in a row.

      this.renderBlocks();
      if(consolidated) {
        this.slideBlocksRight();
      } else {
        this.renderBlocks();
        setTimeout(() => {
          this.addRandomBlock();
          this.renderBlocks();
        }, 200);
      }
    }
