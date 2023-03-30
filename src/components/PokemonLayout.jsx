import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserConext } from '../context/Userconext';

const PokemonLayout = () => {
  const { removeUser } = useContext(UserConext);
  return (
    <div>
      <button
        className="bg-red-400 p-2 hover:bg-red-600 rounded text-white absolute"
        onClick={removeUser}
      >
        Log out
      </button>
      <Outlet />
    </div>
  );
};

export default PokemonLayout;
