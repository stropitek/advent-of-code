import fs from 'node:fs';

const input = fs.readFileSync('src/2022/13/13.txt', 'utf8');

const pairs = input.split('\n\n');

const pairsInOrder = pairs
  .map((value, idx) => (isInOrder(value) ? idx + 1 : null))
  .filter((value) => value !== null);
const pairsInOrderSum = pairsInOrder.reduce((acc, value) => acc + value, 0);

// eslint-disable-next-line no-console
console.log('part1', pairsInOrderSum);

const allPackets = pairs.flatMap((pair) => pair.split('\n'));
const dividers = ['[[2]]', '[[6]]'];
allPackets.push(...dividers);
allPackets.sort((a, b) => {
  return compareParsed(parse(b), parse(a));
});
const code =
  (allPackets.indexOf(dividers[0]) + 1) * (allPackets.indexOf(dividers[1]) + 1);

// eslint-disable-next-line no-console
console.log('part2', code);

function isInOrder(value) {
  const [left, right] = value.split('\n');
  const leftParsed = parse(left);
  const rightParsed = parse(right);

  return compareParsed(leftParsed, rightParsed) >= 0;
}

function parse(str) {
  return JSON.parse(str);
}

// Return 1 if correct order, 0 if equal, -1 if incorrect order
function compareParsed(left, right) {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left === right) {
      return 0;
    } else if (left < right) {
      return 1;
    } else {
      return -1;
    }
  } else if (typeof left === 'number') {
    left = [left];
  } else if (typeof right === 'number') {
    right = [right];
  }

  // Compare 2 lists
  for (let i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      return -1;
    }
    const comparison = compareParsed(left[i], right[i]);
    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}
