import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";

function Login() {

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
        <h2 className="text-2xl font-bold mb-6 text-sky-900">Acesse o sistema:</h2>

        <LoginForm />

        <p className="mt-4 text-center">
          Ainda não possui conta?{' '}
          <Link to="/cadastro" className="text-sky-900 hover:text-sky-950">
            Faça cadastro
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;