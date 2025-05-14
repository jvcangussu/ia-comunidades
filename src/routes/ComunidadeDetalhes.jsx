import CommunityDetail from "../components/CommunityDetail";
import { useNavigate, useLoaderData } from "react-router-dom";
import Modal from "../components/Modal";
import { getCommunityById } from "../lib/communities";


function ComunidadeDetalhes() {

  const navigate = useNavigate();
  const comunidade = useLoaderData();

  const handleClose = () => {
    navigate('/comunidades');
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <CommunityDetail id={comunidade.id} name={comunidade.name} description={comunidade.description} image={comunidade.image} members={comunidade.members} />
    </Modal>
  );
}

export default ComunidadeDetalhes;

export async function loader({ params }) {
  return await getCommunityById(params.comunidadeId);
}