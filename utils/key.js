const fs = require('fs');
const uuid = require('uuid');

const jwtSecretKey = uuid.v4().replace(/-/g, '');
const envContent = `JWT_SECRET_KEY=${jwtSecretKey}\n`;

fs.writeFileSync('.env', envContent);

console.log('key has been generated and stored in .env');
