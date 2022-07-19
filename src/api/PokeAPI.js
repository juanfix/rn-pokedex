import { PanResponder } from "react-native-web";
import { API_HOST } from "../utils/constant";

export const getPokemonApi = async (nextUrl) => {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    const response = await fetch(nextUrl || url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getPokemonDetailsByUrlApi = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export async function getPokemonDetailsApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
