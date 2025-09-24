import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await register(formData);

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      if (error.message === 'Email already registered') {
        alert('User already exists, redirecting to login');
        navigate('/login');
      } else {
        alert(error.message || 'Registration failed');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <AuthForm mode="register" onSubmit={handleRegister} />
      <p style={{ marginTop: 10 }}>
        Already registered? <Link to="/login">Login here.</Link>
      </p>
    </div>
  );
};

export default Register;
