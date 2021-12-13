# 🎄 Advent of Code 2021 - day 13 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/13)

## Notes

  Testing the output when the output is not trivial to test can give some unexpected bugs. Since part 1 only folded one way I had a bug which i realized when doing part 2 that made the y-axis fail on folding while the x axis worked fine. So without proper testing of the output it was hard to realize if it was correct or not. I solved the testing by just printing the paper and looking at it. But automated testing was outside the scope. Once that bug was found the solution could be seen from printing the paper.
  
A more proper way to test the output and give a proper value as output instead of printing would be to create the different characters that could be represented on the paper and parse those in to actual characters and through that make it possible to do automated testing and get the result as a simple string.
