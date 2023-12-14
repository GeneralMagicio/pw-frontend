import Matrix, { EigenvalueDecomposition } from 'ml-matrix';

export const generateZeroMatrix = (n: number): number[][] => {
  const matrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

const validateVotesMatrix = (votesMatrix: number[][]) => {
  for (let i = 0; i < votesMatrix.length; i++) {
    for (let j = 0; j < votesMatrix[i].length; j++) {
      const cell = votesMatrix[i][j];
      // values should be either 0 or 1
      if (![0, 1].includes(cell))
        throw Error('Invalid value for a pairwise vote');
      // diagnoals should be zero
      if (i === j) {
        if (cell !== 0)
          throw new Error("You can't compare a project with itself");
      }
      // You can't prefer project A to B and then again B to A
      if (cell + votesMatrix[j][i] > 1)
        throw new Error(`Invalid value at ${i},${j} and ${j},${i}`);
    }
    if (votesMatrix[i].length !== votesMatrix.length)
      throw new Error('Matrix is not square');
  }
  return true;
};

export const sortProjectId = (
  project1Id: number,
  project2Id: number,
): [number, number] => {
  return project1Id > project2Id
    ? [project2Id, project1Id]
    : [project1Id, project2Id];
};


const toFixedNumber = (num: number, digits: number) => {
  const pow = Math.pow(10, digits);
  return Math.round(num * pow) / pow;
};

const isRankingUseful = (ranking: number[]) => {
  const numOfZeros = ranking.filter(
    (score) => toFixedNumber(score, 3) <= 0.001,
  ).length;

  if (numOfZeros > 0) return false;

  const sortedRanking = [...ranking].sort();

  let median = sortedRanking[Math.floor(sortedRanking.length / 2)];
  if (sortedRanking.length % 2 === 0) {
    median =
      (median + sortedRanking[Math.floor(sortedRanking.length / 2) - 1]) / 2;
  }
  const max = sortedRanking[sortedRanking.length - 1];

  if (max / median > 5) return false;

  return true;
};

function cloneArray<T extends unknown[]>(a: T): T {
  const array = a.map((e) => (Array.isArray(e) ? cloneArray(e) : e)) as T;

  return array;
}

export const getRankingForSetOfDampingFactors = (input: number[][]) => {
  const dampingFactors = [
    1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35,
    0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0,
  ];
  let isUseful = false;
  let i = 0;
  let ranking: number[] = [];
  while (!isUseful && i < dampingFactors.length) {
    try {
      ranking = calculateCollectionRanking(input, dampingFactors[i]);
      isUseful = isRankingUseful(ranking);
    } catch (e) {
      console.error(e);
    } finally {
      i += 1;
    }
  }

  if (!ranking) {
    console.error('No useful ranking available for this vote matrix');
  }

  return ranking;
};

const validate = (input: { share: number }[]) => {
  const sum = input.reduce((acc, curr) => (acc += curr.share), 0);

  if (sum === 1) return true;

  return false;
};

export function makeIt100<T extends { share: number }>(input: T[]) {
  let result = [...input];

  let breakLimit = 0;
  while (!validate(result) && breakLimit < 100) {
    const sum = result.reduce((acc, curr) => (acc += curr.share), 0);

    const temp = result.map((item) => ({
      ...item,
      share: (item.share * 1) / sum,
    }));

    result = temp.map((item) => ({
      ...item,
      share: toFixedNumber(item.share, 6),
    }));

    breakLimit++;
  }

  return result;
}

const calculateCollectionRanking = (
  input: number[][],
  dampingFactor = 1,
) => {
  let votesMatrix: any = cloneArray(input);

  validateVotesMatrix(votesMatrix);

  const length = votesMatrix.length;

  // Set the diagnoals to the sum of the rows

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let j = 0; j < length; j++) {
      const cell = votesMatrix[i][j];
      sum += cell;
    }
    votesMatrix[i][i] = sum;
  }

  // Divide each column's items by the sum of the column's items

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let j = 0; j < length; j++) {
      const cell = votesMatrix[j][i];
      sum += cell;
    }
    for (let j = 0; j < length; j++) {
      if (sum !== 0) votesMatrix[j][i] = votesMatrix[j][i] / sum;
      else votesMatrix[j][i] = 0;
    }
  }

  votesMatrix = new Matrix(votesMatrix);

  // add a damping factor
  const dampingMatrix = new Matrix(
    Array(length).fill(Array(length).fill((1 - dampingFactor) / length)),
  );

  votesMatrix = dampingMatrix.add(votesMatrix.mul(dampingFactor));

  const e = new EigenvalueDecomposition(votesMatrix);
  const values = e.realEigenvalues;
  // const imaginary = e.imaginaryEigenvalues;
  const vectors = e.eigenvectorMatrix;

  const index = findEigenvalueOfOne(values);

  const filtered = vectors.getColumn(index);

  // Divide by the smallest component
  return divideBySum(divideBySmallest(filtered));
};

const findEigenvalueOfOne = (eigenvalues: number[]) =>
  eigenvalues.findIndex(
    (item) => Math.abs(toFixedNumber(1 - toFixedNumber(item, 3), 3)) <= 0.001,
  );

const divideBySmallest = (numbers: number[]): number[] => {
  let min = Math.abs(numbers[0]);

  for (let i = 1; i < numbers.length; i++) {
    min = Math.min(min, Math.abs(numbers[i]));
  }

  const result: number[] = [];

  if (min === 0) return numbers;

  for (const num of numbers) {
    result.push(num / min);
  }

  return result;
};

const divideBySum = (numbers: number[]) => {
  const sum = numbers.reduce((acc, curr) => (acc += curr), 0);

  return numbers.map((item) => toFixedNumber(item / sum, 2));
};

export const getRankingStorageKey = (listId: string, address: string) => {
  return `${listId.slice(0, 8)}-${address.slice(0, 8)}-Ranking`
}