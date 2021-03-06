import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

/*
  Component to show loading indicator
*/
export default function Loading(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" testID="loader" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
