import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Switch,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import Loading from './src/components/Loading';
import PokeListItem, {LINEAR_ITEM_HEIGHT} from './src/components/PokeListItem';
import {getPokemonData} from './src/utils/network';
import {convertToPairs} from './src/utils/library';
import EmptyList from './src/components/EmptyList';
import {MARGIN} from './src/components/PokeCard';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isCompact, setIsCompact] = useState(false);
  const [loadingMorePokemon, setLoadingMorePokemon] = useState(false);
  const window = useWindowDimensions();

  useEffect(() => {
    getPokemonData(offset)
      .then((data) => {
        if (data.error) {
          alert(
            `There was some error in fetching pokemons, please try again.
           
        Please check your internet connection if the  problem persists.`,
          );
        } else {
          data = convertToPairs(data, 2);
          setPokemonList((currentPokemonList) => [
            ...currentPokemonList,
            ...data,
          ]);
        }
        setLoading(false);
        setLoadingMorePokemon(false);
        setRetry(false);
      })
      .catch(() => {
        alert(
          `There was some error in fetching pokemons, please try again.
         
      Please check your internet connection if the  problem persists.`,
        );
        setLoading(false);
        setRetry(false);
      });
  }, [offset, retry]);

  const renderItem = ({item}) => <PokeListItem items={item} grid={isCompact} />;

  return loading || retry ? (
    <Loading />
  ) : (
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
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item[0].name}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          setLoadingMorePokemon(true);
          setOffset((currentOffset) => currentOffset + 20);
        }}
        ListEmptyComponent={() => (
          <EmptyList
            retry={() => {
              setLoading(true);
              setRetry(true);
            }}
          />
        )}
        getItemLayout={(data, index) => ({
          length: isCompact
            ? (window.height - 4 * MARGIN) / 3
            : LINEAR_ITEM_HEIGHT,
          offset: isCompact
            ? ((window.height - 4 * MARGIN) * index) / 3
            : LINEAR_ITEM_HEIGHT * index,
          index,
        })}
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
