const express = require("express");
const app = express();
const cors = require("cors");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x118335c85ca5d400350836ffe10b52c514d8f926": 100, // Alice
  "0x90048c6dc4b8f6fe8d397906262ae2c97651fd1c": 50, // Bob
  "0x06ec9d4a72c5382700df26faf16ee9817253ae8f": 75, // Chloe
};

const nonces = {
  "0x118335c85ca5d400350836ffe10b52c514d8f926": 0, // Alice
  "0x90048c6dc4b8f6fe8d397906262ae2c97651fd1c": 0, // Bob
  "0x06ec9d4a72c5382700df26faf16ee9817253ae8f": 0, // Chloe
};
app.get("/balance/:address", (req, res) => {
  console.log("req body", req.params);
  const { address } = req.params;
  console.log(address);

  const balance = balances[address];
  res.send({ balance });
});

app.get("/nonce/:address", (req, res) => {
  const { address } = req.params;
  const nonce = nonces[address];
  res.send({ nonce });
});

app.post("/send", (req, res) => {
  const { signature, message, recoveryBit } = req.body;
  // check sender's signature first
  const hash = toHex(keccak256(utf8ToBytes(message))); // how to get the msg here
  const publicKey = secp.recoverPublicKey(hash, signature, Number(recoveryBit));
  const signer = `0x` + toHex(keccak256(publicKey.slice(1)).slice(-20));

  // decompose the msg to sender, amount , receipent
  let [sender, recipient, amount, nonce] = message.split(",");

  // ensure that sender is the same as the signer
  if (sender != signer)
    res.status(400).send({ message: "Sender is not singer" });
  const nextNonce = nonces[sender] || 0;
  if (nonce != nextNonce)
    res.status(400).send({ message: "Wrong nonce is used" });

  updateNonce(sender);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({
      balance: balances[sender],
      address: sender,
      publicKey: toHex(publicKey),
      recipient: recipient,
      amount,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
function updateNonce(address) {
  if (!nonces[address]) {
    nonces[address] = 1;
  } else nonces[address]++;
}
