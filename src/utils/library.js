import {MARGIN} from '../components/PokeCard';
import {LINEAR_ITEM_HEIGHT} from '../components/PokeListItem';
import {getPokemonData} from './network';

/*
  Function to take raw data and return data elements in groups
  of groupSize
  (data: Array<{name: string, url: string}>, groupSize: number)
  => Array<Array<{name: string, url: string}>>
*/
const convertToPairs = (data, groupSize) => {
  let pairs = [];
  for (let i = 0; i < data.length; ) {
    pairs.push(data.slice(i, i + groupSize));
    i = i + groupSize;
  }

  return pairs;
};

/*
    function to calculate offset where list should scroll to
    when user switches view, so as to stay at the
    same position (i.e. same pokemon)
  */
export const getNewScrollPosition = (
  currentScrollPosition,
  isCompact,
  window,
) => {
  /*
    calculate index for current list item, based on fixed size
    of list items in respective views
  */
  let index;
  if (!isCompact) {
    index = Math.floor(
      (currentScrollPosition.current * 3) / (window.height - 4 * MARGIN),
    );
    return index * LINEAR_ITEM_HEIGHT;
  } else {
    index = Math.floor(currentScrollPosition.current / LINEAR_ITEM_HEIGHT);
    return (index * (window.height - 4 * MARGIN)) / 3;
  }
};

/*
  Function to load pokemon data for a given offset
  offset: number
*/
export const loadPokemonData = (offset) => {
  return getPokemonData(offset).then((results) => {
    if (results.error) {
      return results;
    } else {
      return convertToPairs(results, 2);
    }
  });
};
