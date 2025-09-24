import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);

      loginUser(data.token);

      navigate('/dashboard');
    } catch (error) {
      alert(error.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <AuthForm mode="login" onSubmit={handleLogin} />
      <p style={{ marginTop: 10 }}>
        New user? <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
};

export default Login;
