import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Image, StyleSheet } from "react-native";
import PokedexScreen from "../screens/Pokedex";
import PokemonScreen from "../screens/Pokemon";
import AccountScreen from "../screens/Account";
import FavoriteScreen from "../screens/Favorite";

export default function Navigation() {
  const Tab = createBottomTabNavigator();
  const PokemonStack = createNativeStackNavigator();

  const StackPokemon = () => {
    return (
      <PokemonStack.Navigator>
        <PokemonStack.Screen
          name="Pokedex"
          component={PokedexScreen}
          options={{ title: "Pokemones", headerShown: false }}
        />
        <PokemonStack.Screen
          name="Pokemon"
          component={PokemonScreen}
          options={{ title: "", headerTransparent: true }}
        />
      </PokemonStack.Navigator>
    );
  };

  const StackFavorite = () => {
    return (
      <PokemonStack.Navigator>
        <PokemonStack.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{ title: "Favoritos", headerShown: true }}
        />
        <PokemonStack.Screen
          name="Pokemon"
          component={PokemonScreen}
          options={{ title: "", headerTransparent: true }}
        />
      </PokemonStack.Navigator>
    );
  };

  return (
    <Tab.Navigator initialRouteName="StackPokemon">
      <Tab.Screen
        name="Favoritos"
        component={StackFavorite}
        options={{
          headerShown: false,
          headerTitle: "Favoritos",
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size}></Icon>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="StackPokemon"
        component={StackPokemon}
        options={{
          headerShown: false,
          headerTitle: "Pokédex",
          tabBarLabel: "",
          tabBarIcon: () => renderPokeball(),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitle: "Cuenta",
          tabBarLabel: "Cuenta",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size}></Icon>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const renderPokeball = () => (
  <Image
    source={require("../../assets/pokeball.png")}
    style={styles.bottomIcon}
  />
);

const styles = StyleSheet.create({
  bottomIcon: {
    height: 75,
    width: 75,
    top: -15,
  },
});
