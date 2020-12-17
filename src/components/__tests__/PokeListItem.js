import React from 'react';
import {render} from '@testing-library/react-native';
import PokeListItem from '../PokeListItem';

test('PokeListItem renders correctly in list view', () => {
  const items = [
    {name: 'A', url: 'abc'},
    {name: 'B', url: 'bcd'},
    {name: 'C', url: 'cde'},
    {name: 'D', url: 'def'},
    {name: 'E', url: 'efg'},
    {name: 'F', url: 'fgh'},
  ];
  const {toJSON} = render(<PokeListItem items={items} grid={false} />);
  expect(toJSON()).toMatchSnapshot();
});

test('PokeListItem renders correctly in grid view', () => {
  const items = [
    {name: 'A', url: 'abc'},
    {name: 'B', url: 'bcd'},
    {name: 'C', url: 'cde'},
    {name: 'D', url: 'def'},
    {name: 'E', url: 'efg'},
    {name: 'F', url: 'fgh'},
  ];
  const {toJSON} = render(<PokeListItem items={items} grid={true} />);
  expect(toJSON()).toMatchSnapshot();
});

test('given PokeListItem in list view, when user switches to Grid view, url disappears', () => {
  const items = [
    {name: 'A', url: 'abc'},
    {name: 'B', url: 'bcd'},
  ];
  const {update, getByText, queryByText} = render(
    <PokeListItem items={items} grid={false} />,
  );

  // url is shown in list view
  getByText('abc');
  getByText('bcd');

  // no url after update
  update(<PokeListItem items={items} grid={true} />);
  expect(queryByText('abc')).toBeNull();
  expect(queryByText('bcd')).toBeNull();
});
