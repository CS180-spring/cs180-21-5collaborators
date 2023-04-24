import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={215} height={100} />
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="userID">User ID:</label>
            <input type="text" id="userID" name="userID" placeholder="Enter your User ID" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </header>
    </div>
  );
}

export default App;
