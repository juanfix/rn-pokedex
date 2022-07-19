import { ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getPokemonDetailsApi } from "../api/PokeAPI";
import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";
import Favorite from "../components/Pokemon/Favorite";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (auth ? <Favorite idPokemon={pokemon?.id} /> : null),
      headerLeft: ({ color, size }) => (
        <Icon
          name="arrow-left"
          color="#FFF"
          size={20}
          style={{ marginLeft: 5 }}
          onPress={navigation.goBack}
        ></Icon>
      ),
    });
  }, [navigation, params, pokemon, auth]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
        console.log(error);
      }
    })();
  }, [params]); // Se ejecuta cada vez que params sea modificado

  if (!pokemon) return null;

  return (
    <ScrollView>
      <SafeAreaView>
        <Header
          name={pokemon.name}
          order={pokemon.order}
          type={pokemon.types[0].type.name}
          image={pokemon.sprites.other["official-artwork"].front_default}
        ></Header>
        <Type types={pokemon.types}></Type>
        <Stats stats={pokemon.stats}></Stats>
      </SafeAreaView>
    </ScrollView>
  );
}
