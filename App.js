import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, Switch} from 'react-native';
import Loading from './src/components/Loading';
import PokeCard from './src/components/PokeCard';
import {getPokemonData} from './src/utils/network';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [numColumns, setNumColums] = useState(1);

  useEffect(() => {
    getPokemonData(offset).then((data) => {
      if (data.error) {
        alert(
          `There was some error in fetching pokemons, please try again.
           
        Please check your internet connection if the  problem persists.`,
        );
      } else {
        setPokemonList(data);
      }
      setLoading(false);
    });
  }, [offset]);

  const renderItem = ({item}) => <PokeCard {...item} grid={numColumns === 2} />;

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Comfortable</Text>
        <Switch
          value={numColumns === 2}
          onValueChange={() =>
            setNumColums((columns) => (columns === 1 ? 2 : 1))
          }
          style={styles.switch}
        />
        <Text>Compact</Text>
      </View>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
        numColumns={numColumns}
        key={numColumns}
      />
    </View>
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
  },
  switch: {
    marginHorizontal: 16,
  },
});
