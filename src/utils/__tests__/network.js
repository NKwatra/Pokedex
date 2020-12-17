import {getPokemonData} from '../network';

beforeAll(() => {
  global.fetch = jest.fn();
});

test('given an offset, when getPokemonData is called and api returns data, getPokemonData returns the right data', () => {
  // Arrange
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20';
  const data = [
    {name: 'A', url: 'abc'},
    {name: 'B', url: 'bcd'},
    {name: 'C', url: 'cde'},
    {name: 'D', url: 'def'},
    {name: 'E', url: 'efg'},
    {name: 'F', url: 'fgh'},
  ];
  const response = {
    ok: true,
    json: () => Promise.resolve(data),
  };

  global.fetch.mockImplementationOnce((mockUrl) => Promise.resolve(response));

  // Assert
  expect(getPokemonData(20)).resolves.toEqual(data);
  expect(global.fetch).toHaveBeenCalledWith(url);
});

test('given an offset, when getPokemonData is called and api returns error, getPokemonData returns the error object', () => {
  // Arrange
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20';
  const errorObject = {error: true};
  const response = {
    ok: false,
  };

  global.fetch.mockImplementationOnce((mockUrl) => Promise.resolve(response));

  // Assert
  expect(getPokemonData(20)).resolves.toEqual(errorObject);
  expect(global.fetch).toHaveBeenCalledWith(url);
});
