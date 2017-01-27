# Fibonacci 144 (inspired by 2048)
[Website][website]
[website]: http://www.example.com

### Game Play
This game start with a board that is 5x5 tiles. At the outset, two of the tiles will contain blocks with the first number in the Fibonacci sequence (either 0 or 1 depending on player selection). The player can choose one of the four directions (up, down, left, right) to slide the blocks. The blocks will slide as far as possible in that direction and will stop only upon coming in contact with the edge of the board or another block. If the act of sliding causes two sequential Fibonacci numbers to collide, they will reduce to one block with the next value in the sequence. After each turn a new block will be randomly added to the board.

#### Objective
The objective of the game is to get to the number 144 before the board fills up with blocks.

#### Fibonacci Sequence
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...

[Fibonacci (wikipedia)][Fibonacci-wiki]
[Fibonacci-wiki]: https://en.wikipedia.org/wiki/Fibonacci_number



## Minimum Viable Product

- [ ] Allow player to choose starting Fibonacci sequence (either [0,1] or [1,1])
- [ ] Allow player to choose size of the board
- [ ] Game displays board with 2 blocks randomly positioned
- [ ] Correctly sequenced blocks will reduce to one block upon collision and display next value in Fibonacci sequence
- [ ] Block movement using canvas.
- [ ] BONUS: mobile compatibility


![wireframes](docs/wireframe.png)

## Design Docs
### Classes


This project will be implemented with the following technologies:

JavaScript for game logic.
Canvas for jQuery for DOM rendering.
Webpack to bundle and serve up the various scripts.

game.js: will handle the logic of the the game.



## Implementation Timeline

### Phase 1: Setup (~0.5 day)
Set up project files (webpack, npm) and create entry html page with board and selectors for size and starting number.

### Phase 2: Logic (~1 day)
Design game logic.

### Phase 3: Animation (~0.5 day)
Design canvas (block placement, block minimizing, etc.)


### Bonus Features
- Mobile compatibility (enable swiping instead of arrow keys)
