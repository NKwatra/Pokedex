import React from 'react';
import {Image} from 'react-native';

/*
  Component for pokemon image in list
  props: {
    width: number,
    height: number
  }
*/
export default function PokeImage(props) {
  return (
    <Image
      source={require('../images/charmander.png')}
      style={{...props.style}}
    />
  );
}
