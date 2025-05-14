import ImagemPadraoUsuario from "../assets/usuario-padrao.png"

function UserCard({ name, picture }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow border border-gray-200 w-full max-w-xs">
      <img
        src={picture || ImagemPadraoUsuario}
        alt={`Foto de ${name}`}
        className="w-12 h-12 rounded-full object-cover border-2 border-sky-900"
      />
      <span className="text-sky-900 font-medium text-sm truncate">{name}</span>
    </div>
  );
}

export default UserCard;