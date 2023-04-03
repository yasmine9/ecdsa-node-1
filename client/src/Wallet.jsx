import server from "./server";

function Wallet({ message, setMessage, address, setRecoveryBit, recoveryBit, signature, setSignature, setAddress, balance, setBalance }) {
  
  async function onChange(evt) {
    setAddress(evt.target.value);    
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onRecoverySet(evt){
    setRecoveryBit(evt.target.value)
  }

  async function onMessageSet(evt){
    setMessage(evt.target.value)
  }
  async function onSignatureSet(evt){
    setSignature(evt.target.value)
  }
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Recovery key
        <input placeholder="Type your recovery bit" value={recoveryBit} onChange={onRecoverySet} ></input>
      </label>
      <label>
        Message
        <input placeholder="Type your msg in format: adr1,adr2,amount" value={message} onChange={onMessageSet} ></input>
      </label>
      <label>
        Transaction signature
        <input placeholder="Type your signed transfer transaction" value={signature} onChange={onSignatureSet}></input>
      </label>
      <label>
        Address
        <input placeholder="Type address (auto filled when transaction sent)" value={address} onChange={onChange}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
