//Using crypto, readline and fs modules
const readline = require('readline-sync');
const crypto  = require('crypto');
const { createVerify } = require('crypto');
const fs = require('fs');

let pth1 = readline.question("Enter path of public key\n");
const publicKey = fs.readFileSync(pth1,'utf-8');
let str1 = readline.question("Enter unencrypted text\n");
let pth2 = readline.question("Enter path to encrypted text\n");
const str2=fs.readFileSync(pth2,'utf-8');

const verify = createVerify('SHA256');//Not sure what exactly the variable verify is.
verify.update(str1,'utf-8');
verify.end();
console.log(verify.verify({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING },str2,'hex'));