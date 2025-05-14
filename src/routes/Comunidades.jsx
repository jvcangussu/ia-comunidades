import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getUserById } from '../lib/users';
import { getCommunities } from '../lib/communities';
import MainHeader from '../components/MainHeader';
import CommunityList from '../components/CommunityList';
import { useAuth } from '../context/AuthContext';

function Comunidades() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user === undefined) return;
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
  }, [user, location.pathname, navigate]);

  if (user === undefined || loading) return <p>Carregando...</p>;

  const handlePictureUpdate = (newUrl) => {
    setUserInfo(prev => ({ ...prev, picture: newUrl }));
  };

  return (
    <div className="flex-grow bg-gray-50 py-4">
      <MainHeader userData={userInfo} onPictureUpdate={handlePictureUpdate} />
      <div className="pt-24 px-8">
        <Outlet />
        <CommunityList communities={communities} />
      </div>
    </div>
  );
}

export default Comunidades;