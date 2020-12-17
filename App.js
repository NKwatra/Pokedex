import React, {useEffect, useState, useRef} from 'react';
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
  const listRef = useRef(null);
  const currentScrollPosition = useRef(0);

  /*
    load pokemon data whenever end of list is reached or user retries
    because of error
  */
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

  /*
    record current offset of list
  */
  const handleScroll = (evt) => {
    currentScrollPosition.current = evt.nativeEvent.contentOffset.y;
  };

  /*
    function to calculate offset where list should scroll to
    when user switches view, so as to stay at the
    same position (i.e. same pokemon)
  */
  const getNewScrollPosition = () => {
    /*
      calculate index for current list item, based on fixed size
      of list items in respective views
    */
    let index;
    if (isCompact) {
      index = Math.floor(
        (currentScrollPosition.current * 3) / (window.height - 4 * MARGIN),
      );

      return index * LINEAR_ITEM_HEIGHT;
    } else {
      index = Math.floor(currentScrollPosition.current / LINEAR_ITEM_HEIGHT);
      return (index * (window.height - 64)) / 3;
    }
  };

  return loading || retry ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Comfortable</Text>
        <Switch
          value={isCompact}
          onValueChange={() => {
            let newPosition = getNewScrollPosition();
            listRef.current.scrollToOffset({
              offset: newPosition,
              animated: false,
            });
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
        ref={listRef}
        onScroll={handleScroll}
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
