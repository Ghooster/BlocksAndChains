//Implementation of SHA256 function
//The speed is really show tho probably due to use of strings to store the binary and hex values
function sha(str)
{
    const L = str.length;

    function rr(s, d)//Right rotate string by d
    {
        return s.substr(-1 * d, d) + s.substr(0, s.length - d);
    }

    function rs(s, d)//Right shift binary string by d
    {
        return s.substr(0, s.length - d).padStart(32, '0');
    }

    function sx3(s1, s2, s3)//Bitwise XOR on three binary strings 
    {
        let s = "";
        for (let i = 0; i < 32; i++) {
            if (s1[i] == '0' && s2[i] == '0' && s3[i] == '0' || s1[i] == '0' && s2[i] == '1' && s3[i] == '1' || s1[i] == '1' && s2[i] == '0' && s3[i] == '1' || s1[i] == '1' && s2[i] == '1' && s3[i] == '0')
                s += '0';
            else
                s += '1';
        }
        return s;
    }

    function sx2(s1, s2)//Bitwise XOR on two binary strings
    {
        let s = "";
        for (let i = 0; i < 32; i++) {
            if (s1[i] == '0' && s2[i] == '0' || s1[i] == '1' && s2[i] == '1')
                s += '0';
            else
                s += '1';
        }
        return s;
    }

    function and(s1, s2)//Bitwise AND on two binary strings
    {
        let s = "";
        for (let i = 0; i < 32; i++) {
            if (s1[i] == '1' && s2[i] == '1')
                s += '1';
            else
                s += '0';
        }
        return s;
    }

    function sa(s1, s2)//Add two binary strings(modulo 2^32)
    {
        let c = '0';
        let s = '';
        for (let i = 31; i >= 0; i--) {
            if (s1[i] == '0' && s2[i] == '0') {
                s = c + s;
                c = '0';
            }
            else if (s1[i] == '1' && s2[i] == '0' || s2[i] == '1' && s1[i] == '0') {
                if (c == '0')
                    s = '1' + s;
                else {
                    s = '0' + s;
                    c = '1';
                }
            }
            else {
                if (c == '1')
                    s = '1' + s;
                else {
                    s = '0' + s;
                    c = '1';
                }
            }
        }
        return s;
    }

    function not(s1)//Bitwise NOT on a binary string
    {
        let s = "";
        for (let i = 0; i < 32; i++) {
            if (s1[i] == '0')
                s += '1';
            else
                s += '0';
        }
        return s;
    }

    let x = "";
    for (let i = 0; i < str.length; i++)
        x += str.charCodeAt(i).toString(2).padStart(8, '0');
    x += "1";
    let wd = 1 + Math.floor(x.length / 512);
    if (512 * wd - x.length < 64)
        wd++;
    x = x.padEnd(512 * wd - 64, '0');
    x += (L * 8).toString(2).padStart(64, '0');

    let ha = ["01101010000010011110011001100111", "10111011011001111010111010000101", "00111100011011101111001101110010", "10100101010011111111010100111010", "01010001000011100101001001111111", "10011011000001010110100010001100", "00011111100000111101100110101011", "01011011111000001100110100011001"];
    const k = ["01000010100010100010111110011000", "01110001001101110100010010010001", "10110101110000001111101111001111", "11101001101101011101101110100101", "00111001010101101100001001011011", "01011001111100010001000111110001", "10010010001111111000001010100100", "10101011000111000101111011010101", "11011000000001111010101010011000", "00010010100000110101101100000001", "00100100001100011000010110111110", "01010101000011000111110111000011", "01110010101111100101110101110100", "10000000110111101011000111111110", "10011011110111000000011010100111", "11000001100110111111000101110100", "11100100100110110110100111000001", "11101111101111100100011110000110", "00001111110000011001110111000110", "00100100000011001010000111001100", "00101101111010010010110001101111", "01001010011101001000010010101010", "01011100101100001010100111011100", "01110110111110011000100011011010", "10011000001111100101000101010010", "10101000001100011100011001101101", "10110000000000110010011111001000", "10111111010110010111111111000111", "11000110111000000000101111110011", "11010101101001111001000101000111", "00000110110010100110001101010001", "00010100001010010010100101100111", "00100111101101110000101010000101", "00101110000110110010000100111000", "01001101001011000110110111111100", "01010011001110000000110100010011", "01100101000010100111001101010100", "01110110011010100000101010111011", "10000001110000101100100100101110", "10010010011100100010110010000101", "10100010101111111110100010100001", "10101000000110100110011001001011", "11000010010010111000101101110000", "11000111011011000101000110100011", "11010001100100101110100000011001", "11010110100110010000011000100100", "11110100000011100011010110000101", "00010000011010101010000001110000", "00011001101001001100000100010110", "00011110001101110110110000001000", "00100111010010000111011101001100", "00110100101100001011110010110101", "00111001000111000000110010110011", "01001110110110001010101001001010", "01011011100111001100101001001111", "01101000001011100110111111110011", "01110100100011111000001011101110", "01111000101001010110001101101111", "10000100110010000111100000010100", "10001100110001110000001000001000", "10010000101111101111111111111010", "10100100010100000110110011101011", "10111110111110011010001111110111", "11000110011100010111100011110010"];

    for (let i = 0; i < wd; i++) {
        let w = [];
        for (let j = 0; j < 64; j++)
            if (j < 16)
                w[j] = x.substr(512 * i + j * 32, 32);
            else
                w[j] = "00000000000000000000000000000000";
        for (i = 16; i < 64; i++) {
            let s0 = sx3(rr(w[i - 15], 7), rr(w[i - 15], 18), rs(w[i - 15], 3));
            let s1 = sx3(rr(w[i - 2], 17), rr(w[i - 2], 19), rs(w[i - 2], 10));
            w[i] = sa(w[i - 16], sa(s0, sa(w[i - 7], s1)));
        }
        let a = ha[0], b = ha[1], c = ha[2], d = ha[3], e = ha[4], f = ha[5], g = ha[6], h = ha[7];
        for (let i = 0; i < 64; i++) {
            let S1 = sx3(rr(e, 6), rr(e, 11), rr(e, 25));
            let ch = sx2(and(e, f), and(not(e), g));
            let temp1 = sa(h, sa(S1, sa(ch, sa(k[i], w[i]))));
            let S0 = sx3(rr(a, 2), rr(a, 13), rr(a, 22));
            let maj = sx3(and(a, b), and(a, c), and(b, c));
            let temp2 = sa(S0, maj);
            h = g;
            g = f;
            f = e;
            e = sa(d, temp1);
            d = c;
            c = b;
            b = a;
            a = sa(temp1, temp2);
        }
        ha[0] = sa(ha[0], a);
        ha[1] = sa(ha[1], b);
        ha[2] = sa(ha[2], c);
        ha[3] = sa(ha[3], d);
        ha[4] = sa(ha[4], e);
        ha[5] = sa(ha[5], f);
        ha[6] = sa(ha[6], g);
        ha[7] = sa(ha[7], h);
    }

    let digest = parseInt(ha[0], 2).toString(16) + parseInt(ha[1], 2).toString(16) + parseInt(ha[2], 2).toString(16) + parseInt(ha[3], 2).toString(16) + parseInt(ha[4], 2).toString(16) + parseInt(ha[5], 2).toString(16) + parseInt(ha[6], 2).toString(16) + parseInt(ha[7], 2).toString(16);
    digest = digest.toUpperCase();
    return digest;
}

const readline = require('readline-sync');//Using readline-sync module for input
let str = readline.question("Enter your string\n");

for(let i=1;;i++)
{
       if(sha(str+i).startsWith("0000"))
        {
            console.log(i);
            break;
        }
}