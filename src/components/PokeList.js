import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {MARGIN} from './PokeCard';
import PokeListItem, {LINEAR_ITEM_HEIGHT} from './PokeListItem';
import {getNewScrollPosition, loadPokemonData} from '../utils/library';
import Loading from './Loading';
import EmptyList from './EmptyList';

/*
    Component to render list of pokemon
    props: {
        isCompact: boolean // comfortable -> false, compact -> true
        }
*/
export default function PokeList(props) {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [loadingMorePokemon, setLoadingMorePokemon] = useState(false);
  const [offset, setOffset] = useState(0);
  const window = useWindowDimensions();
  const listRef = useRef(null);
  const currentScrollPosition = useRef(0);
  const firstRender = useRef(true);

  /*
    Function to load new pokemon data
    currentOffset: number
  */
  const memoizedDataLoading = useCallback((currentOffset) => {
    loadPokemonData(currentOffset)
      .then((result) => {
        if (result.error) {
          alert('Please check your internet connection');
        } else {
          setPokemonList((previousPokemonList) => [
            ...previousPokemonList,
            ...result,
          ]);
        }
        setLoading(false);
        setLoadingMorePokemon(false);
      })
      .catch(() => {
        alert('Please check your internet connection');
        setLoading(false);
        setLoadingMorePokemon(false);
      });
  }, []);

  /*
    Load data on initial render and when offset changes
   */
  useEffect(() => {
    memoizedDataLoading(offset);
  }, [offset, memoizedDataLoading]);

  /*
    Function to return memoized version of component
    to render when list is empty
  */
  const MemoizedEmptyListComponent = useMemo(
    () => (
      <EmptyList
        retry={() => {
          setLoading(true);
          memoizedDataLoading(offset);
        }}
      />
    ),
    [offset, memoizedDataLoading],
  );

  /*
        To scroll list to appropriate position
        when view changes from list to grid and
        vice versa, so as to maintain list at the
        same position
    */
  useLayoutEffect(() => {
    if (!firstRender.current) {
      let newPosition = getNewScrollPosition(
        currentScrollPosition,
        props.isCompact,
        window,
      );
      listRef.current.scrollToOffset({
        offset: newPosition,
        animated: false,
      });
    } else {
      firstRender.current = false;
    }
  }, [props.isCompact, window]);

  const renderItem = ({item}) => (
    <PokeListItem items={item} grid={props.isCompact} />
  );

  /*
    record current offset of list
  */
  const handleScroll = (evt) => {
    currentScrollPosition.current = evt.nativeEvent.contentOffset.y;
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item[0].name}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          setLoadingMorePokemon(true);
          setOffset((currentOffset) => currentOffset + 20);
        }}
        ListEmptyComponent={MemoizedEmptyListComponent}
        getItemLayout={(data, index) => ({
          length: props.isCompact
            ? (window.height - 4 * MARGIN) / 3
            : LINEAR_ITEM_HEIGHT,
          offset: props.isCompact
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
    </>
  );
}

const styles = StyleSheet.create({
  moreLoading: {
    marginBottom: 8,
  },
});
