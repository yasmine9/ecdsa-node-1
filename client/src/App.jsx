import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        signature = {signature}
        setSignature= {setSignature}
        message={message}
        setMessage={setMessage}
        recoveryBit={recoveryBit}
        setRecoveryBit={setRecoveryBit}

      />
      <Transfer setBalance={setBalance} setAddress={setAddress}
  signature = {signature} message={message} recoveryBit={recoveryBit} />
    </div>
  );
}

export default App;
