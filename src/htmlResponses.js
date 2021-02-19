const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);

const get404Response = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

module.exports = {
  get404Response,
};
