import axios from 'axios';
import { firebaseConfig } from '../firebase-config';

const PROJECT_ID = firebaseConfig.projectId;
const API_KEY = firebaseConfig.apiKey;

export async function getCommunities() {
  try {
    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/communities?key=${API_KEY}`
    );

    const communities = response.data.documents.map((doc) => ({
      id: doc.name.split('/').pop(),
      ...Object.fromEntries(
        Object.entries(doc.fields).map(([key, val]) => [key, Object.values(val)[0]])
      ),
    }));

    return communities;
  } catch (error) {
    console.error('Erro ao buscar comunidades:', error);
    return [];
  }
}

export async function getCommunityById(id) {
  try {
    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/communities/${id}?key=${API_KEY}`
    );

    const fields = response.data.fields;

    const community = {
      id,
      name: fields.name.stringValue,
      image: fields.image.stringValue,
      description: fields.description.stringValue,
      members: fields.members?.arrayValue?.values?.map(v => v.stringValue) || [],
    };

    return community;
  } catch (error) {
    console.error('Erro ao buscar comunidade por ID:', error);
    return null;
  }
}