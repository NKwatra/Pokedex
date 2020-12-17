import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Switch,
  ActivityIndicator,
  useWindowDimensions,
  NativeModules,
  LayoutAnimation,
  Platform,
} from 'react-native';
import Loading from './src/components/Loading';
import PokeListItem, {LINEAR_ITEM_HEIGHT} from './src/components/PokeListItem';
import {getPokemonData} from './src/utils/network';
import {convertToPairs} from './src/utils/library';
import EmptyList from './src/components/EmptyList';
import {MARGIN} from './src/components/PokeCard';

const {UIManager} = NativeModules;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

  const handleScroll = (evt) => {
    currentScrollPosition.current = evt.nativeEvent.contentOffset.y;
  };

  const getNewScrollPosition = () => {
    let index;
    if (isCompact) {
      index = Math.ceil(
        (currentScrollPosition.current * 3) / (window.height - 4 * MARGIN),
      );
      return index * LINEAR_ITEM_HEIGHT;
    } else {
      index = Math.ceil(currentScrollPosition.current / LINEAR_ITEM_HEIGHT);
      console.log(index);
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
            console.log(newPosition, 'I am done');
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
