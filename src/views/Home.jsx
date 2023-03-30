import React, { useState } from 'react';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserConext } from '../context/Userconext';

const Home = () => {
  const [nameValue, setnameValue] = useState('');
  const [loginerror, setloginError] = useState(null);
  const { user, saveUser } = useContext(UserConext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setnameValue(newNameValue);
    if (nameValue === '') setloginError('Name is required');
    else if (!/^[a-z A-Z ]{3,}$/.test(newNameValue))
      setloginError('only letters and blanks are allowed and least should be 3 length');
    else setloginError(null);
  };

  const handeSubmit = (e) => {
    e.preventDefault();

    if (!loginerror) {
      saveUser(nameValue);
      navigate('/pokedex');
    }
  };

  return (
    <div>
      <div>
        <img src="/pokedex.png" alt="" />
      </div>
      <div className="text-center">
        <h1 className="text-red-600 text-center text-5xl font-bold">¡Hi trainer!</h1>
        <p>Type yout name to start</p>
      </div>
      <form
        className="flex flex-row justify-center items-center mt-9"
        onSubmit={handeSubmit}
      >
        <input
          type="text"
          className="border border-red-50 p-3 "
          value={nameValue}
          onChange={handleChange}
        />
        <button type="submit" className="bg-red-600 p-3">
          Start
        </button>
      </form>
      {loginerror && <p className="text-red-500">{loginerror}</p>};
      {user && <Navigate to="/pokedex" />}
    </div>
  );
};

export default Home;
