// EJEMPLO DE USO DE AXIOS PARA LA POKEAPI ALGO MUY SENCILLO Y CORTO PORFAVOR
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPokemon = async (name: string) => {
  try {
    const response = await apiClient.get(`/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  } 
};