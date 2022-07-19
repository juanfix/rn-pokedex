import { SafeAreaView, Text } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { getPokemonsFavoriteApi } from "../api/FavoriteStorage";
import { getPokemonDetailsApi } from "../api/PokeAPI";
import PokemonList from "../components/PokemonList";
import NoLogged from "../components/NoLogged";

export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);
  const { auth } = useAuth();
  console.log(pokemons);

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonsFavoriteApi();
          const pokemonsArray = [];
          for await (const id of response) {
            // ciclo asincrono
            const pokemonDetails = await getPokemonDetailsApi(id);
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }
          setPokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? (
    <SafeAreaView>
      <NoLogged></NoLogged>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <PokemonList pokemon={pokemons}></PokemonList>
    </SafeAreaView>
  );
}
