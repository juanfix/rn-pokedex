import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const NoLogged = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Text style={styles.text}>
        Para ver esta pantalla tienes que iniciar sesión
      </Text>
      <Button
        title="Ir al login"
        onPress={() => navigation.navigate("Account")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 50,
    paddingHorizontal: 50,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
});

export default NoLogged;
