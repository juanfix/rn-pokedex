import { StyleSheet, SafeAreaView, Image, Text, View } from "react-native";
import React from "react";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

const Header = (props) => {
  const { name, order, type, image } = props;
  const pokemonColorCode = getColorByPokemonType(type);
  const bgStyles = { backgroundColor: pokemonColorCode, ...styles.bg };

  return (
    <>
      <View style={bgStyles} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titleCard}>
            # {`${order}`.padStart(3, 0)} {name}
          </Text>
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
  },
  titleCard: {
    top: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 26,
    textTransform: "capitalize",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
});

export default Header;
