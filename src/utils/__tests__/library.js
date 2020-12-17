import {
  convertToPairs,
  getNewScrollPosition,
  loadPokemonData,
} from '../library';
import {getPokemonData} from '../network';

test('given array of pokemon data, when convertToPairs is called, it returns data grouped as required', () => {
  // Arrange
  const data = [
    {name: 'A', url: 'abc'},
    {name: 'B', url: 'bcd'},
    {name: 'C', url: 'cde'},
    {name: 'D', url: 'def'},
    {name: 'E', url: 'efg'},
    {name: 'F', url: 'fgh'},
  ];
  const expectedData = [
    [data[0], data[1]],
    [data[2], data[3]],
    [data[4], data[5]],
  ];
  // Act & Assert
  expect(convertToPairs(data, 2)).toEqual(expectedData);
});

test('given compact form and scroll offset, when getNewScrollPosition is called, it gives correct new scroll offset', () => {
  // Arrange
  const currentScrollPosition = {current: 576};
  const window = {height: 664};
  const isCompact = true;
  // Act & Assert
  expect(getNewScrollPosition(currentScrollPosition, isCompact, window)).toBe(
    400,
  );
});

test('given comfortable form and scroll offset, when getNewScrollPosition is called, it gives correct new scroll offset', () => {
  // Arrange
  const currentScrollPosition = {current: 400};
  const window = {height: 664};
  const isCompact = false;
  // Act & Assert
  expect(getNewScrollPosition(currentScrollPosition, isCompact, window)).toBe(
    576,
  );
});

jest.mock('../network');

test('given an offset and getPokemonData returns array, when loadPokemonData is called, it provides correctly grouped data', () => {
  // Arrange
  const data = [
    {name: 'A', url: 'abc'},
    {name: 'B', url: 'bcd'},
    {name: 'C', url: 'cde'},
    {name: 'D', url: 'def'},
    {name: 'E', url: 'efg'},
    {name: 'F', url: 'fgh'},
  ];
  const expectedData = [
    [data[0], data[1]],
    [data[2], data[3]],
    [data[4], data[5]],
  ];
  const resolvedValue = new Promise((resolve) => resolve(data));
  getPokemonData.mockResolvedValue(resolvedValue);

  // Act & Assert()
  expect(loadPokemonData(20)).resolves.toEqual(expectedData);
});

test('given an offset and getPokemonData returns error object, when loadPokemonData is called, it provides error message', () => {
  // Arrange
  const errorObject = {error: true};
  const resolvedValue = new Promise((resolve) => resolve(errorObject));
  getPokemonData.mockResolvedValue(resolvedValue);

  // Act & Assert()
  expect(loadPokemonData(20)).resolves.toEqual(errorObject);
});
