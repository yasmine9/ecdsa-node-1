# ECDSA Node

## Description

This project is an example of using a client and server to facilitate transfers between different addresses. We use Elliptic Curve Digital Signatures to make sure transfers are done by the sender address only.

## How is the logic built

- Use `generateKeys.js` script to generate a private/public key pair. As an example wwe generate 3 users and assigned an initial balance to them. Addresses with their respective private/public keys are mentioned at the end of the script.
- Use `signTransaction.js` script to sign a transfer transaction using your private key. Make sure to replace the 2nd sign parameter by your private key, and msg by the transfer to be done. the message follows this format : `address1,address2,amount,nonce`. You can get the nonce to be used by putting your address in the frontEnd and reading the `Next Nonce` field.
- User should pass in the recoveryBit, message and signature in the frontEnd ( the signature ad recoveryBit are returned by `signTransaction` script). Then hit the `Submit` botton.
- The server will recover the public key of the signer, and his address:
  - if the signer address is different from the sender of funds, an error is returned.
  - if not and the sender has enough funds, the transfer is executed.
  - we return the amount, sender address and receipent address to the frontend to be shown.
- The private key of the user is never sent to the app ( neither client nor server side) which prevent it from being compromised.
- It is not possible to transfer funds from a different account, as the signer of the transaction should be the same as the sender of funds.
- We introduce a `nonce` for each user, to prevent signature to be re-used by an attacker (replay attack). For every new transaction sent by a user, he should use the `nextNonce`.

## How to run the project

### Client

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application

### Server

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server
