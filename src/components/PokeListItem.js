import React from 'react';
import {StyleSheet, View} from 'react-native';
import PokeCard, {LINEAR_CARD_HEIGHT, MARGIN} from './PokeCard';

export const LINEAR_ITEM_HEIGHT = 2 * LINEAR_CARD_HEIGHT + 4 * MARGIN;

export default function PokeListItem(props) {
  return (
    <View style={props.grid ? styles.grid : {}}>
      {props.items.map((item) => (
        <PokeCard {...item} grid={props.grid} key={item.name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
  },
});
