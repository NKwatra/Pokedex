/*
  Function to take raw data and return data elements in groups
  of groupSize
  (data: Array<{name: string, url: string}>, groupSize: number)
  => Array<Array<{name: string, url: string}>>
*/
export const convertToPairs = (data, groupSize) => {
  let pairs = [];
  for (let i = 0; i < data.length; ) {
    pairs.push(data.slice(i, i + groupSize));
    i = i + groupSize;
  }

  return pairs;
};
