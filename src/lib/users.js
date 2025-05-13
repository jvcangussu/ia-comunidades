import axios from 'axios';
import { firebaseConfig } from '../firebase-config';

const PROJECT_ID = firebaseConfig.projectId;
const API_KEY = firebaseConfig.apiKey;

export async function getUsers() {
  try {
    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users?key=${API_KEY}`
    );

    const users = response.data.documents.map((doc) => ({
      id: doc.name.split('/').pop(),
      ...Object.fromEntries(
        Object.entries(doc.fields).map(([key, val]) => [key, Object.values(val)[0]])
      ),
    }));

    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}