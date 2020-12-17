import React from 'react';
import {Image} from 'react-native';

export default function PokeImage(props) {
  return (
    <Image
      source={require('../images/charmander.png')}
      style={{...props.style}}
    />
  );
}
