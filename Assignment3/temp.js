const now = require('nano-time');
const fs = require('fs');
const readline = require('readline-sync');

let ni=parseInt(readline.question("Enter number of inputs\n"));
let str=ni.toString(2).padStart(32,'0');
//str=str+'\n';
for(let i=1;i<=ni;i++)
{
    str=str+BigInt("0x"+readline.question("Enter Transaction ID for input "+i+"\n")).toString(2).padStart(256,'0');
    //str=str+'\n';
    str=str+parseInt(readline.question("Enter Index of output for input "+i+"\n")).toString(2).padStart(32,'0');
    //str=str+'\n';
    let x=parseInt(readline.question("Enter length of signature for input "+i+" in bits\n"));
    str=str+x.toString(2).padStart(32,'0');
    //str=str+'\n';
    str=str+BigInt("0x"+readline.question("Enter Signature for "+i+"\n")).toString(2).padStart(x,'0');
    //str=str+'\n';
}
let no = parseInt(readline.question("Enter number of output\n"));
str=str+no.toString(2).padStart(32,'0');
//str=str+'\n';
for(let i=1;i<=no;i++)
{
    str=str+BigInt(readline.question("Enter number of coins for output "+i+"\n")).toString(2).padStart(64,'0');
    //str=str+'\n';
    let x=parseInt(readline.question("Enter length of the public key for output "+i+" in bits \n"));
    str=str+x.toString(2).padStart(32,'0');
    //str=str+'\n';
    let pth=readline.question("Enter the path of public key in pem format for output "+i+"\n");
    str=str+BigInt('0x'+fs.readFileSync(pth).toString('hex')).toString(2).padStart(x,'0');
    //str=str+"\n";
}
str=BigInt(now()).toString(2).padStart(64,'0')+str;
const arr = str.split('').reduce((s, c) => {let l = s.length-1; (s[l] && s[l].length < 8) ? s[l] += c : s.push(c); return s;}, []);
let buf=Buffer.from(arr);
console.log(buf);
h=require("crypto").createHash("sha256").update(buf).digest("hex");
fs.writeFileSync('D:\\Study\\BlocksAndChains\\Assignment3\\'+h+'.dat', buf);