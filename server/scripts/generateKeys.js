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

/* Example accounts 

Private Key: f1ec1d7d96717bbffaedca1d16b7e4d22bf2c5ae863447dd89fa4a2cc08f0ade
Public Key: 04f237822bbf9127b35737912c05cd8f5de2eb89a95d52f57af853b703c1d4e484fed4ad9da27e5ce4d0afae25e2cb732dd8f5a0f371d0fc7625eaf7929bcc4720
Your address: 0x118335c85ca5d400350836ffe10b52c514d8f926

Private Key: 22f941beac8d0b3277d209dae3a703c6be6010bdac2934c737af221c3c27cec5
Public Key: 04e8cdb23a843497b507663ea0a237f26101bf3c01f359e9eb96413d39bc0264832f80cfa841311bc05f47acaa47f5d3bd9c681fc5d7d449f35452782934af209b
Your address: 0x90048c6dc4b8f6fe8d397906262ae2c97651fd1c

Private Key: eeeef5673651c3c73ae8688103c9e2a3379f9dce97ef2e5bd90c774d3c990b47
Public Key: 0496424e2e4f71973570912df3ba8b210b4511411b01cf8bebc9019d3f6a7fe8d15a4f90dcf4505970c1fb99f0d86c180af2d0f36e6bea487fac68c99baddb7889
Your address: 0x06ec9d4a72c5382700df26faf16ee9817253ae8f

*/
