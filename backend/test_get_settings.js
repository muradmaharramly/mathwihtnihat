const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/public/settings',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => responseBody += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`BODY: ${responseBody}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
