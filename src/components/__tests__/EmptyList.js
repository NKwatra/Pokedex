import React from 'react';
import EmptyList from '../EmptyList';
import {fireEvent, render} from '@testing-library/react-native';

test('given an empty list, when user presses retry button, then attemp to fetch data occurs', () => {
  // Arrange
  const mockRetry = jest.fn();
  const {getByText} = render(<EmptyList retry={mockRetry} />);
  const retryButton = getByText('RETRY');

  // Act
  fireEvent.press(retryButton);

  // Assert
  expect(mockRetry).toHaveBeenCalledTimes(1);
});

test('EmptyList component renders, No internet connection message', () => {
  // Arrange
  const mockRetry = jest.fn();
  const {getByText} = render(<EmptyList retry={mockRetry} />);

  // Assert, will fail if text does not exist
  getByText('Please check your internet connection');
});
