# 🎄 Advent of Code 2021 - day 5 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/5)

## Notes

Even tough it took longer than I might have wanted I'm happy with the resulting code. Especially my solution to adding a whole ine, that only uses one loop instead of my original thought which would've required 4 in part1 and 8 in part2. I also realized after handing in part 1 and working on part 2 that part 1 is just a special case of part 2 in which we ignore the diagonals. This meant that the algorithms could be almost identical, except for filtering out diagonals. Since they are almost identical I created an object (Floor) to simplyfy the code and handle the logic around lines and getting the result.
