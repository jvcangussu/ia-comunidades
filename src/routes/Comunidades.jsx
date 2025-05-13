import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Comunidades() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const user = auth.currentUser;
    if (!user) {
      // Redireciona para a página de login se o usuário não estiver autenticado
      navigate('/login');
      return;
    }

    // Buscar o nome de usuário no Firestore
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid); // Buscar documento do usuário
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username); // Armazena o nome de usuário
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento enquanto busca o nome de usuário
  }

  return (
    <div className="flex-grow flex flex-col items-center p-8 bg-gray-50">
      <h1>Olá, {username || 'Visitante'}</h1>
      <p>Bem-vindo à página de Comunidades!</p>
    </div>
  );
}

export default Comunidades;