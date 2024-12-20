import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or API key is not defined');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;

// Attach JWT token once the user is authenticated
export const setupSupabaseClient = (token: string): SupabaseClient => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or API key is not defined');
  }

  // Create a new client with the JWT token in headers
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const supabaseUploadImage = async (
  token: string,
  userId: string,
  imageToUpload: File | Blob,
  imageName: string
): Promise<string> => {
  if (!userId || !imageToUpload || !imageName) {
    throw new Error('Missing required parameters.');
  }

  // Create a new Supabase client with the token attached
  const client: SupabaseClient = setupSupabaseClient(token);

  // Define the storage bucket and the file path
  const bucketName = 'user-uploads'; // Replace with your bucket name
  const filePath = `${userId}/${imageName}`;

  try {
    // Upload the image to the bucket
    const { data, error } = await client.storage.from(bucketName).upload(filePath, imageToUpload, {
      contentType: imageToUpload.type, // Ensure correct content type
      upsert: true, // Overwrite if the file already exists
    });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    // Generate a public URL for the uploaded file
    const { data: storageData } = client.storage.from(bucketName).getPublicUrl(filePath);

    if (!storageData.publicUrl) {
      throw new Error('Failed to generate public URL for the uploaded file.');
    }

    return storageData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
