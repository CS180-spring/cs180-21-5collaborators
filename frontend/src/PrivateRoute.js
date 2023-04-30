import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "./App";

export { PrivateRoute };

function PrivateRoute({ children }) {
  const history = useNavigate();
  const { authUser } = useContext(AppContext);
  if (!authUser) {
    return <Navigate to="/login" state={{ from: history.location }} />;
  }
  return children;
}
