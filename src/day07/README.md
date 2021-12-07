# 🎄 Advent of Code 2021 - day 7 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/7)

## Notes

Today I got screwed by javascript, apparently javascripts builtin sort function for arrays sorts in alphabetical order by default, even when you give it an array of numbers. Which i didn't expect, and quite frankly seems stupid. It also worked fine on the test case making it harder to find the error. 

In the end I'm happy with the final solution of part 1 that looks for the median which immediately gives the smallest fuel cost instead of iterating through all the possible fuel costs. For part 2 I feel like there might be a better solution where we can somehow work out where "correct median" would be. The only difference between part 1 and 2 is the cost to take a step, however since the cost for a crab doesn't change with a constant as in part 1 I havent been able to deduce a way to do it. So I'll leave it at the solution I have for now. 
