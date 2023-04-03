import server from "./server";

function Wallet({ message, setMessage, address, setRecoveryBit, recoveryBit, signature, setSignature, setAddress, balance, setBalance,nonce, setNonce }) {
  
  async function onChange(evt) {
    console.log('called',evt.target.value);
    let addr = evt.target.value;
    setAddress(addr);    
      const {
        data: { balance },
      } = await server.get(`balance/${addr}`);
      setBalance(balance);

      const {
        data: { nonce },
      } = await server.get(`nonce/${addr}`);
      setNonce(nonce);
    
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
      <input disabled="true" placeholder="Balance" value={balance} ></input>

      <div className="balance" value={balance}>Balance: {balance}</div>
      <div className="balance"value = {nonce}>Next nonce: {nonce}</div>
    </div>
  );
}

export default Wallet;
