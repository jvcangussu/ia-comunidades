import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCommunities } from '../lib/communities';
import CommunityList from '../components/CommunityList';

const comunidades = await getCommunities();

function Comunidades() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex-grow p-8 bg-gray-50">
      <Outlet />
      <CommunityList communities={comunidades} />
    </div>
  );
}

export default Comunidades;