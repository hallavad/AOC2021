# 🎄 Advent of Code 2021 - day 6 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/6)

## Notes

Very happy with todays solution. My first thought was to track each individual fish however since the only parameter we're interested in is how many days there are until a new one is born we can instead look at how many fish we have that has 8 days until they give birth, 7 days, 6 days, and so on. This gives us a complexity of O(1) instead of O(n) where n is the number of fish in the case that we track each fish. Given the exponential growth rate and that part 2 asks for the number of fishes after 256 days, O(n) is a too high complexity to finish quickly.

The key take away is once again the importance of parsing the input in to a good data structure. Since it is the data structure that allows for the much more efficient solution.
