# 🎄 Advent of Code 2021 - day 4 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/4)

## Notes

The input parsing was a lot more complex today which means that there are more ways to build up the datastructure. I didn't have a problem parsing the data correctly however on part 2 I got stuck on how to find the last victory one. My first attempt removed all boards that had already won. However since this changes the indexes not all boards were properly checked for all numbers. In the I therefor modified the datastructure parseInput creates to add a flag for each board indicating whether or not that board had been won which yielded the right answer.

I think it highlights the importance of a good datastructure and the help it can give to the overall solution. After adding the flag I updated part 1 to utilize it and realized that part2 could simply be solved by changing the return condition from when the first victory is detected to when all of them have been detected. 
