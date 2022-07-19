import { View, Text, StyleSheet } from "react-native";
import React from "react";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

const Type = (props) => {
  const { types } = props;
  const pokemonColorCode = (type) => getColorByPokemonType(type);
  return (
    <View style={styles.content}>
      {types.map((item, index) => (
        <View
          key={item.type.name}
          style={{
            backgroundColor: pokemonColorCode(item.type.name),
            ...styles.pill,
          }}
        >
          <Text style={styles.nameType}>{item.type.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  nameType: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
});

export default Type;
