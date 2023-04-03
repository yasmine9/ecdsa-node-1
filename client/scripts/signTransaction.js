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
    "0x042448aa1c326163097ee4857eeeddbb8b4a5b84,0xc30093d173e5bd9620e04a91abe12141e787c64f,5";
  const hash = keccak256(utf8ToBytes(message));
  const signature = await secp.sign(
    hash,
    "972dc3a945adb413003fb946e82881e07d027a99e10ffa144ab75f7630b4b446",
    { recovered: true }
  );
  console.log(toHex(signature[0]));
  console.log(signature[1]);
}

sign().then(console.log("finish"));
