const fs = require('fs');

const defaultStyles = fs.readFileSync(`${__dirname}/../css/default-styles.css`);

const getDefaultStyles = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(defaultStyles);
  response.end();
};

module.exports = {
  getDefaultStyles,
};
