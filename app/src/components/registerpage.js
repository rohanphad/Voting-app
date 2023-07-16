import React, {useState, useEffect} from 'react';
import { registerVoter } from '../web3_function';


function RegisterComponent({account, contractInstance}){

    const [voterAddress, setVoterAddress] = useState();

    async function register_voter(){
        let result = await registerVoter(contractInstance, account, voterAddress);
        console.log("result:", result);
    }
}


export default RegisterComponent;