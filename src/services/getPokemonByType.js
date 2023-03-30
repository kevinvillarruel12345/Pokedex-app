import axios from 'axios';

export const getPokemonByType = async (type) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

    return res.data.pokemon.map((pokemonData )=> pokemonData.pokemon);
  } catch (error) {
    console.log(`falied to get pokemon by type <${type}>`);
  }
};
