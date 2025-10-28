import { supabase } from '@/utils/supabase';

export async function uploadProfileImage(userId: string, imageUri: string) {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const fileExt = blob.type?.split('/')[1] || 'png'; // Default to png if type is not clear
  const fileName = `${userId}.${fileExt}`;
  const filePath = `public/${fileName}`; // Store in a 'public' folder within the bucket

  const { data, error: uploadError } = await supabase.storage
    .from('profile-images') // Using the specified bucket name
    .upload(filePath, blob, {
      cacheControl: '3600',
      upsert: true, // Overwrite if file with same name exists
    });

  if (uploadError) {
    console.error('Error uploading profile image:', uploadError);
    return { publicUrl: null, error: uploadError };
  }

  // Get the public URL of the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from('profile-images')
    .getPublicUrl(filePath);

  if (publicUrlData.publicUrl) {
    // Update the user's profile table with the new avatar URL
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ avatar_url: publicUrlData.publicUrl }) // Assuming 'avatar_url' column exists
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user profile with avatar URL:', updateError);
      return { publicUrl: publicUrlData.publicUrl, error: updateError };
    }
  }

  return { publicUrl: publicUrlData.publicUrl, error: null };
}

export function getProfileImageUrl(userId: string, fileExt: string) {
  const fileName = `${userId}.${fileExt}`;
  const filePath = `public/${fileName}`;
  const { data } = supabase.storage
    .from('profile-images')
    .getPublicUrl(filePath);
  return data.publicUrl;
}
