// import React from 'react'

// const PrivateRoute = () => {
//   return localStorage.getItem("valid") ? children : <Navigate to="/" />
// }

// export default PrivateRoute

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("valid")
    ? children
    : <Navigate to="/" replace />;
};

export default PrivateRoute;