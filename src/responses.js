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

const shuffle = (arr) => {
  for (let i = arr.length; i >= 0; i -= 1) {
    const item = Math.floor(Math.random() * i);

    arr.push(arr[item]);

    arr.splice(item, 1);
  }
};

const getRandomJoke = (request, response, params, acceptedTypes, httpMethod) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  const xmlResponse = `
  <joke>
    <q>${joke.q}</q>
    <a>${joke.a}</a>
  </joke>
`;
  let bigString;

  const headers = {};

  if (acceptedTypes.includes('text/xml')) {
    headers['Content-Type'] = 'text/xml';
    bigString = xmlResponse;
  } else {
    headers['Content-Type'] = 'application/json';
    bigString = JSON.stringify(joke);
  }

  if (httpMethod === 'HEAD') headers['Content-Length'] = Buffer.byteLength(bigString, 'utf-8');

  response.writeHead(200, headers);
  if (httpMethod === 'GET') response.write(bigString);
  response.end();
};

const getRandomJokes = (request, response, params, acceptedTypes, httpMethod) => {
  shuffle(jokes);

  let limit = Math.floor(params.limit) || 1;
  if (limit > jokes.length) limit = jokes.length;
  else if (limit < 0) limit = 1;

  const randJokes = jokes.slice(0, limit);

  const headers = {};

  let bigString;
  if (acceptedTypes.includes('text/xml')) {
    bigString = '<jokes>';
    randJokes.forEach((joke) => {
      bigString += `
        <joke>
          <q>${joke.q}</q>
          <a>${joke.a}</a>
        </joke>
      `;
    });

    bigString += '</jokes>';
    headers['Content-Type'] = 'text/xml';
  } else {
    bigString = JSON.stringify(randJokes);
    headers['Content-Type'] = 'application/json';
  }

  if (httpMethod === 'HEAD') {
    headers['Content-Length'] = Buffer.byteLength(bigString, 'utf-8');
  }

  response.writeHead(200, headers);
  if (httpMethod === 'GET') response.write(bigString);
  response.end();
};

module.exports = {
  getRandomJoke,
  getRandomJokes,
};
