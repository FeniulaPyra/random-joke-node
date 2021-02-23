const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const jokePage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const get404Response = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getJokeClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokePage);
  response.end();
};

module.exports = {
  get404Response,
  getJokeClient,
};
