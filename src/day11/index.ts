import run from "aocrunner";

type Input = number[][];

interface octoPos {
  inp: Input
  r: number
  c: number
}

const parseInput = (rawInput: string) => rawInput.split('\n').map(x => x.split('').map(o => parseInt(o)));


const tryFlash = (o: octoPos, first: boolean = false) => {
  if (!first && o.inp[o.r][o.c] == 0) return 0;
  if (!first) o.inp[o.r][o.c]++;
  if (o.inp[o.r][o.c] > 9) {
    o.inp[o.r][o.c] = 0
    return 1 + increase_neighbours(o)
  }
  return 0
}
const increase_neighbours = (o: octoPos) => {
  let flashed = 0;
  if (o.r != 0){ 
    flashed += tryFlash({...o, r: o.r-1});
    if (o.c != 0) {
      flashed += tryFlash({...o, r: o.r-1, c: o.c-1});
    }
    if (o.c != o.inp[0].length-1) {
      flashed += tryFlash({...o, r: o.r-1, c: o.c+1});
    }
  } 
  if (o.r != o.inp.length-1){
    flashed += tryFlash({...o, r: o.r+1});
    if (o.c != 0) {
      flashed += tryFlash({...o, r: o.r+1, c: o.c-1});
    }
    if (o.c != o.inp[0].length-1) {
      flashed += tryFlash({...o, r: o.r+1, c: o.c+1});
    }
  }
  if (o.c != 0) {
    flashed += tryFlash({...o, c: o.c-1});
  }
  if (o.c != o.inp[0].length-1) {
    flashed += tryFlash({...o, c: o.c+1});
  }

  return flashed;
}

const step = (inp: Input) => {
  let flashes = 0;
  for (let r = 0; r<inp.length; r++) {
    for (let c = 0; c<inp[0].length; c++) {
      inp[r][c]++;
    }
  }

  for (let r = 0; r<inp.length; r++) {
    for (let c = 0; c<inp[0].length; c++) {
      flashes += tryFlash({inp,r,c}, true);
    }
  }
  return flashes;
}

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);

  let acc_flashes = 0
  for (let s = 0; s<100; s++){
    
    console.log(input.map(r => r.join()))
    console.log("step")
    acc_flashes += step(input);
    console.log(acc_flashes)
  }
  console.log(input.map(r => r.join()))

  return acc_flashes;

};

const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);

  let acc_flashes = 0
  let last_acc_flashes = 0
  let steps = 0
  while (acc_flashes < last_acc_flashes+(input.length*input[0].length)){
    steps++;
    last_acc_flashes = acc_flashes 
    console.log(input.map(r => r.join()))
    console.log("step")
    acc_flashes += step(input);
    console.log(acc_flashes)
  }
  return steps;
};

run({
  part1: {
    tests: [
      { input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, expected: 1656},
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
