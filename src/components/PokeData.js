import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';

/*
  Component to display pokemon name and url
  props: {
    name: string,
    url: string,
    showUrl: boolean // true -> compact, false -> comfortable
  }
*/
export default function PokeData(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      {props.showUrl ? (
        <Text style={styles.url} onPress={() => Linking.openURL(props.url)}>
          {props.url}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  name: {
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  url: {
    color: 'blue',
  },
});
