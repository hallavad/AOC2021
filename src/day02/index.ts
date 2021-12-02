import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(x => x.split(' '));

const part1 = (rawInput: string) => {
  const input: [[string]] = parseInput(rawInput);
  
  const init = {'f': 0, 'd': 0};

  const res = input.reduce((p, x) => {
    if (x[0] == 'forward') {
      p.f += parseInt(x[1])
    } else if (x[0] == 'down') {
      p.d += parseInt(x[1])
    } else {
      p.d -= parseInt(x[1])
    }
    return p;
  }, init)

  return res.f * res.d;
}

const part2 = (rawInput: string) => {
  const input: [[string]] = parseInput(rawInput);
  
  const init = {'f': 0, 'd': 0, 'a': 0};

  const res = input.reduce((p, x) => {
    if (x[0] == 'forward') {
      p.f += parseInt(x[1])
      p.d += parseInt(x[1]) * p.a
    } else if (x[0] == 'down') {
      p.a += parseInt(x[1])
    } else {
      p.a -= parseInt(x[1])
    }
    return p;
  }, init)

  return res.f * res.d;
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
