import run from "aocrunner";

type Input = number[][];

interface Coord{
  r: number
  c: number
}

const parseInput = (rawInput: string) => rawInput.split('\n').map(r => r.split('').map(p => parseInt(p)));

const getBottoms = (input: Input) => {
  const bottoms = [];
  for (let r = 0; r < input.length; r++){
    for (let c = 0;  c < input[0].length; c++){
      const depth = input[r][c];
      if ((r == 0 || depth < input[r-1][c]) 
       && (c == 0 || depth < input[r][c-1]) 
       && (r == input.length-1 || depth < input[r+1][c]) 
       && (c == input[0].length-1 || depth < input[r][c+1])) {
         bottoms.push({r, c})
       }
    }
  }
  return bottoms
}
const getDepth = (pos: Coord, input: number[][]) => {
  return input[pos.r][pos.c];

}

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  
  return getBottoms(input).map(pos => getDepth(pos, input)).reduce((p,v) => p+v+1, 0);
};

const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  
  const bottoms: Coord[] = getBottoms(input);

  const basins = bottoms.map(b => {
    // run BFS search until queue is empty
    // The lowest position that has a non explored neighbour thats lower is used as rim_height
    // and only the values smaller than the rim is counted towards the size
    const queue: Coord[] = [b]
    const explored = [b];
    let rim_height = 0;

    while (queue.length > 0) {
      const pos: Coord | undefined = queue.shift()
      if (pos === undefined) break;
      const neighbours = []

      if(pos.r < input.length-1)   
        neighbours.push({...pos, r: pos.r + 1})
      if(pos.c < input[0].length-1)
        neighbours.push({...pos, c: pos.c + 1})
      if(pos.r > 0)
        neighbours.push({...pos, r: pos.r - 1})
      if(pos.c > 0)
        neighbours.push({...pos, c: pos.c - 1})

      neighbours.forEach(n => {
        if(getDepth(n, input) >= getDepth(pos, input)) {
          if (!explored.some(e => e.r == n.r && e.c == n.c)){
            queue.push(n); 
            explored.push(n);
          }
        else rim_height = getDepth(pos, input)
        }
      })
    }
    return explored.map(p => getDepth(p, input)).filter(d => d < rim_height).length

  }) 

  basins.sort((a,b) => b-a);
  return basins.slice(0,3).reduce((p, c) => p*c,1)
};

run({
  part1: {
    tests: [
      { input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 15 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `2199943210
3987894921
9856789892
8767896789
9899965678`, expected: 1134 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
