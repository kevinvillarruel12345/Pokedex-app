import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getPokemonByid = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setpokemon] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const openPokemon = async () => {
      const detailPokemon = await getPokemonByid(pokemonData.url);

      setpokemon(detailPokemon);
    };
    openPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClick}
          className="hover: cursor-pointer border bg-teal-400 rounded-b-lg rounded-t-lg w-full"
        >
          <div className="p-2">
            <header className="">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-16">
                <img
                  className=" rounded-t-lg float absolute w-44 -my-24 -mx-16"
                  src={pokemon?.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                />
              </div>
            </header>
            <div className="bg-white rounded-b-lg">
              <section className="p-2">
                <div className="border-b-4 flex flex-col items-center ">
                  <h2 className="text-2xl font-semibold"> {pokemon.name}</h2>
                  <p>{pokemon.types[0].type.name}</p>
                  <p>Type</p>
                </div>
              </section>
              <section className="p-3 grid grid-cols-2">
                {pokemon.stats.map((stat) => (
                  <section className="text-xs" key={stat.stat.name}>
                    <h3 className="l">{stat.stat.name.toUpperCase()}</h3>
                    <p className="font-bold">{stat.base_stat}</p>
                  </section>
                ))}
              </section>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
