import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function EmptyList(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Error in fetching pokemons</Text>
      <Text style={styles.info}>Please check your internet connection</Text>
      <TouchableOpacity onPress={props.retry} style={styles.retry}>
        <Text style={styles.buttonText}>RETRY</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  info: {
    color: 'rgb(96,103,112)',
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  retry: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#0000ff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
