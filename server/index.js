const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const {secp256k1} = require("ethereum-cryptography/secp256k1");

const balances = {
  "02c268d27a33691e3f70b53218bbfb51f33a92b173b8a7c574fa2a395c21343561": 100,
  "03e02fecd4a5a0e8fef9dabed2d459817058ce514745603224524bdb10ae5284b5": 50,
  "02d997729d3c00716e1432c572283394b93b97fb09130431a70c38d56a66996da7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send( {balance} );
});

app.post("/send", (req, res) => {
  //TO-DO:
  //get signature from client
  //recover the public address from signature

  //if the signature matchs an addres whoever typed in the private key owns that wallet
  //if there are anough funds we can go on 
  //if the recippient is one of the addresses we can go on (usually this check is not made)

  const { sender, recipient, amount, signCompHex, messageHash } = req.body;
  
  const isValidTransaction = secp256k1.verify(signCompHex, "0234536543ab", sender);

  
  if(isValidTransaction){


    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }

  }
  else{
    //say to the client is not a valid transaction
    res.status(400).send({ message: "can't verify the sender is really willing to transfer the amount to the recipient!!" });
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
