import { useEffect, useState } from "react";
import ImagemComunidadePadrao from "../assets/comunidade-padrao.png";
import { getUsersByIds, leaveCommunity } from "../lib/users";
import UserCard from "./UserCard";
import { auth } from "../firebase-config";
import { joinCommunity } from "../lib/users";

function CommunityDetail({ id, name, imageUrl, description, members = [] }) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const [isMember, setIsMember] = useState(() =>
    user ? members.includes(user.uid) : false
  );

  useEffect(() => {
    if (user) {
      setIsMember(members.includes(user.uid));
    }

    if (members.length > 0) {
      getUsersByIds(members).then((users) => {
        setUserList(users);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [members, user]);

  const handleJoin = async () => {
    if (!user || isMember) return;

    const result = await joinCommunity(id, user.uid);
    if (result.success) {
      setIsMember(true);
      const updatedUsers = await getUsersByIds([...members, user.uid]);
      setUserList(updatedUsers);
    } else {
      alert("Erro ao entrar na comunidade");
    }
  };

  const handleLeave = async () => {
    if (!user || !isMember) return;

    const result = await leaveCommunity(id, user.uid);
    if (result.success) {
      setIsMember(false);
      const updatedUsers = await getUsersByIds(members.filter(id => id !== user.uid));
      setUserList(updatedUsers);
    } else {
      alert("Erro ao sair da comunidade");
    }
  }

  return (
    <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
      {user && (
        <button
          className={`absolute top-6 right-6 px-4 py-2 text-white rounded-md font-semibold shadow transition-colors ${isMember
            ? "bg-red-600 hover:bg-red-700"
            : "bg-sky-700 hover:bg-sky-900"
            }`}
          onClick={isMember ? handleLeave : handleJoin}
        >
          {isMember ? "Sair da comunidade" : "Entrar na comunidade"}
        </button>
      )}

      <div className="w-full flex justify-center">
        <img
          src={imageUrl || ImagemComunidadePadrao}
          alt={`Imagem da comunidade ${name}`}
          className="w-48 h-48 rounded-full object-cover border-4 border-sky-900 shadow-md"
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-sky-900">{name}</h2>

      <p className="text-gray-700 text-justify">{description}</p>

      <hr className="border-t border-gray-300" />

      <div>
        <h3 className="text-lg font-semibold text-sky-800 mb-4">Membros da comunidade:</h3>
        {loading ? (
          <p className="text-gray-500">Carregando membros...</p>
        ) : userList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userList.map((user) => (
              <UserCard key={user.id} name={user.username} picture={user.picture} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum membro ainda.</p>
        )}
      </div>
    </div>
  );
}

export default CommunityDetail;