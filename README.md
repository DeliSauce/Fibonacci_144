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

### Options
The game offers a couple of options to give the user a slightly different gaming experience.
* Choice of the size of the game board from a 4x4 grid all the way up to 7x7.
* Choice of starting the Fibonacci sequence with a 0 or 1
  * 0: 0, 1, 1, 2, 3, 5, ...
  * 1: 1, 1, 2, 3, 5, ...