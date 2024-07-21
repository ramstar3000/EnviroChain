const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

const { mnemonicToMiniSecret, sr25519PairFromSeed  } = require('@polkadot/util-crypto');

const fs = require('fs').promises;
const crypto = require('crypto');
const { get } = require('http');
const path = require('path');


async function connectToPolkadot() {
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    return api;
  }


  async function createAndSignTransaction(api, hash) {
      const mnemonic = 'salt similar soccer drip exhibit crime ladder collect silver vague team net'; // Replace with your mnemonic
      const seed = mnemonicToMiniSecret(mnemonic);
      const keyPair = sr25519PairFromSeed(seed);
    
      const keyring = new Keyring({ type: 'sr25519' });
      const sender = keyring.addFromSeed(seed);
    
      // Create a transaction to store the hash (can use system.remark or a custom smart contract)
      const tx = api.tx.system.remark(hash);
    
      // Sign and send the transaction

      return new Promise((resolve, reject) => {

        tx.signAndSend(sender, ({ status }) => {
        if (status.isInBlock) {
          console.log('Transaction included in block');
        } else if (status.isFinalized) {
          console.log('Transaction finalized');
          resolve(tx.hash.toHex())
        }
      }).catch(reject);

    });
    
      console.log('Transaction hash:', hashHex);
      return hashHex;
    }


async function addToChain(hash) {
  const api = await connectToPolkadot();
  const result = await createAndSignTransaction(api, hash);
  console.log('Transaction hash:', result);
  return result;
}

// addToChain('hash').catch(console.error);
  
async function calculateCsvHash(filePath) {
    try {
      // Read the file content
      const data = await fs.readFile(filePath, 'utf8');
      
      // Calculate the SHA-256 hash
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      
      return hash;
    } catch (error) {
      console.error('Error reading or hashing the file:', error);
      throw error;
    }
  }
  
  async function getTransactionDetails() {
    try {
      // Fetch the transaction info
      const wsProvider = new WsProvider('wss://rpc.polkadot.io');
      const api = await ApiPromise.create({ provider: wsProvider });

      const txHash = '0xe862b3d63bfa3e978b21e82f5521f7eb571a27b773fee5f98a8a692459598d2c';

      const txStatus = await api.query.system.events.at(txHash);
      console.log(`Transaction Status: ${JSON.stringify(txStatus, null, 2)}`);


      const tx = await api.rpc.chain.getBlock(txHash);
  
      // Display the transaction details
      console.log(`Transaction Details: ${JSON.stringify(tx, null, 2)}`);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  }


  
  // (async () => {
  //   try {
  //     // const filePath = path.join(__dirname, "futuristic_city_traffic.csv") // Replace with your CSV file path
  //     // const hash = await calculateCsvHash("abhvin");
  //     // console.log('Calculated Hash:', hash);

  //     // Now add this onto the chain

  //     addToChain("b3d7740b91a49313a61dcab5b32f9ca440ed1e3c318c428e9a50fc392922fa7a");


  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // })();

  getTransactionDetails().catch(console.error);