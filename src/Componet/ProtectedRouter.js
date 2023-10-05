import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRouter({ children }) {

  const protect = localStorage.getItem('Login');



  return (
    <>
      {protect ? <> {children} </> : <> <Navigate to={'/login'} replace /> </>}


    </>
  );
}



export default ProtectedRouter;
