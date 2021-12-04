import run from "aocrunner";

const parseInput = (rawInput: string) => {
  let first_split = rawInput.split('\n\n')
  
  let numbers = first_split[0].split(',').map(x => parseInt(x));
  let boards = first_split.slice(1, first_split.length).map(board => ({won: false, board: board.split('\n').map(row => row.split(' ').filter(e => e.length > 0).map(x => ({checked: false, number: parseInt(x)})))}));
  return { numbers, boards }
  }

interface Board_position {
  checked: boolean,
  number: number
}

interface Board {
  won: boolean,
  board: Board_position[][],
}

interface Input {
  numbers: number[],
  boards: Board[],
}

const runBingo = (input: Input, winCondition: (boards: Board[]) => boolean) => {
  for (const number of input.numbers) {
    for (const board_meta of input.boards) {
      let board = board_meta.board
      let sum = 0;
      for (const row of board) {
        let checked_in_row = 0;
        for (const board_pos of row) {
          if (number == board_pos.number) {
            board_pos.checked = true; 
          }
          if (board_pos.checked) checked_in_row += 1; 
          else sum += board_pos.number;
        }

         if (checked_in_row == 5) board_meta.won = true;
      }

      //check columns
      for (let i = 0; i<5; i++){
        let checked_in_column = 0 
         for (const row of board) {
            if (row[i].checked) checked_in_column += 1;
         }
         if (checked_in_column == 5) {
           board_meta.won = true;
           break
         }
         if (board_meta.won) break;
      }
      
      if (winCondition(input.boards)) {
        return sum * number;
      }
    }
    

  }
};

const part1 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  
  const winCondition = (boards: Board[]) => boards.some(board => board.won);

  return runBingo(input, winCondition);
};


const part2 = (rawInput: string) => {
  const input: Input = parseInput(rawInput);
  
  const winCondition = (boards: Board[]) => boards.every(board => board.won);

  return runBingo(input, winCondition);
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
      { input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`, expected: 1924 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
