import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput);

  let res = [0,0,0,0,0,0,0,0,0,0,0,0]  
  
  for (var i = 0; i<input.length; i++){
    for (var j = 0; j< input[j].length; j++ ){
        res[j] += parseInt(input[i][j]);
    }
  }
  
  let gamma = ''
  let epsilon = ''
   
  for (var i = 0; i<res.length; i++){
    if (res[i] < input.length/2) {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }

  }

  
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  var oxy = input 
  for (var j = 0; j<12; j++ ){
    var resj = 0;
    for (var i = 0; i<oxy.length; i++){
       resj += parseInt(oxy[i][j]);
    }
    if (oxy.length - resj <= resj) {
      oxy = oxy.filter(x => x[j] == '1')
    } else {
      oxy = oxy.filter(x => x[j] == '0')
    }
    if (oxy.length == 1) break;
  }
  
  var co = input 
  for (var j = 0; j<12; j++ ){
    var resj = 0;
    for (var i = 0; i<co.length; i++){
       resj += parseInt(co[i][j]);
    }
    if (co.length - resj <= resj) {
      co = co.filter(x => x[j] == '0')
    } else {
      co = co.filter(x => x[j] == '1')
    }
    if (co.length == 1) break;
  }

  return parseInt(oxy[0], 2) * parseInt(co[0], 2);
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 230 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
