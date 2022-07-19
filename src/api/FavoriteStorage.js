import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { PanResponder } from "react-native";
import { FAVORITE_STORAGE } from "../utils/constant";

export const getPokemonsFavoriteApi = async () => {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response || "[]");
  } catch (error) {
    throw error;
  }
};

export const addPokemonFavoriteApi = async (id) => {
  try {
    const favoritesList = await getPokemonsFavoriteApi();
    favoritesList.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favoritesList));
  } catch (error) {
    throw error;
  }
};

export const isPokemonFavoriteApi = async (id) => {
  try {
    const response = await getPokemonsFavoriteApi();
    return response.includes(id);
  } catch (error) {
    throw error;
  }
};

export const removePokemonFavoriteApi = async (id) => {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const newFavorites = favorites.filter((fav) => fav != id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
};

export const cleanPokemonsFavoriteApi = async () => {
  try {
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify([]));
  } catch (error) {
    throw error;
  }
};
