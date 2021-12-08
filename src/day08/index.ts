import run from "aocrunner";

interface Display {
  inp: string[]
  out: string[]
}

interface inWires {
  [key: string]: number 
}

interface inWiresNumber {
  [key: number]: string 
}

type Input = Display[]


const parseInput = (rawInput: string) => rawInput.split('\n').map(d => {
  const sd = d.split(' | ')
  const inputs = sd[0].split(' ')
  const outputs = sd[1].split(' ')
  return {inp: inputs, out: outputs}
});

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);

  // Valid lengths
  const vlen = [2,3,4,7]

  let sum = 0

  input.forEach(d => {
    d.out.forEach(out => {
      if (vlen.includes(out.length)) sum+=1;
    })
  })

  return sum;
};

const sortStr = (str: string) => {
  return Array.from(str).sort().join('');
}

const myIncludes = (str: string, included: string) => {
  let includes = true;
  Array.from(included).forEach(c => {
    if(!str.includes(c)) includes = false;
  })
  return includes 
}

const byLengthKindOf = (a: string, b: string) => {
  const al = a.length
  const bl = b.length
  // negative -> b after a
  if ( al == 5 ) return 1;
  else if ( bl == 5 ) return -1;
  else if ( al == 7 && bl == 6 ) return -1;
  else return al - bl;
}

const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);

  let sum = 0

  input.forEach(d => {
    const patterns: inWires = {} // the valid patterns that the output can provide
    const numbers: inWiresNumber = {} //wire combinations for numbers used in later parsing

    d.inp.sort(byLengthKindOf) //sorts the input wires in required length order for parsing
    d.inp.forEach(inp => {
        const sortedWires = sortStr(inp);
      if (inp.length == 2) {patterns[sortedWires] = 1; numbers[1]  = sortedWires}
      else if (inp.length == 3) {patterns[sortedWires] = 7; numbers[7]  = sortedWires}
      else if (inp.length == 4) {patterns[sortedWires] = 4; numbers[4]  = sortedWires}
      else if (inp.length == 7) {patterns[sortedWires] = 8; numbers[8]  = sortedWires}
      else if (inp.length == 6) {
        if (!myIncludes(sortedWires, numbers[1])) { patterns[sortedWires] = 6; numbers[6] = sortedWires}
        else if (myIncludes(sortedWires, numbers[4])) { patterns[sortedWires] = 9; numbers[9] = sortedWires}
        else { patterns[sortedWires] = 0; numbers[0] = sortedWires }
      }
      else if (inp.length == 5) {
        if(myIncludes(sortedWires, numbers[1])) {patterns[sortedWires] = 3; numbers[3] = sortedWires}
        else if (myIncludes(numbers[6], sortedWires)) {patterns[sortedWires] = 5; numbers[5] =sortedWires}
        else {patterns[sortedWires] = 2; numbers[2] =sortedWires}
      }

    })


    let outputnumber: string = ""
    d.out.forEach(out => {
      const wires: string = Array.from(out).sort().join('');
      outputnumber += patterns[wires];
    })
    sum += parseInt(outputnumber)
  })


  return sum;
};

run({
  part1: {
    tests: [
      { input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagcej`, expected: 26 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
