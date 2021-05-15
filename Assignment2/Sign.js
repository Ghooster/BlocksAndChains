//Using crypto, readline and fs modules
const readline = require('readline-sync');
const crypto  = require('crypto');
const {createSign } = require('crypto');
const fs = require('fs');

let str = readline.question("Enter text to sign\n");
let pth = readline.question("Enter path of private key\n");
const privateKey = fs.readFileSync(pth,'utf-8');

const sign = createSign('SHA256');//Not sure what exactly the variable sign is.
sign.write(str);
sign.end();
const signature = sign.sign({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, 'hex');
//fs.writeFileSync('D:/BlocksAndChains/Assignment2/Encrypted.txt', signature);
console.log(signature);