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

export async function addMember(communityId, userId) {
  try {
    const community = await getCommunityById(communityId);
    const members = community.members || [];

    const updated = members.includes(userId)
      ? members
      : [...members, userId];

    await axios.patch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/communities/${communityId}?key=${API_KEY}`,
      {
        fields: {
          members: {
            arrayValue: {
              values: updated.map(id => ({ stringValue: id })),
            },
          },
        },
      },
      {
        params: { 'updateMask.fieldPaths': 'members' },
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro ao adicionar membro:', error);
    throw error;
  }
}

export async function removeMember(communityId, userId) {
  try {
    const community = await getCommunityById(communityId);
    const members = community.members || [];

    const updated = members.filter(id => id !== userId);

    await axios.patch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/communities/${communityId}?key=${API_KEY}`,
      {
        fields: {
          members: {
            arrayValue: {
              values: updated.map(id => ({ stringValue: id })),
            },
          },
        },
      },
      {
        params: { 'updateMask.fieldPaths': 'members' },
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro ao remover membro:', error);
    throw error;
  }
}