import React, { useContext, useEffect, useState } from 'react';
import { UserConext } from '../context/Userconext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { Form, useLoaderData } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserConext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setpokemonName] = useState(name ?? '');
  const [pokemonType, setpokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 20);

  const handleNameChange = (e) => {
    setpokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setpokemonType(e.target.value);
  };

  useEffect(() => {
    setpokemonName(name);
  }, [name]);

  useEffect(() => {
    setpokemonType(type);
  }, [type]);

  return (
    <div className="w-full p-5 py-10">
      <p>
        <span className="text-red-500 font-semibold">Welcome {user}, </span> choose the
        pokemeon that you like the most
      </p>
      <div className="flex flex-row gap-3">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-700 ' : ''}
          >
            {page}
          </button>
        ))}
      </div>
      <div>
        <Form>
          <h3 className="text-red-400">Filter for search</h3>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              name="pokemon_name"
              className="shadow-md border-black"
              value={pokemonName}
              onChange={handleNameChange}
            />
            <select name="pokemon_type" value={pokemonType} onChange={handleTypeChange}>
              <option value="">All types</option>
              {types.map((type) => (
                <option key={type.url} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <button
              className="bg-red-500 text-white p-2 hover: bg-red-400 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </Form>
      </div>
      <section className=" w-full grid grid-cols-[repeat(auto-fill,minmax(170px,_1fr))] gap-6 px-34 py-1  ">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
