import { useNavigate } from "react-router-dom";
import ImagemUsuarioPadrao from "../assets/usuario-padrao.png"
import { IoAddCircleOutline } from "react-icons/io5";
import { auth } from "../firebase-config";
import { FiLogOut } from "react-icons/fi";
import { useRef } from "react";
import { uploadUserImage } from "../lib/storage";
import { updateUserPicture } from "../lib/users";

function MainHeader({ userData, onPictureUpdate }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const fileInputRef = useRef();

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const user = auth.currentUser;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.uid) return;

    try {
      const imageUrl = await uploadUserImage(file);
      await updateUserPicture(user.uid, imageUrl);
      if (onPictureUpdate) {
        onPictureUpdate(imageUrl);
      }
    } catch (error) {
      alert("Erro ao atualizar a imagem");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 shadow-sm z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          onClick={handleProfileClick}
          src={userData?.picture || ImagemUsuarioPadrao}
          alt="Foto do usuário"
          className="w-10 h-10 rounded-full object-cover border-2 border-sky-900"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
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