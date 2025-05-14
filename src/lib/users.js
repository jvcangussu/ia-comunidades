import axios from 'axios';
import { firebaseConfig } from '../firebase-config';
import { addMember, removeMember } from './communities';

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

export async function getUserById(userId) {
  try {
    const response = await axios.get(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${userId}?key=${API_KEY}`
    );

    const fields = response.data.fields;

    return {
      id: userId,
      username: fields.username?.stringValue || '',
      picture: fields.picture?.stringValue || '',
      communities: fields.communities?.arrayValue?.values?.map(v => v.stringValue) || []
    };
  } catch (error) {
    console.error(`Erro ao buscar usuário ${userId}:`, error);
    return null;
  }
}

export async function getUsersByIds(userIds = []) {
  try {
    const userPromises = userIds.map((userid) => getUserById(userid));
    const users = await Promise.all(userPromises);
    return users.filter(Boolean);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}

export async function joinCommunity(communityId, userId) {
  try {
    const userData = await getUserById(userId);
    const communities = userData.communities || [];

    const updated = communities.includes(communityId)
      ? communities
      : [...communities, communityId];

    await axios.patch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${userId}?key=${API_KEY}`,
      {
        fields: {
          communities: {
            arrayValue: {
              values: updated.map(id => ({ stringValue: id })),
            },
          },
        },
      },
      {
        params: { 'updateMask.fieldPaths': 'communities' },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    await addMember(communityId, userId);

    return { success: true };
  } catch (error) {
    console.error('Erro ao entrar na comunidade:', error);
    return { success: false, error };
  }
}

export async function leaveCommunity(communityId, userId) {
  try {
    const userData = await getUserById(userId);
    const communities = userData.communities || [];

    const updated = communities.filter(id => id !== communityId);

    await axios.patch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${userId}?key=${API_KEY}`,
      {
        fields: {
          communities: {
            arrayValue: {
              values: updated.map(id => ({ stringValue: id })),
            },
          },
        },
      },
      {
        params: { 'updateMask.fieldPaths': 'communities' },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    await removeMember(communityId, userId);

    return { success: true };
  } catch (error) {
    console.error('Erro ao sair da comunidade:', error);
    return { success: false, error };
  }
}

