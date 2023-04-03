import { useState } from "react";
import server from "./server";

function Transfer({ message, setAddress, setBalance, signature, recoveryBit }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  async function transfer(evt) {
    evt.preventDefault();
    console.log('recovery bit before',recoveryBit);

    try {
      const {
        data: { balance, address,recipient,amount },
      } = await server.post(`send`, {
        signature,
        message,
        recoveryBit
      });
      setBalance(balance);
      setAddress(address);
      setRecipient(recipient);
      setSendAmount(amount);
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <div className="display">Send Amount: {sendAmount}</div>
      <div className="display">Recipient: {recipient}</div>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
