//Using crypto and fs modules
const { generateKeyPair } = require('crypto');
const fs = require('fs');
  
  generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  }, (err, publicKey, privateKey) => {
    //Change the file paths as per use
    fs.writeFileSync('D:/BlocksAndChains/Assignment2/public1.pem', publicKey);
    fs.writeFileSync('D:/BlocksAndChains/Assignment2/private1.pem', privateKey);
  });