const now = require('nano-time');
const fs = require('fs');
const readline = require('readline-sync');

let c=0;
let pth=readline.question("Enter the path of transaction data\n");
let buf=fs.readFileSync(pth);
console.log("Time: "+buf.readBigInt64BE(c));
c+=8;
let ni=buf.readInt32BE(c);
c+=4;
console.log("Number of inputs: "+ni);
for(let i=1;i<=ni;i++)
{
    console.log("Transaction ID for input "+i+": "+buf.toString('hex',c,c+32));
    c+=32;
    console.log("Index of output for input "+i+": "+buf.readInt32BE(c));
    c+=4;
    let x=(buf.readInt32BE(c));
    console.log("Length of signature for input "+i+": "+x);
    c+=4;
    console.log("Length of signature for input "+i+": "+buf.toString('hex',c,c+x));
    c+=x;
}
let no=buf.readInt32BE(c);
console.log("Number of outputs: "+no);
c+=4;
for(let i=1;i<=no;i++)
{
    console.log("Number of coins for output "+i+": "+buf.readBigInt64BE(c));
    c+=8;
    let x=buf.readInt32BE(c);
    console.log("Length of public key for output "+i+": "+x);
    c+=4;
    console.log("Public key for output "+i+":\n"+buf.toString('utf-8',c,c+x));
    c+=x;
}