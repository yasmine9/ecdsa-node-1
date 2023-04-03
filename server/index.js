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
  "0x042448aa1c326163097ee4857eeeddbb8b4a5b84": 100, // Alice
  "0xc30093d173e5bd9620e04a91abe12141e787c64f": 50, // Bob
  "0x3863942de8536eedcee5d5c67b60c71d89d3494d": 75, // Chloe
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, message, recoveryBit } = req.body;
  // check sender's signature first
  const hash = toHex(keccak256(utf8ToBytes(message))); // how to get the msg here
  const publicKey = secp.recoverPublicKey(hash, signature, Number(recoveryBit));
  const signer = `0x` + toHex(keccak256(publicKey.slice(1)).slice(-20));

  // decompose the msg to sender, amount , receipent
  let [sender, recipient, amount] = message.split(",");

  // ensure that sender is the same as the signer
  if (sender != signer)
    res.status(400).send({ message: "Sender is not singer" });

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
