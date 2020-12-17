import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import PokeImage from './PokeImage';
import PokeData from './PokeData';

/*
  Constants for card styling and card size
*/
const LINEAR_IMAGE_HEIGHT = 80;
export const PADDING = 16,
  MARGIN = 16;
export const LINEAR_CARD_HEIGHT = LINEAR_IMAGE_HEIGHT + 2 * PADDING;

/*
  Component for a card in pokemon list
  props: {
    grid: boolean, compact -> true, comfortable -> false
    name: string,
    url: string
  }
*/
export default function PokeCard(props) {
  const {height, width} = useWindowDimensions();

  return (
    <View
      style={
        props.grid
          ? [
              styles.card,
              styles.grid,
              {width: (width - 64) / 2, height: (height - 64) / 3},
            ]
          : [styles.card, styles.linear]
      }>
      <PokeImage style={props.grid ? styles.gridImage : styles.linearImage} />
      <PokeData {...props} showUrl={!props.grid} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  linear: {
    flexDirection: 'row',
  },
  grid: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
    paddingTop: 0,
    minHeight: 152,
  },
  linearImage: {
    height: LINEAR_IMAGE_HEIGHT,
    width: LINEAR_IMAGE_HEIGHT,
  },
  gridImage: {
    width: '100%',
    height: '80%',
    marginBottom: 8,
  },
});
