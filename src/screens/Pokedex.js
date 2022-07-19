import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getPokemonApi, getPokemonDetailsByUrlApi } from "../api/PokeAPI";
import PokemonScreen from "./Pokemon";
import PokemonList from "../components/PokemonList";

const Stack = createNativeStackNavigator();

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })(); // Funcion anonima autoejecutada
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);
      //console.log(response);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        // ciclo asincrono
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
      //console.log(pokemons);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <PokemonList
        pokemon={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      ></PokemonList>
    </SafeAreaView>
  );
}
