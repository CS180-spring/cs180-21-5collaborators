import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LionJet</h1>
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
