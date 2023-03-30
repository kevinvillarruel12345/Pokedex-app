import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state?.pokemon);
  }, []);

  return (
    <div className=" bg-gradient-to-b from-teal-300 to-green-200 box-content h-32">
      {pokemon && (
        <>
          <div className="flex flex-row justify-center ">
            <img
              className="rounded-t-lg float absolute w-44 my-5 -mx-12"
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </div>
          <section>
            <h1 className="text-4xl font-bold text-center my-60">{pokemon.name}</h1>
          </section>
          <div className="text-center grid grid-cols-2  -my-36 pb-44 ">
            <ul className="">
              <li className="font-semibold text-xl">Type</li>
              <li className="bg-teal-500 mx-20 my-4">{pokemon.types[0].type.name}</li>
              <li className="bg-violet-600 mx-20">{pokemon.types[1].type.name}</li>
            </ul>
            <ul>
              <li className="c">Abilities</li>
              <li className="bg-teal-500 mx-20 my-4">
                {pokemon.abilities[0].ability.name}
              </li>
              <li className="bg-violet-600 mx-20">{pokemon.abilities[1].ability.name}</li>
            </ul>
          </div>
          <section className="">
            <h2 className="font-semibold text-2xl pb-5 pl-10">Stats</h2>
            <div className="p-3 grid grid-cols-2 ml-36 mr-36">
              {pokemon.stats.map((stat) => (
                <section className="" key={stat.stat.name}>
                  <h3 className="l">{stat.stat.name.toUpperCase()}</h3>
                  <p className="font-bold bg-teal-200">{stat.base_stat}</p>
                </section>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
