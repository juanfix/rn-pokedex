import { FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = (props) => {
  const { pokemon, loadPokemons, isNext } = props;
  const loadMorePokemon = () => {
    loadPokemons();
  };
  return (
    <FlatList
      data={pokemon}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PokemonCard pokemon={item}></PokemonCard>}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={isNext && loadMorePokemon}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          ></ActivityIndicator>
        )
      }
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});

export default PokemonList;
