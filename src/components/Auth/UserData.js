import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { cleanPokemonsFavoriteApi } from "../../api/FavoriteStorage";
import { getPokemonsFavoriteApi } from "../../api/FavoriteStorage";

const UserData = () => {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonsFavoriteApi();
          setTotal(response.length);
        } catch (error) {
          setTotal(0);
          console.log(error);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido, </Text>
        <Text style={styles.title}>{`${auth.firstname} ${auth.lastname}`}</Text>
      </View>
      <View styles={styles.dataContent}>
        <ItemMenu
          title="Nombre"
          text={`${auth.firstname} ${auth.lastname}`}
        ></ItemMenu>
        <ItemMenu title="Username" text={`${auth.username}`}></ItemMenu>
        <ItemMenu title="Email" text={`${auth.email}`}></ItemMenu>
        <ItemMenu title="Total favoritos" text={`${total} pokémon`}></ItemMenu>
      </View>
      <View style={styles.btnLogout}>
        <Button title="Desconectarse" onPress={logout}></Button>
      </View>
      <View style={styles.btnLogout}>
        <Button
          title="Limpiar lista de pokémon"
          onPress={cleanPokemonsFavoriteApi}
        ></Button>
      </View>
    </View>
  );
};

const ItemMenu = (props) => {
  const { title, text } = props;
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}: </Text>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
  btnLogout: {
    marginTop: 20,
  },
});

export default UserData;
