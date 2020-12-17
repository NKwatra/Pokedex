const LIMIT = 20;
const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/*
  function to make network request and fetch data
  (offset: number) => Promise<{results : Array<{name: string, url: string}>}>
*/
export const getPokemonData = (offset) => {
  const url = `${API_BASE_URL}?limit=${LIMIT}&offset=${offset}`;
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json().then(({results}) => results);
    } else {
      return {error: true};
    }
  });
};
