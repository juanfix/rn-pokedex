import { useContext } from "react";
import { View, Text } from "react-native";
import AuthContext from "../context/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
