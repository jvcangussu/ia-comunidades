import { supabase } from './supabase';

export async function uploadCommunityImage(file) {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('community-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase
    .storage
    .from('community-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function uploadUserImage(file) {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('user-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase
    .storage
    .from('user-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}