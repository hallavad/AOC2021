import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => parseInt(x));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  var deeper = 0;

  for (var i = 0; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
      deeper += 1;
    }
  }

  return deeper;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  var deeper = 0;

  for (var i = 0; i < input.length - 3; i++) {
    const slide1 = input[i] + input[i + 1] + input[i + 2];
    const slide2 = input[i + 1] + input[i + 2] + input[i + 3];

    if (slide1 < slide2) {
      deeper++;
    }
  }

  return deeper;
};

run({
  part1: {
    tests: [
      {
        input: `199
200
208
210
200
207
240
269
260
263`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199
200
208
210
200
207
240
269
260
263`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
