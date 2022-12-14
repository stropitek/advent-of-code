import fs from 'node:fs';

const input = fs.readFileSync('src/2022/08.txt', 'utf8');

function parseInput(input) {
  return input.split('\n').map((line) => line.split('').map(Number));
}

function transpose(matrix) {
  const transposed = [];
  for (let i = 0; i < matrix[0].length; i++) {
    transposed.push([]);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
}

function findHidden(arr) {
  let max = -1;
  return arr.map((el) => {
    if (el > max) {
      max = el;
      return true;
    }
    return false;
  });
}

function treeHouseScore(height, arr) {
  let score = 1;

  for (let treeHeight of arr) {
    if (treeHeight < height) {
      score++;
    } else {
      return score;
    }
  }
  return score - 1;
}

function findHiddenReversed(arr) {
  const reversed = arr.slice().reverse();
  return findHidden(reversed).reverse();
}

const matrix = parseInput(input);
const transposedMatrix = transpose(matrix);
const fromLeft = matrix.map(findHidden);
const fromRight = matrix.map(findHiddenReversed);
// const fromRight = matrix.map((el) => findHidden(el.reverse())).reverse();
const fromTop = transpose(transposedMatrix.map(findHidden));
const fromBottom = transpose(transposedMatrix.map(findHiddenReversed));

const result = new Set();
let highestScore = 0;
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (
      fromLeft[i][j] ||
      fromRight[i][j] ||
      fromTop[i][j] ||
      fromBottom[i][j]
    ) {
      result.add(`${i},${j}`);
    }

    const scoreRight = treeHouseScore(matrix[i][j], matrix[i].slice(j + 1));
    const scoreLeft = treeHouseScore(
      matrix[i][j],
      matrix[i].slice(0, j).reverse(),
    );
    const scoreDown = treeHouseScore(
      matrix[i][j],
      transposedMatrix[j].slice(i + 1),
    );
    const scoreTop = treeHouseScore(
      matrix[i][j],
      transposedMatrix[j].slice(0, i).reverse(),
    );
    const score = scoreLeft * scoreRight * scoreDown * scoreTop;
    if (score > highestScore) {
      highestScore = score;
    }
  }
}

const visibleTrees = Array.from(result).length;
console.log('part 1', visibleTrees);
console.log('part 2', highestScore);
