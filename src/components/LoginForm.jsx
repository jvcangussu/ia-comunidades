import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button } from "@headlessui/react";
import { auth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "../firebase-config";

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    if (!email) return "Email é obrigatório";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return "Email inválido";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Senha é obrigatória";
    if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        general: '',
      });
      return;
    }

    setLoading(true);

    try {
      await setPersistence(auth, browserSessionPersistence);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate("/comunidades");
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/invalid-credential') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Usuário ou senha incorretos',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Erro ao tentar fazer login. Tente novamente mais tarde.',
        }));
      }
    }

    setLoading(false);
  };


  return (
    <>
      {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}

      < form onSubmit={handleSubmit} >

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

        <Button
          type="submit"
          className="w-full px-4 py-2 bg-sky-900 text-white rounded-md hover:bg-sky-950 focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Login'}
        </Button>
      </form >
    </>
  )
}

export default LoginForm;