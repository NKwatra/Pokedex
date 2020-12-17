import React from 'react';
import PokeCard from '../PokeCard';
import {render} from '@testing-library/react-native';

test('given a PokeCard, when user is in grid view, url is not shown', () => {
  // Arrange
  const {queryByText} = render(<PokeCard name="ABC" url="def" grid={true} />);

  // Assert
  expect(queryByText('def')).toBeNull();
});

test('given a PokeCard, when user is in list view, url is shown', () => {
  // Arrange
  const {getByText} = render(<PokeCard name="ABC" url="def" grid={false} />);

  // Assert
  getByText('def');
});
