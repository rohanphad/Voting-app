import Web3 from "web3";
import VotingContract from './VotingContract.json';



async function connectWeb3(){
    const provider = new Web3.providers.HttpProvider( "http://localhost:8545");
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await VotingContract.networks[networkId];
    const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork.address
    );
    return {accounts, instance}
}

// function for connecting metamask

async function connectWeb3Metamask() {
    try {
      // Check if MetaMask is available
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask not detected");
      }
  
      // Create a new Web3 instance using MetaMask's provider
      const web3 = new Web3(window.ethereum);
  
      // Request user permission to connect to their MetaMask wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      // Get the connected accounts
      const accounts = await web3.eth.getAccounts();
  
      // Get the network ID
      const networkId = await web3.eth.net.getId();
  
      console.log("Injected web3 detected.", accounts, networkId);
  
      // Retrieve the deployed network information
      const deployedNetwork = VotingContract.networks[networkId];
  
      // Check if the deployed network exists
      if (!deployedNetwork) {
        throw new Error("Contract not deployed on the current network");
      }
  
      // Create an instance of the contract
      const instance = new web3.eth.Contract(VotingContract.abi, deployedNetwork.address);
  
      return { accounts, instance };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  


// candidate registration

async function registerCandidate(contractInstance, account, _name, _age, _candidateAddress) {
    try{
        let res = await contractInstance.methods.candidateRegister(_name, Number(_age), _candidateAddress).send({from: account, gas: 3000000});
        return {error: false, message: res.events.success.returnValues.msg};
    } catch(err){
        return  {error: true, message: err.message};
    }
}

// Voter Registration

async function registerVoter(contractInstance, account, _voterAddress) {
    try{
        let res = await contractInstance.methods.voterRegister(_voterAddress).send({from: account, gas: 3000000});
        return {error:false, message: res.events.success.returnValues.msg};
    } catch(err){
        return {error: true, message: err.message};
    }
}

// change Phase

async function changePhase(contractInstance, account){
    try{
        let res = await contractInstance.methods.changePhase().send({from: account, gas: 3000000});
        return {error:false, message: res.events.success.returnValues.msg};
    }catch(err){
        return {error: true, message: err.message};
    }
}

// get phase

async function getPhase(contractInstance, account){
    let phase = await contractInstance.methods.votingStatus().call({from: account, gas: 3000000});
    console.log("web3_getPhase:", phase);
    return phase;
}

// get candidate list

async function getAllCandidates(contractInstance, account){
    let candidateList = [];
    let res = await contractInstance.methods.getAllCandidate().call({from: account, gas: 3000000});

    for(let i = 1; i<res.length; i++){
        candidateList[i-1] = res[i];
    }
    return candidateList;
}

// cast vote

async function castVote(contractInstance, account, _candidateAddress){
    try{
        let res = await contractInstance.methods.castVote(_candidateAddress).send({from:account, gas: 3000000});
        return {error: false, message: res.events.success.returnValues.msg};
    } catch (err){
        return {error: true, message: err.message};
    }
}

// declare results

async function getWinner(contractInstance, account){
    try{
        let res = await contractInstance.methods.declareResult().call({from: account, gas: 3000000});
        return {error: false, message: res};
    }catch (err){
        return {err: true, message: err.message};
    }
}



export {
    connectWeb3,
    connectWeb3Metamask,
    registerCandidate,
    registerVoter,
    changePhase,
    getPhase,
    getAllCandidates,
    castVote,
    getWinner
}