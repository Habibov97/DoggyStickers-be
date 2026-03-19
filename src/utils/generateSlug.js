const slugify = require('slugify');

const generateSlug = (title) => {
  const slug = slugify(title, { lower: true });
  return slug;
};

module.exports = generateSlug;
