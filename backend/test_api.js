const http = require('http');

const data = JSON.stringify({ value: 'Test Address 123' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/settings/contact_address',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
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

req.write(data);
req.end();
