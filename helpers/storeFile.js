const fs = require('fs');

const file = './db/data.json';

const storeDB = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(file)) return null;

  return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
};

module.exports = {
  storeDB,
  readDB,
};
