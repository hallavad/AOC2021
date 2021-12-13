import run from "aocrunner";

interface Input {
  dots: Map<string,Dot>
  folds: Fold[]
}

interface Dot {
  x: number
  y: number
}

interface Fold {
  axis: string 
  pos: number
}
const parseInput = (rawInput: string) => {
  const [ldots, lfolds] = rawInput.split('\n\n');
  const dots = ldots.split('\n').map(dot => {const [x,y] = dot.split(','); return {x: parseInt(x), y: parseInt(y)}})
  const dotMap = new Map();
  dots.forEach(d => dotMap.set(d.x + ',' + d.y, d))
  const folds: Fold[] = lfolds.split('\n').map(fold => {const [axis, pos] = fold.split(' ')[2].split('='); return {axis, pos: parseInt(pos)}})
  return {dots: dotMap, folds} 
};

const fold = (dots: Map<string, Dot>, fold: Fold) => {
  const ndots: Map<string, Dot> = new Map()
  dots.forEach( d => {
    if (fold.axis === 'x' && d.x > fold.pos) {
        const nx = fold.pos - Math.abs(fold.pos - d.x)
        ndots.set(nx + ',' + d.y,{x: nx, y: d.y})
    } else 
    if (fold.axis === 'y' && d.y > fold.pos) {
        const ny = fold.pos - Math.abs(fold.pos - d.y)
        ndots.set(d.x + ',' + ny, {x: d.x, y: ny})
    } else {
      ndots.set(d.x + ',' + d.y, {x: d.x, y: d.y})
    }
  })
  
  return ndots


}

const printPaper = (dots: Map<string, Dot>) => {
  let dot_string = ''
  for (let y = 0; y<6;y++) {
    for (let x = 0; x<40;x++) {
      if (dots.has(x + ',' + y)) {
        dot_string += '#'
      } else {
        dot_string += ' '
      }
    }
    dot_string += '\n'
  }
  console.log(dot_string)
}

const part1 = (rawInput: string) => {
  const {dots, folds}: Input = parseInput(rawInput);
  const ndots = fold(dots, folds[0]);
  return ndots.size
};

const part2 = (rawInput: string) => {
  let {dots, folds}: Input = parseInput(rawInput);
  folds.forEach(f =>{
    dots = fold(dots, f) 
  })

  printPaper(dots)

  return ;
};

run({
  part1: {
    tests: [
      { input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`, expected: 17 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`, expected: undefined },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
