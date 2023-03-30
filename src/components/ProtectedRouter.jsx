import React, { useContext } from 'react';
import { UserConext } from '../context/Userconext';
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
  const { user } = useContext(UserConext);

  if (user) return <>{children}</>;
  else return <Navigate to="/" />;
};

export default ProtectedRouter;
