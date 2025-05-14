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
import CriarComunidade from './routes/CriarComunidade';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  if (user === undefined) {
    return <div>Carregando...</div>;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/cadastro', element: <Cadastro /> },
        {
          path: '/comunidades',
          element: <Comunidades />,
          children: [
            {
              path: '/comunidades/:comunidadeId',
              element: <ComunidadeDetalhes />,
              loader: comunidadeDetalhesLoader
            },
            {
              path: '/comunidades/criar-comunidade',
              element: <CriarComunidade />
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
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
