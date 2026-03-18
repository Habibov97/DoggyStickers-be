const fs = require('fs/promises');
const Handlebars = require('handlebars');
const path = require('path');

const renderTemplate = async (name, params) => {
  const filePath = path.join(__dirname, `../views/template/${name}.hbs`);
  const file = await fs.readFile(filePath, 'utf-8');

  const template = Handlebars.compile(file);

  return template(params);
};

module.exports = renderTemplate;
