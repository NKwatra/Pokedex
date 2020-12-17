import React from 'react';
import Loading from '../Loading';
import {render} from '@testing-library/react-native';

test('given Loading component is rendered on screen, it displays a loading indicator', () => {
  const {getByTestId} = render(<Loading />);
  getByTestId('loader');
});
