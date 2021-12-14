# 🎄 Advent of Code 2021 - day 14 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/14)

## Notes

My first solution for part 1 was not good enough to complete part 2 so had to do a full rewrite in order for it to work. That first solution looked at each character in the list and checked all rules against it. Which means the complexity was dependent on the length of the polymer which increases by roughly 1.5x each step. And the final string would be approximately 11000000 times as big after 40 steps resulting in problems both with time and memory usage.

To remove this problem I needed to remove the dependency on the length of the string. My final solution therefor counts all the pairs in the string and works on all equal pairs at the same time. Giving a complexity dependent on the number of rules which is constant instead of the length of the string, hence a solutioin that's A LOT faster
