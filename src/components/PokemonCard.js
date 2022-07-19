import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import getColorByPokemonType from "../utils/getColorByPokemonType";

const PokemonCard = (props) => {
  const { pokemon } = props;
  const navigation = useNavigation();
  const pokemonColorCode = getColorByPokemonType(pokemon.type);
  const bgStyles = { backgroundColor: pokemonColorCode, ...styles.card };
  const goToPokemon = () => {
    //console.log(pokemon.id);
    navigation.navigate("Pokemon", {
      id: pokemon.id,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={bgStyles}>
        <Text style={styles.titleCard}>
          # {`${pokemon.order}`.padStart(3, 0)} {pokemon.name}
        </Text>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 100,
    height: 150,
    margin: 8,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 0.5,
  },
  image: {
    position: "relative",
    bottom: 2,
    right: 2,
    width: 115,
    height: 115,
    alignSelf: "center",
    resizeMode: "contain",
    top: 10,
  },
  titleCard: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
});

export default PokemonCard;
