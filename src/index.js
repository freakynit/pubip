#!/usr/bin/env node

const https = require('https');

function getPublicIP() {
  https.get('https://api.ipify.org?format=json', (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log(result.ip);
      } catch (error) {
        console.error('Error parsing response:', error.message);
        process.exit(1);
      }
    });
  }).on('error', (error) => {
    console.error('Error fetching IP:', error.message);
    process.exit(1);
  });
}

getPublicIP();
