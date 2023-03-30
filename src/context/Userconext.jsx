import { createContext, useState } from 'react';

export const UserConext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('nameUser'));

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('nameUser', user);
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem('nameUser');
  }

  const value = { user, saveUser, removeUser };

  return <UserConext.Provider value={value}>{children}</UserConext.Provider>;
};
