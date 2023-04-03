const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
/*
Helper script to generate a new account: public/private keys and a wallet address.
Note that this script will be used locally by the user, private key is not sent to the server. 
*/
const privateKey = secp.utils.randomPrivateKey();
console.log("Private Key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log("Public Key:", toHex(publicKey));

// In ethereum, the address is the last 20bytes of the keccak of the public key.
const address = keccak256(publicKey.slice(1)).slice(-20);
console.log("Your address:", `0x` + toHex(address));
