
import React, {useState, useEffect} from 'react';
import './App.css';
import HomeComponent from './components/homepage';
import AdminComponent from './components/adminpage';
import ElectionComponent from './components/electionpage'
import { connectWeb3Metamask } from './web3_function';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    const [contractInstance, setContract] = useState(null);
    const [accounts, setAccounts] = useState();

    useEffect(() => {
      async function connect() {
        try {
          let { accounts, instance } = await connectWeb3Metamask();
          setAccounts(accounts);
          setContract(instance);
        } catch (error) {
          if (error.code !== -32002) {
            alert(`Failed to load web3, contract, or accounts`);
          }
          console.log(error);
        }
      }
      setTimeout(connect, 1500);
    }, []);
    return (
      <div className="app">
        { contractInstance == null ? 
          <>
            <h2> Loading..... </h2>
          </> 
          :
          <>
            <BrowserRouter>
              <Routes>
                <Route index element={<HomeComponent contractInstance={contractInstance} account={accounts[0]} />}/>
                <Route path="/admin" element={<AdminComponent  contractInstance={contractInstance} account={accounts[0]} />} />
                <Route path="/election" element={<ElectionComponent  contractInstance={contractInstance} account={accounts[0]} />} />
              </Routes>
            </BrowserRouter>
          </>
        }
      </div>

    );
}

export default App;