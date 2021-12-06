import run from "aocrunner";

type Input = number[];

const parseInput = (rawInput: string) => {
  const fishList: number[] = [0,0,0,0,0,0,0,0,0]
  rawInput.split(',').forEach(f => fishList[8-parseInt(f)] += 1);
  return fishList;
};

const ageFish = (fishList: number[], days: number) => {
  for (let i = 0; i<days; i++) {
    const newBorn = fishList.pop() || 0;
    fishList.unshift(newBorn);
    fishList[2] += newBorn;
  }
  return fishList;
}

const part1 = (rawInput: string) => {
  const fishList: Input = parseInput(rawInput);
  
  return ageFish(fishList, 80).reduce((p,c) => p+c);
  
};

const part2 = (rawInput: string) => {
  const fishList: Input = parseInput(rawInput);
  
  return ageFish(fishList, 256).reduce((p,c) => p+c);
};

run({
  part1: {
    tests: [
      { input: `3,4,3,1,2`, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
//      { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
