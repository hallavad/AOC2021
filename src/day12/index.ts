import run from "aocrunner";

type Input = Path[]

interface Path{
  start: Cave
  end: Cave 
  prev: Cave[]
}

interface Cave {
  isBig: boolean
  name: string
}

const parseInput = (rawInput: string) => { 
  const paths: Path[] = [];
  rawInput.split('\n').forEach(p => {
    const [s,e] = p.split('-').map(c => ({isBig: c.length > 0 ? (c[0].toUpperCase() == c[0]) : false, name: c}));
    if (e === undefined) return

    paths.push({start: s, end: e, prev: []})
    paths.push({start: e, end: s, prev: []})
  })
  return paths
};

const part1 = (rawInput: string) => {
  const paths: Input = parseInput(rawInput);
  
  let sum = 0
  let stack: Path[] = [] 

  paths.filter(p => p.start.name == "start").forEach(p => stack.push({...p, prev: [ { isBig: false, name: "start" } ]}))
  
  while (stack.length > 0) {
    const path: Path | undefined = stack.shift()
    if (path === undefined) continue;

    if (path.end.name == "end") {
      sum++;
      continue;
    }

    path.prev.push(path.end)

    paths
      .filter(p => p.start.name === path.end.name  //Filter away all paths that doesnt start where current end
                && path.prev.every(c => c.isBig || c.name !== p.end.name) //and so that a small cave isn't visited twice
             )
      .forEach(p => stack.push({...p, prev: Object.values(Object.assign({}, path.prev))}))
  }
  return sum;
};

const part2 = (rawInput: string) => {
  const paths: Input = parseInput(rawInput);

  let sum = 0
  let stack: Path[] = [] 

  paths.filter(p => p.start.name == "start").forEach(p => stack.push({...p, prev: [ { isBig: false, name: "start" } ]}))

  while (stack.length > 0) {
    const path: Path | undefined = stack.shift()
    if (path === undefined) continue;

    if (path.end.name == "end") {
      sum++; 
      continue;
    }

    path.prev.push(path.end)
    const prev_small_caves = path.prev.filter(prev => !prev.isBig)

    paths
      .filter(p => p.start.name === path.end.name  //Filter away all paths that doesnt start where current end
                && (prev_small_caves.every(c => c.name !== p.end.name) //and so that small cave isn't visited twice
                    || ((new Set(prev_small_caves.map(c => c.name))).size === prev_small_caves.length // except for 1 small cave
                        && p.end.name != "start" // which is not the "start" cave
                        && p.end.name != "end"   // nor the "end" cave
                       )
                  )
             )
      .forEach(p => stack.push({...p, prev: Object.values(Object.assign({}, path.prev))})) // forEach valid path add it to stack
  }
  return sum;
};

run({
  part1: {
    tests: [
      { input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`, expected: 10 },
    { input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, expected: 19 }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`, expected: 36 },
    { input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, expected: 103 }
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
