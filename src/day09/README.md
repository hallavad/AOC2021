# 🎄 Advent of Code 2021 - day 9 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/9)

## Notes

Today's challenge was the first where I had to iterate over a 2D array to get the results making the problem a bit harder to break down and implement a solution for.  

My solution for part 1 looks at each points neighbours individually. It could probably be solved by doing a pass over and calculating the derivative of each point instead of looking at all neighbours, however it could also be the case that it's a more expensive calculation than just looking at the neighbours of each position, making it a worse solution. 

The solution to part 2 I'm happy with. It utilizes the "bottoms" calculated in part 1 and does a BFS from there, making sure we don't look at unnecessary squares. There are of course room for improvement but I can't (at least not at a glance) see a way to lower the complexity.

