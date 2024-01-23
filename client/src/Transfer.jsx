import { useState } from "react";
import server from "./server";

import {secp256k1} from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    console.log("within transfer func");
    console.log("privateKey: " + privateKey);
    if(privateKey){//only do something if something has been typed in the privateKey field
      let messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";//eventually modify and 
      //send in a message that clearly specifies the intention of the sender to send that amount to the recipient
      const signature = secp256k1.sign(messageHash, privateKey);//get the signature
          //sing is supposed to return a pair of integers {r, s}
          //where r is the x-cordinate of the elliptic curve
          //and s is a proof confirming that the signer knows the message hash and the priavte key 
      
      //console.log("signature: " + signature);//it doesn't work --> do not kwno how to serailize BIgInt
      //const stringifiedSignature = JSON.stringify(signature); --> do not kwno how to serailize BIgInt
      //const hexSignature = toHex(signature); --> Error: Uint8Array expected
      //console.log("hexSignature: " + hexSignature);
      
     // const signatureString = signature.toString();// it does work --> i can pass the signature to the server
        //not sure what i am passing in
     // console.log("signatureString: " + signatureString);
     
     //const signR = signature.r.toString();
     //const signS = signature.s.toString();
     //const signRecovery = signature.recovery.toString();
     const signCompHex = signature.toCompactHex();
    //console.log("within transfer: ");
     //console.log("signR: " +  signR);
     //console.log("singS: " + signS);
     //console.log("signRecovery: " + signRecovery);
     console.log("signCompHex: " + signCompHex);
     //const signRawBytes = signature.toCompactRawBytes();
     //console.log("signRawBytes: " + signRawBytes);
    
    
    //just checked what would happen with wrong messageHash
     // messageHash = "a33321f98e4ff1c283c76998f147545d339b3db534c6d886decb4209f28";

      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
          //signature,//send signature to server
          //signR,
         // signS,
          signCompHex,
          messageHash,
        });
        setBalance(balance);
      } catch (ex) {
        alert(ex.response.data.message); //it does gives a typeError: 
        //properties of undefined (reading 'data') for some reason
       // alert(ex);// still gives this: TypeError: Do not know how to serialize a BigInt 
        //because of the signature
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
