import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  addPokemonFavoriteApi,
  getPokemonsFavoriteApi,
  isPokemonFavoriteApi,
  removePokemonFavoriteApi,
} from "../../api/FavoriteStorage";

const Favorite = (props) => {
  const { idPokemon } = props;
  //console.log(idPokemon);
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reloadCheck, setReloadCheck] = useState(false);
  const Icon = isFavorite ? FontAwesome : FontAwesome5;

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(idPokemon);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
        console.log(error);
      }
    })();
  }, [idPokemon, reloadCheck]);

  const onReloadCheckFavorite = async () => {
    setReloadCheck(!reloadCheck);
  };

  const addFavorite = async () => {
    try {
      await addPokemonFavoriteApi(idPokemon);
      await onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(idPokemon);
      await onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Icon
      name="heart"
      color="#FFF"
      size={20}
      style={{ marginLeft: 5 }}
      onPress={isFavorite ? removeFavorite : addFavorite}
    ></Icon>
  );
};

export default Favorite;
