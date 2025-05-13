import ImagemComunidadePadrao from "../assets/comunidade-padrao.png"

function CommunityDetail({ name, imageUrl, description, members = [] }) {
  return (
    <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
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
        <h3 className="text-lg font-semibold text-sky-800 mb-2">Membros da comunidade:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {members.length > 0 ? (
            members.map((membro, index) => <li key={index}>{membro}</li>)
          ) : (
            <li>Nenhum membro ainda.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CommunityDetail;