import server from "./server";

import {secp256k1} from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const address = String(toHex(secp256k1.getPublicKey(evt.target.value)));//this way updates the address right away
    setAddress(address);//using the pattern commentd below it is always delayded of 1 typed character
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    //const newAddress = privateKey;
   // setAddress(newAddress);
    console.log("Within Wallet compoent:");
    console.log("privateKey: " + privateKey);
    console.log("address: " + address);
    if (address) {
     // const {
      //  data: { balance },
      //} = await server.get(`balance/${address}`);
      //setBalance(balance);
      server.get(`balance/${address}`).then(res => {
        const newBalance = res.data;
        console.log("withing the Promise:");
        console.log("address: " + address);
        console.log("newBlance: " + newBalance);
        setBalance(newBalance.balance);//the server returns an object {key:value} --> {balance:balance}
        console.log("newBalance.balance: " + newBalance.balance);
      });
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private Key
        <input  placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <label>
        Wallet Address: {address}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
