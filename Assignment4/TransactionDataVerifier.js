const now = require('nano-time');
const fs = require('fs');
const readline = require('readline-sync');

let c=0;
let pth=readline.question("Enter the path of transaction data\n");
let buf=fs.readFileSync(pth);
console.log("Transaction ID: "+require("crypto").createHash("sha256").update(buf).digest("hex"));
console.log("Timestamp: "+buf.readBigInt64BE(c));
c+=8;
let ni=buf.readInt32BE(c);
c+=4;
console.log("Number of inputs: "+ni);
for(let i=1;i<=ni;i++)
{
    console.log("\tInput "+i+":");
    console.log("\t\tTransaction ID: "+buf.toString('hex',c,c+32));
    c+=32;
    console.log("\t\tIndex: "+buf.readInt32BE(c));
    c+=4;
    let x=(buf.readInt32BE(c));
    console.log("\t\tLength of the signature: "+x);
    c+=4;
    console.log("\t\tSignature: "+buf.toString('hex',c,c+x));
    c+=x;
}
let no=buf.readInt32BE(c);
console.log("Number of outputs: "+no);
c+=4;
for(let i=1;i<=no;i++)
{
    console.log("\tOutput"+i+":")
    console.log("\t\tNumber of coins: "+buf.readBigInt64BE(c));
    c+=8;
    let x=buf.readInt32BE(c);
    console.log("\t\tLength of public key: "+x);
    c+=4;
    console.log("\t\tPublic key:"+buf.toString('utf-8',c,c+x));
    c+=x;
}