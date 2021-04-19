//Using readline-sync module and crypto module

const readline = require('readline-sync');
let str = readline.question("Enter your string\n");

for(let i=1;;i++)
{
       if(require("crypto").createHash("sha256").update(str+i).digest("hex").toString().startsWith("0000"))
        {
            console.log(i);
            break;
        }
}