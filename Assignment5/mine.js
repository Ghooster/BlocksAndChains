const now = require('nano-time');
const fs = require('fs');
const readline = require('readline-sync');

let buf=Buffer.alloc(4);
buf.writeInt32BE(parseInt(readline.question("Enter the index of the block\n")));
buf=Buffer.concat([buf,Buffer.from(readline.question("Enter the hash of parent block\n"),'hex')]);
let target=readline.question("Enter the target value\n");
buf=Buffer.concat([buf,Buffer.from(target,'hex')]);
buf=Buffer.concat([buf,Buffer.from(require("crypto").createHash("sha256").update(fs.readFileSync(readline.question("Enter the path of block body\n"))).digest("hex"),'hex')]);
let tempts=BigInt(now());
let ts;
for(let i=BigInt(1);;i++)
{
    ts=BigInt(now());
    let tempbuf2=Buffer.alloc(8);
    tempbuf2.writeBigInt64BE(BigInt(now()));
    let tempbuf3=Buffer.alloc(8);
    tempbuf3.writeBigInt64BE(i);
    let tempbuf=Buffer.concat([buf,tempbuf2,tempbuf3]);
       if(require("crypto").createHash("sha256").update(tempbuf).digest("hex")<target)
        {
            console.log("Nonce: "+i);
            console.log("Timestamp: "+ts);
            console.log("Hash: "+require("crypto").createHash("sha256").update(tempbuf).digest("hex"));
            buf=tempbuf;
            break;
        }
}