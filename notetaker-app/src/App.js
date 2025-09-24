import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './router/AppRoutes';

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
