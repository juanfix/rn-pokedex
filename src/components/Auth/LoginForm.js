import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth"; // Hook personalizado para gestionar el useContext

const LoginForm = () => {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValues) => {
      const { username, password } = formValues;

      if (username !== user.username || password !== user.password) {
        ToastAndroid.show(
          "El usuario o la contrasena no son correctos",
          ToastAndroid.SHORT
        );
      } else {
        login(userDetails);
        console.log("Login correcto");
      }
    },
  });
  return (
    <View>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <View style={styles.button}>
        <Button title="Enviar" onPress={formik.handleSubmit} />
      </View>
      <Text style={styles.error}>
        {formik.errors.username}
        {"\n"}
        {formik.errors.password}
      </Text>
    </View>
  );
};

const initialValues = () => {
  return {
    username: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    username: Yup.string().required("El ususario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    margin: 12,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});

export default LoginForm;
