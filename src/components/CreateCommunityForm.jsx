import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCommunity } from "../lib/communities";
import { auth } from "../firebase-config";
import { uploadCommunityImage } from "../lib/storage";

function CreateCommunityForm() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate("/comunidades");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const creatorId = auth.currentUser?.uid;
      if (!creatorId) {
        alert("Usuário não autenticado!");
        return;
      }

      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadCommunityImage(imageFile);
      }

      const result = await createCommunity({
        name,
        description,
        imageUrl,
        creatorId,
      });

      if (result.success) {
        navigate("/comunidades");
      } else {
        alert("Erro ao criar comunidade.");
      }
    } catch (error) {
      console.error("Erro ao submeter:", error);
      alert("Erro interno ao criar a comunidade.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6 mt-10"
    >
      <h2 className="text-2xl font-bold text-sky-900 text-center">Criar nova comunidade</h2>

      <div className="flex flex-col items-center">
        {preview ? (
          <img
            src={preview}
            alt="Prévia da imagem"
            className="w-32 h-32 rounded-full object-cover border-4 border-sky-900 shadow"
          />
        ) : (
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
            Prévia
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />
      </div>

      <div>
        <label className="block text-sm text-sky-900 font-medium">Nome da comunidade</label>
        <input
          type="text"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-sky-900 font-medium">Descrição</label>
        <textarea
          rows="4"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-900 text-white rounded-md hover:bg-sky-950"
        >
          Criar comunidade
        </button>
      </div>
    </form>
  );
}

export default CreateCommunityForm;