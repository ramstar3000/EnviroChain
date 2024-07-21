const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

const { mnemonicToMiniSecret, sr25519PairFromSeed  } = require('@polkadot/util-crypto');

const fs = require('fs').promises;
const crypto = require('crypto');
const path = require('path');


async function connectToPolkadot() {
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    return api;
  }


  async function createAndSignTransaction(api, hash) {
      const mnemonic = ''; // Replace with your mnemonic
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
          resolve(tx.hash.toHex)
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
  

  
  (async () => {
    try {
      const filePath = path.join(__dirname, "futuristic_city_traffic.csv") // Replace with your CSV file path
      const hash = await calculateCsvHash(filePath);
      console.log('Calculated Hash:', hash);

      // Now add this onto the chain

      addToChain(hash);


    } catch (error) {
      console.error('Error:', error);
    }
  })();