import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button } from '@headlessui/react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, setDoc, doc, getDocs, query, collection, where } from "../firebase-config";

function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (!username) return 'Nome de usuário é obrigatório';
    if (username.length < 5) return 'Nome de usuário deve ter no mínimo 5 caracteres';
    if (!/^[a-zA-Z]/.test(username)) return 'Nome de usuário deve começar com uma letra';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email é obrigatório';
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return 'Email inválido';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Senha é obrigatória';
    if (password.length < 8) return 'Senha deve ter no mínimo 8 caracteres';
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return 'Confirmação de senha é obrigatória';
    if (confirmPassword !== password) return 'As senhas não coincidem';
    return '';
  };


  const checkUsernameExists = async (username) => {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    setErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Nome de usuário já está em uso',
      }));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        createdAt: new Date(),
      });

      console.log('Usuário cadastrado e documento criado no Firestore!');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setErrors({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setSuccessMessage('Cadastro realizado com sucesso!');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/login');
      }, 1000);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email já está cadastrado',
        }));
      } else {
        console.error('Erro inesperado ao cadastrar:', error.message);
      }
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center p-8 bg-gray-50">
      <Link to="/">
        <img
          src="/logo512.png"
          alt="Logo do site"
          className="w-32 h-32 mb-8 transition-transform transform hover:scale-110"
        />
      </Link>

      <div className="w-full max-w-sm p-6 border-2 border-sky-950 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-sky-900">Realize seu cadastro:</h2>

        {successMessage && (
          <div className="mb-4 text-green-700 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-sky-800">Nome de usuário</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-sky-800">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-sky-800">Senha</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-sky-800">Confirme sua senha</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            className="w-full px-4 py-2 bg-sky-900 text-white rounded-md hover:bg-sky-950 focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </Button>
        </form>

        <p className="mt-4 text-center">
          Já possui conta?{' '}
          <Link to="/login" className="text-sky-900 hover:text-sky-950">
            Faça login
          </Link>
        </p>
      </div>

    </div>
  );
}

export default Cadastro;