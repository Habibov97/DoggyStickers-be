const { createClient } = require('@supabase/supabase-js');
const config = require('../config/index');

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

const uploadImage = async (file) => {
  const fileName = file.originalname + '-' + Date.now();

  const { error } = await supabase.storage.from('DoggyStickers').upload(fileName, file.buffer, {
    contentType: file.mimetype,
  });

  if (error) throw error;

  const { data } = supabase.storage.from('DoggyStickers').getPublicUrl(fileName);

  return data.publicUrl;
};

module.exports = { uploadImage };
