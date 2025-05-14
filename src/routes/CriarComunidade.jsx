import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import CreateCommunityForm from "../components/CreateCommunityForm";

function CriarComunidade() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/comunidades');
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <CreateCommunityForm />
    </Modal>
  );
}

export default CriarComunidade;