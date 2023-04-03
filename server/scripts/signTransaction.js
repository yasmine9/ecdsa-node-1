const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

/*
Helper script to generate a new account: public/private keys and a wallet address.
Note that this script will be used locally by the user, private key is not sent to the server. 
*/
async function sign() {
  const message =
    "0x118335c85ca5d400350836ffe10b52c514d8f926,0x90048c6dc4b8f6fe8d397906262ae2c97651fd1c,5,0";
  const hash = keccak256(utf8ToBytes(message));
  const signature = await secp.sign(
    hash,
    "f1ec1d7d96717bbffaedca1d16b7e4d22bf2c5ae863447dd89fa4a2cc08f0ade",
    { recovered: true }
  );
  console.log("Message:", message);
  console.log(toHex(signature[0]));
  console.log(signature[1]);
}

sign().then(console.log("finish"));
