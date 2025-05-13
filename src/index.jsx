import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import Home from './routes/Home';
import Login from './routes/Login';
import Cadastro from './routes/Cadastro';
import { auth } from './firebase-config';
import Comunidades from './routes/Comunidades';
import { useState, useEffect } from 'react';
import ComunidadeDetalhes, { loader as comunidadeDetalhesLoader } from './routes/ComunidadeDetalhes';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/cadastro',
          element: <Cadastro />
        },
        {
          path: '/comunidades',
          element: auth.currentUser ? <Comunidades /> : <Navigate to="/login" />,
          children: [
            {
              path: ':comunidadeId',
              element: <ComunidadeDetalhes />,
              loader: comunidadeDetalhesLoader
            }
          ]
        }

      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
