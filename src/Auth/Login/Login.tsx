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
      <div className="App">
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <div role="alert">{error}</div>}
        </form>
      </div>
    </>
  );
}
