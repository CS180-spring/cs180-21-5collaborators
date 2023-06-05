import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  const [authUser, setAuthUser] = useState(undefined);
  return (
    <AppContext.Provider value={{ authUser, setAuthUser }}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export const AppContext = React.createContext();
export default App;