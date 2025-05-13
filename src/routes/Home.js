import { Button } from '@headlessui/react';
import { CiLogin } from 'react-icons/ci';
import { AiOutlineForm } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex-grow flex flex-col items-center p-8 bg-gray-50">
      <div className="flex justify-center">
        <img
          src="/logo512.png"
          alt="Logo do site"
          className="w-100 h-100 transition-transform transform hover:scale-110"
        />
      </div>
      <h1 className="text-4xl font-bold mt-4 text-black">
        Venha explorar nossas comunidades!
      </h1>
      <div className="flex justify-center gap-4 mt-8 w-full">
        <Link to="/login" className="w-1/5">
          <Button className="w-full px-4 py-2 bg-sky-900 rounded-md shadow-md hover:bg-sky-950 flex items-center justify-center gap-2">
            <span className="flex-grow text-center text-white">Faça login aqui</span>
            <CiLogin size={24} className="text-white" />
          </Button>
        </Link>

        <Link to="/cadastro" className="w-1/5">
          <Button className="w-full px-4 py-2 border-2 border-sky-900 text-sky-900 rounded-md shadow-md hover:bg-sky-50 flex items-center justify-center gap-2">
            <span className="flex-grow text-center">Cadastre-se aqui</span>
            <AiOutlineForm size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;