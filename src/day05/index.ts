import run from "aocrunner";

interface Line {
  start: Point,
  end: Point,
}

interface Point {
  x: number,
  y: number,
}

interface Floor {
  floor: Map<string, number>,
}

class Floor {
  constructor() {
    this.floor = new Map<string, number>();
  }

  addPoint(p: Point) {
    const p_str = JSON.stringify(p);
    const current = this.floor.get(p_str);

    if (current != undefined) {
      this.floor.set(p_str, current + 1);
    } else {
      this.floor.set(p_str, 1);
    }
  }

  addLine(l: Line) {
    let x = l.start.x;
    let y = l.start.y;
    this.addPoint({x, y})

    while( x != l.end.x || y != l.end.y ) {
      if (x > l.end.x) x--;
      if (x < l.end.x) x++;

      if (y > l.end.y) y--;
      if (y < l.end.y) y++;
      
      this.addPoint({x, y})
    }
  }

  getOverlapping() {
    let res = 0 
    this.floor.forEach((val) => {if (val > 1) res += 1})
    return res
  }
}

type Input = Line[];

const parseInput = (rawInput: string) => rawInput.split('\n').map(row => {
    const extremities = row.split(' -> ');
    const startarr = extremities[0].split(',').map((x: string ) => parseInt(x));
    const endarr = extremities[1].split(',').map((x: string) => parseInt(x));

    return {start: {x:startarr[0], y: startarr[1]}, end: {x: endarr[0], y: endarr[1]}} 
});

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);

  let floor = new Floor(); 

  input.forEach(line => {
    if (line.start.x == line.end.x || line.start.y == line.end.y) { // ignore diagonals
      floor.addLine(line)
    }
  })

  let res = 0 
  floor.floor.forEach((val, key) => {
    if (val > 1) res += 1;
    
  })
  return res;

};

const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  
  let floor = new Floor(); 

  
  input.forEach(line => floor.addLine(line))

  let res = 0 
  floor.floor.forEach((val, key) => {
    if (val > 1) res += 1;
  })
  return res;
 
  return;
};

run({
  part1: {
    tests: [
      { input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, expected: 12 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
