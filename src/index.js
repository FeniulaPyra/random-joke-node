// console.log("First web service starting up...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
// const query = require('querystring');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page
const errorPage = `
<html>
  <head>
    <title>404 - File Not Found!</title>
  </head>
  <body>
    <h1>404 - File Not Found!</h1>
    <p>Check your URL, or your typing!!</p>
    <p>Were you looking for <a href="/random-joke">/random-joke</a>?</p>
  </body>
</html>
`;

const jokes = [
  {
    q: 'Dad, can you put the cat out?',
    a: "I didn't know it was on fire!",
  },
  {
    q: "Why don't sharks like to eat clownfish?",
    a: 'Because they taste funny!',
  },
  {
    q: 'What do you get when you cross a snowmaan with a vampire?',
    a: 'Frostbite',
  },
  {
    q: 'What do you call a very small valentine?',
    a: 'A valen-tiny!',
  },
  {
    q: 'Why did someone fall into the well?',
    a: "They couldn't see that well!",
  },
  {
    q: 'Wat do you call a fake noodle?',
    a: 'An impasta!',
  },
  {
    q: 'What did the sea say to the ocean?',
    a: 'Nothing, they just waved!',
  },
  {
    q: 'Why did the cookie go to the hospital?',
    a: 'It was feeling crummy?',
  },
  {
    q: "Why couldn't the bicycle stand up on its own?",
    a: 'It was two tired!',
  },
  {
    q: 'When does Friday come before Thursday?',
    a: 'In the dictionary!',
  },
];

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  // console.log("parsedUrl=", parsedUrl);
  // console.log("pathname=", pathname);

  if (pathname === '/random-joke') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(jokes[Math.floor(Math.random() * jokes.length)]));
    response.end();
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(errorPage);
    response.end();
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
