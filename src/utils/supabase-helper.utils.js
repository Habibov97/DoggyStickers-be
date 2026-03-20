const { createClient } = require('@supabase/supabase-js');
const config = require('../config/index');
const AppError = require('./AppError.utils');

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

const uploadImage = async (file) => {
  const fileName = file.originalname + '-' + Date.now();

  const { error } = await supabase.storage.from('DoggyStickers').upload(fileName, file.buffer, {
    contentType: file.mimetype,
  });

  if (error) throw new AppError('Image upload failed', 500);

  const { data } = supabase.storage.from('DoggyStickers').getPublicUrl(fileName);

  return {
    url: data.publicUrl,
    fileName,
  };
};

const deleteImage = async (fileName) => {
  const { error } = await supabase.storage.from('DoggyStickers').remove([fileName]);
  if (error) throw new AppError('Image delete failed', 500);
};

module.exports = { uploadImage, deleteImage };
