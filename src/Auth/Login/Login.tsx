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
    //empty field checks
    const { username, password } = userInput;
    if (username === '' && password === '') {
      setErrorMessage({
        username: 'This field is required',
        password: 'This field is required',
      });
      return;
    }
    if (username === '') {
      setErrorMessage({
        username: 'This field is required',
        password: '',
      });
      return;
    }
    if (password === '') {
      setErrorMessage({
        username: '',
        password: 'This field is required',
      });
      return;
    }
    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          ...userInput,
        }),
      });
      const jsonResult = await response.json();
      if (jsonResult.status === 'success') {
        setErrorMessage({
          invalidLogin: 'Logged Successfully',
        });
      } else {
        setErrorMessage({
          invalidLogin: jsonResult.errorMessage,
        });
      }
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
        <form>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
            type="text"
            name="username"
            value={userInput.username}
            onChange={inputHandler}
          />
          {errorMessage?.username && (
            <div role="alert">{errorMessage?.username}</div>
          )}
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
          {errorMessage?.password && (
            <div role="alert">{errorMessage?.password}</div>
          )}
          <br />
          <button onClick={handleLogin} type="submit">
            Login
          </button>
          {errorMessage?.invalidLogin && (
            <div role="alert">{errorMessage?.invalidLogin}</div>
          )}
        </form>
      </div>
    </>
  );
}
