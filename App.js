import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Loading from './src/components/Loading';
import PokeCard from './src/components/PokeCard';
import {getPokemonData} from './src/utils/network';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [numColumns, setNumColums] = useState(1);
  const [loadingMorePokemon, setLoadingMorePokemon] = useState(false);

  useEffect(() => {
    getPokemonData(offset).then((data) => {
      if (data.error) {
        alert(
          `There was some error in fetching pokemons, please try again.
           
        Please check your internet connection if the  problem persists.`,
        );
      } else {
        setPokemonList((currentPokemonList) => [
          ...currentPokemonList,
          ...data,
        ]);
      }
      setLoading(false);
      setLoadingMorePokemon(false);
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
          onValueChange={() => {
            setNumColums((columns) => (columns === 1 ? 2 : 1));
          }}
          style={styles.switch}
        />
        <Text>Compact</Text>
      </View>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={numColumns}
        key={numColumns}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          setLoadingMorePokemon(true);
          setOffset((currentOffset) => currentOffset + 20);
        }}
      />
      {loadingMorePokemon ? (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={styles.moreLoading}
        />
      ) : null}
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

  moreLoading: {
    marginBottom: 8,
  },
});
