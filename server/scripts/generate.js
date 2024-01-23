const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");

const privKey = secp256k1.utils.randomPrivateKey();
const pubKey = secp256k1.getPublicKey(privKey);

console.log("{privKey: " + toHex(privKey) + ",\npubKey: " + toHex(pubKey) + "}");

//node generate.js
keyPairs =
[
    {privKey: "d42b0f9247ac4099bf51368d644b20a0abb9c4bfeb60597be1eef92f42d2e8e6",
        pubKey: "02c268d27a33691e3f70b53218bbfb51f33a92b173b8a7c574fa2a395c21343561"},
    {privKey: "b0a100cad386d5e6832e28e00f8017e3ec60b752968a67a9382aed5fc08f2455",
        pubKey: "03e02fecd4a5a0e8fef9dabed2d459817058ce514745603224524bdb10ae5284b5"},
    {privKey: "d71a3ffe8a582dcf3e03b3df3cc2d51fd064c939f2f3e7f07418d2ea2ca5c6d9",
        pubKey: "02d997729d3c00716e1432c572283394b93b97fb09130431a70c38d56a66996da7"}
];