import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with your credentials
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl!, supabaseKey!);

// Attach JWT token once the user is authenticated
export const setupSupabaseClient = (token: string) => {
  return createClient(supabaseUrl!, supabaseKey!, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const supabaseUploadImage = async (token: string, userId: string, file: File, fileName: string) => {
  const supabaseWithAuth = setupSupabaseClient(token!);

  const { data, error } = await supabaseWithAuth.storage.from('members').upload(`images/${userId}/${fileName}`, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }

  // Return the path to the uploaded file
  return data?.path;
};
