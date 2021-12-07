import run from "aocrunner";

type Input = number[];

const parseInput = (rawInput: string) => rawInput.split(',').map(x => parseInt(x));

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);

  input.sort((a,b) => a - b) //The fact that JS does not sort numbers correctly by default is STUPID! Who needs an alphabetically sorted array of numbers :angry: 
  
  const mid = input.length / 2 ;
  let median = input.length % 2 == 0 ?  (input[mid] + input[mid-1])/2 : input[Math.floor(mid)];
  const minimum_fuel = input.reduce((p, v) => {return p + Math.abs(median - v);}, 0)

  return minimum_fuel
};
const fuel_cost=(num: number) => {
  if (num == 0) return 0;
  let res = 0
  for (let i = 1; i <= num; i++)
    res += i;
  return res;
}


const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  input.sort()
  
  const min_pos = input[0]
  const max_pos = input[input.length-1]
  
  let minimum_fuel = input.reduce((p, v) => {return p + fuel_cost(Math.abs(min_pos - v));}, 0)
  for(let pos = min_pos; pos<=max_pos; pos++){
    const fuel = input.reduce((p, v) => {return p + fuel_cost(Math.abs(pos - v));}, 0)
    if (fuel < minimum_fuel) {
      minimum_fuel = fuel
    } else if ( fuel > minimum_fuel ) break;
  }
  return minimum_fuel;
};

run({
  part1: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
