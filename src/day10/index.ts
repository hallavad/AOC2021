import run from "aocrunner";

type Input = string[][];

interface Points {[key: string]: number}
interface Pairs {[key: string]: string}
interface RowRes {
  openChunks: string[]
  corruptedCloser: string
}


const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.split(''));

const parseRow = (row: string[]) => {
  const res: RowRes = {openChunks: [], corruptedCloser: ""}

  const openers = ['(','[','{','<']
  const closers = [')',']','}','>']
  const pairs: Pairs = {")": "(", "]": "[", "}": "{", ">": "<"}

  for (let i = 0; i< row.length; i++) {
    if (openers.includes(row[i])) {
      res.openChunks.push(row[i])
    } else if (closers.includes(row[i])){
      const last_opener = res.openChunks.pop()
      if (pairs[row[i]] != last_opener) {
        res.corruptedCloser = row[i]
      }
    }
  }
  return res;
}

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  const points: Points = {")": 3, "]": 57, "}": 1197, ">": 25137}

  const line_points: number[] = input.map(r => {
    const resrow = parseRow(r)
    if (resrow.corruptedCloser == "") return 0;
    else return points[resrow.corruptedCloser]
  })
  return line_points.reduce((p,v) => p+v, 0);
};

const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  const points: Points = {"(": 1, "[": 2, "{": 3, "<": 4}

  const line_points: number[] = input.map(r => {
    const resrow = parseRow(r)
    if (resrow.corruptedCloser == "") {
      const res_points = resrow.openChunks.map(v => points[v])
      return res_points.reverse().reduce((p,v) => p*5+v, 0)
    } else return 0;
  })

  const valid = line_points.filter(v => v != 0).sort((a,b) => a-b)
  return valid[valid.length/2-0.5];
};

run({
  part1: {
    tests: [
      { input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`, expected: 26397 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`, expected: 288957 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
