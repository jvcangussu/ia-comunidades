import { useNavigate } from "react-router-dom";
import ImagemUsuarioPadrao from "../assets/usuario-padrao.png"
import { IoAddCircleOutline } from "react-icons/io5";
import { auth } from "../firebase-config";
import { FiLogOut } from "react-icons/fi";

function MainHeader({ userData }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 shadow-sm z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={userData?.picture || ImagemUsuarioPadrao}
          alt="Foto do usuário"
          className="w-10 h-10 rounded-full object-cover border-2 border-sky-900"
        />
        <span className="text-sky-900 font-medium text-sm">
          Olá, {userData?.username}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>

      <div className="flex items-center gap-2">
        <img src="/logo512.png" alt="Logo" className="w-20 h-20" />
        <span className="font-bold text-sky-900 text-2xl">IA Comunidades</span>
      </div>

      <button
        onClick={() => navigate("/comunidades/criar-comunidade")}
        className="px-4 py-2 bg-sky-900 text-white rounded-md hover:bg-sky-950 transition flex items-center gap-2"
      >
        <IoAddCircleOutline size={20} />
        Criar nova comunidade
      </button>
    </header>
  );
}

export default MainHeader;