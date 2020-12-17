export const convertToPairs = (data, groupSize) => {
  let pairs = [];
  for (let i = 0; i < data.length; ) {
    pairs.push(data.slice(i, i + groupSize));
    i = i + groupSize;
  }

  return pairs;
};
