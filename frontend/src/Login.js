import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";
import "./App.css";
import logo from "./logo.png";
import userinfo from "./userinfo.json";

function Login() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      userID: "",
      password: "",
    },
    onSubmit: (e) => handleSubmit(e),
  });

  const handleSubmit = async () => {
    const { userID, password } = formik.values;
    const user = userinfo.users.find(
      (u) => u.id === userID && u.password === password
    );

    if (user) {
      setAuthUser({ id: userID });
      navigate("/");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" width={174} height={80} />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userID">Doctor ID:</label>
            <input
              type="text"
              id="userID"
              name="userID"
              placeholder="Enter your Doctor ID"
              value={formik.userID}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formik.password}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
