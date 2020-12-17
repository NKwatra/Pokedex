import React from 'react';
import {StyleSheet, View} from 'react-native';
import PokeCard from './PokeCard';

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
