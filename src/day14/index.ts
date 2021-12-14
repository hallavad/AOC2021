import run from "aocrunner";

interface Input {
  polymer: string
  rules: Rule[]
};

interface Rule {
  inp: string
  out: string
}

const parseInput = (rawInput: string) => {
  const [polymer, arules] = rawInput.split('\n\n');
  
  const rules = arules.split('\n').map(rule => {
    const [inp, out] = rule.split(' -> '); 
    return {inp, out};
  })
   
  return {polymer, rules}

};

const setOrIncrease = (m: Map<string,number>, k: string, v: number) => {
    if (m.has(k)){
      m.set(k, m.get(k) + v)
    } else {
      m.set(k, v)
    }
}

const countChars = (polymer: string, rules: Rule[], max_steps: number) => {
  let pairsCount: Map<string,number> = new Map();
  
  for (let i = 0; i<polymer.length-1; i++){
    const pair = polymer.slice(i,i+2)
    setOrIncrease(pairsCount, pair, 1)
  }
  
  for (let steps = 0; steps<max_steps; steps++){
    let newPairsCount = new Map();
    
    rules.forEach(rule => {
      if (pairsCount.has(rule.inp)) {
        setOrIncrease(newPairsCount, rule.inp[0]+rule.out, pairsCount.get(rule.inp))
        setOrIncrease(newPairsCount, rule.out+rule.inp[1], pairsCount.get(rule.inp))
      }
    })
    pairsCount = newPairsCount
  }
  const charCount: Map<string,number> = new Map([[polymer[polymer.length-1], 1]]);

  [...pairsCount.entries()].forEach(e => { 
    setOrIncrease(charCount, e[0][0], e[1])
  })
  
  return (Math.max(...charCount.values()) - Math.min(...charCount.values()))
};

const part1 = (rawInput: string) => {
  let {polymer, rules}: Input = parseInput(rawInput);

  return countChars(polymer, rules, 10)

};

const part2 = (rawInput: string) => {
  let {polymer, rules}: Input = parseInput(rawInput);

  return countChars(polymer, rules, 40)

};

run({
  part1: {
    tests: [
      { input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`, expected: 1588 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`, expected: 2188189693529 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
