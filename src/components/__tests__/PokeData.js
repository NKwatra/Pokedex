import React from 'react';
import {render} from '@testing-library/react-native';
import PokeData from '../PokeData';

test('given PokeData component is rendered, when showUrl prop is false, url is hidden and name is displayed', () => {
  // Arrange
  const {getByText, queryByText} = render(
    <PokeData name="ABC" url="def" showUrl={false} />,
  );

  // Assert
  getByText('ABC');
  expect(queryByText('def')).toBeNull();
});

test('given PokeData component is rendered, when showUrl prop is true, url is displayed and name is displayed', () => {
  // Arrange
  const {getByText} = render(<PokeData name="ABC" url="def" showUrl={true} />);

  // Assert
  getByText('ABC');
  getByText('def');
});
