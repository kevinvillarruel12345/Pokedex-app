import { createBrowserRouter } from 'react-router-dom';
import PokemonLayout from '../components/PokemonLayout';
import ProtectedRouter from '../components/ProtectedRouter';
import Home from '../views/Home';
import Pokedex from '../views/Pokedex';
import PokemonDetail from '../views/PokemonDetail';
import { pokedexLoader } from './loaders/pokedexLoaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokedex',
    element: (
      <ProtectedRouter>
        <PokemonLayout />{' '}
      </ProtectedRouter>
    ),
    children: [
      {
        path: ':id',
        element: <PokemonDetail />,
      },
      {
        path: '',
        element: <Pokedex />,
        loader: pokedexLoader,
      },
    ],
  },
]);
