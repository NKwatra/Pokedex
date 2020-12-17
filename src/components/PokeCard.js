import React from 'react';
import {View, StyleSheet} from 'react-native';
import PokeImage from './PokeImage';
import PokeData from './PokeData';

export default function PokeCard(props) {
  return (
    <View
      style={
        props.grid ? [styles.card, styles.grid] : [styles.card, styles.linear]
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
    width: 152,
    height: 152,
  },
  linearImage: {
    height: 80,
    width: 80,
  },
  gridImage: {
    width: '100%',
    height: '80%',
    marginBottom: 8,
  },
});
