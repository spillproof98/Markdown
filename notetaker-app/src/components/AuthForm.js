import React, { useState } from 'react';

const AuthForm = ({ mode, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    onSubmit(
      mode === 'login'
        ? { email, password }
        : { email, password, confirmPassword }
    );

    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: 'auto', padding: 20 }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />

      {mode === 'register' && (
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
      )}

      <button
        type="submit"
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: 4
        }}
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
