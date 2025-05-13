import ImagemComunidadePadrao from "../assets/comunidade-padrao.png"
import { useNavigate } from "react-router-dom";

function CommunityCard({ id, name, imageUrl, description }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/comunidades/${id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-80 h-[320px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl flex flex-col items-center p-4 transition-transform duration-300 transform hover:scale-105">
      <img
        src={imageUrl || ImagemComunidadePadrao}
        alt={`Imagem da comunidade ${name}`}
        className="w-32 h-32 rounded-full object-cover border-4 border-sky-900 shadow-md"
      />
      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold text-sky-900 text-center">{name}</h3>
        <p className="text-gray-700 text-sm mt-2 line-clamp-5">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CommunityCard;