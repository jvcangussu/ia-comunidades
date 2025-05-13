import { Link } from "react-router-dom";
import CadastroForm from "../components/CadastroForm";

function Cadastro() {

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

        <CadastroForm />

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