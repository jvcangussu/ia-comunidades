import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getUserById } from '../lib/users';
import { getCommunities } from '../lib/communities';
import MainHeader from '../components/MainHeader';
import CommunityList from '../components/CommunityList';

function Comunidades() {
  const [userInfo, setUserInfo] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 necessário para escutar rota atual

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userData = await getUserById(user.uid);
        const communityList = await getCommunities();

        setUserInfo(userData);
        setCommunities(communityList);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, location.pathname]); // 🔁 refaz fetch sempre que a rota mudar

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex-grow bg-gray-50 py-4">
      <MainHeader userData={userInfo} />
      <div className="pt-24 px-8">
        <Outlet />
        <CommunityList communities={communities} />
      </div>
    </div>
  );
}

export default Comunidades;