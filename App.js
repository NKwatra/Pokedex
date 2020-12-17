import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch, SafeAreaView} from 'react-native';
import PokeList from './src/components/PokeList';

export default function App() {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <SafeAreaView style={styles.iosSafe}>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text>Comfortable</Text>
          <Switch
            value={isCompact}
            onValueChange={() => {
              setIsCompact((prevCompactValue) => !prevCompactValue);
            }}
            style={styles.switch}
          />
          <Text>Compact</Text>
        </View>
        <PokeList isCompact={isCompact} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  iosSafe: {
    flex: 1,
  },

  switch: {
    marginHorizontal: 16,
  },
});
