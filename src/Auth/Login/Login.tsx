import React, { useState } from 'react';
import { ErrorMessage, LoginInputSate } from './login.types';

export default function Login() {
  const [userInput, setUserInput] = useState<LoginInputSate>(
    {} as LoginInputSate,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    {} as ErrorMessage,
  );

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'post',
        body: JSON.stringify(userInput),
      });
      const jsonResult = await response.json();
      // Successful login, now redirect or do whatever you want with the response
      console.log('Success:', jsonResult);
    } catch (error) {
      // Handle error and set error message
    }
  };
  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserInput({ ...userInput, [name]: value });
    setErrorMessage({});
  };
  console.log('user input', userInput);
  return (
    <>
      <div className="App">
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
            type="text"
            name="username"
            value={userInput.username}
            onChange={inputHandler}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            id="password"
            type="password"
            name="password"
            value={userInput.password}
            onChange={inputHandler}
          />
          <br />
          <button type="submit">Login</button>
          {errorMessage?.invalidLogin && (
            <div role="alert">{errorMessage?.invalidLogin}</div>
          )}
        </form>
      </div>
    </>
  );
}
