const now = require('nano-time');
const fs = require('fs');
const readline = require('readline-sync');

let ni=parseInt(readline.question("Enter number of inputs\n"));
let buf=Buffer.alloc(4);
let tempbuf=Buffer.alloc(4);
buf.writeInt32BE(ni);
for(let i=1;i<=ni;i++)
{
    buf=Buffer.concat([buf,Buffer.from(readline.question("Enter Transaction ID for input "+i+"\n").padStart(32,'0'),'hex')]);
    tempbuf.writeInt32BE(parseInt(readline.question("Enter Index of output for input "+i+"\n")));
    buf=Buffer.concat([buf,tempbuf]);
    let x=parseInt(readline.question("Enter length of signature for input "+i+" in bytes\n"));
    tempbuf.writeInt32BE(x);
    buf=Buffer.concat([buf,tempbuf]);
    buf=Buffer.concat([buf,Buffer.from(readline.question("Enter Signature for input "+i+"\n").padStart(x,'0'),'hex')]);
}
let no = parseInt(readline.question("Enter number of output\n"));
tempbuf.writeInt32BE(no);
buf=Buffer.concat([buf,tempbuf]);
for(let i=1;i<=no;i++)
{
    let tempbuf2=Buffer.alloc(8);
    tempbuf2.writeBigInt64BE(BigInt(readline.question("Enter number of coins for output "+i+"\n")));
    buf=Buffer.concat([buf,tempbuf2]);
    let x=parseInt(readline.question("Enter length of the public key for output "+i+" in bytes \n"));
    tempbuf.writeInt32BE(x);
    buf=Buffer.concat([buf,tempbuf]);
    let pth=readline.question("Enter the path of public key in pem format for output "+i+"\n");
    buf=Buffer.concat([buf,fs.readFileSync(pth)]);
}
let tempbuf2=Buffer.alloc(8);
tempbuf2.writeBigInt64BE(BigInt(now()));
buf=Buffer.concat([tempbuf2,buf]);
console.log(buf);
h=require("crypto").createHash("sha256").update(buf).digest("hex");
fs.writeFileSync('Assignment3\\'+h+'.dat', buf);