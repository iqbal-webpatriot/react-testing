import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const jsonResult = await response.json();
      // Successful login, now redirect or do whatever you want with the response
      console.log('Success:', jsonResult);
    } catch (error) {
      // Handle error and set error message
      setError('Invalid username or password');
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        {error && <div role="alert">{error}</div>}
      </form>
    </>
  );
}
