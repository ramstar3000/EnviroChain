import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import Popup from 'reactjs-popup';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import LoginForm from './components/LoginForm';


// Import image 
import Figure1 from './Figure1.png';


const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');


const genAI = new GoogleGenerativeAI("AIzaSyDWqMnMCHz6wS9b8yfZ_fHjNi_iCAB3X7A")
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

const { mnemonicToMiniSecret, sr25519PairFromSeed } = require('@polkadot/util-crypto');


async function main2(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response();

    const text = response.text();
    console.log(text);
}


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

async function main() {
  const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  const address = '5Gh6paTqcvvwJPSvdiD22taB1rYNz5yvyFXXHiguD5VQqKw1';
  const ALICE = address;
  let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(address);
  
  console.log(`has a balance of ${previousFree}, nonce ${previousNonce}`);
  
  api.query.system.account(ALICE, ({ data: { free: currentFree }, nonce: currentNonce }) => {
      // Calculate the delta
      const change = currentFree.sub(previousFree);
  
      // Only display positive value changes (Since we are pulling `previous` above already,
      // the initial balance change will also be zero)
      if (!change.isZero()) {
        console.log(`New balance change of ${change}, nonce ${currentNonce}`);
  
        previousFree = currentFree;
        previousNonce = currentNonce;
      }
    });
  }

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
          resolve(tx.hash.toHex)
        }
      }).catch(reject);

    });
    
    }


async function addToChain(hash) {
  const api = await connectToPolkadot();
  const result = await createAndSignTransaction(api, hash);
  console.log('Transaction hash:', result);
  return result;
}

function forward_next_page() {
  window.location.href = "/hello";
}


function App() {

  // const result = addToChain("hash_of_file");
  // return result;
  return (
    <div className="App">


            


      
      <header className="App-header">

        <h1>Enviro-chain</h1>

        <p> Welcome to Enviro-chain! </p>



        <br></br><br></br>

        <Popup trigger=
                {<button> Verify Login </button>}
                >
                  
                
                <div class="center">


                <p>abhvin verified ✔️</p>
                <p> This is a project that uses blockchain technology to store environmental data. </p>
                <p> The data is stored in a secure and immutable way. </p>
                <p> The data can be accessed and verified by anyone, using the hash: b3d7740b91a49313a61dcab5b32f9ca440ed1e3c318c428e9a50fc392922fa7a  </p>

                <p> OR you can use the helper function provided in validate_transaction.js </p>

                <br></br>

                </div>

                <div class="center2">
                
                <Popup trigger=
                {<button> View analysis </button>}
                 >

                  <div class="center3">
                  <p>Current Trends</p>
                  <p>This data is taken from the python package and uses ML techniques to analyse</p>

                  <img src={ Figure1 } className="App-logo" alt="logo" /> 
                  </div>

                </Popup>

                </div>
    

                </Popup>


              



    <br></br><br></br>    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>

    <br></br><br></br>    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br><br></br><br></br>    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>
    <br></br><br></br>



      

      </header>
    </div>
  );
}

export default App;
