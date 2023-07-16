import React, {useState, useEffect} from 'react';
import { registerCandidate, registerVoter, changePhase,getAllCandidates,getPhase} from '../web3_function';
import './styles/adminpage.css'

function AdminComponent({account, contractInstance}){

    const [candidateName, setCandidateName] = useState();
    const [candidateAge, setCandidateAge] = useState();
    const [candidateAddress, setCandidatAddress] = useState();
    const [voterAddress, setVoterAddress] = useState();
    const [winnerAddress, setWinnerAddress] = useState();
    const [phase, setPhase] = useState();
    const [candidateList, setcandidateList] = useState();


    useEffect(()=>{
        async function set_phase(){
            let res = await getPhase(contractInstance, account)
            setPhase(res);
        }
        setTimeout(set_phase, 1000);
    },[]);
    
    async function get_phase(){
        let res = await getPhase(contractInstance, account)
        console.log("admin_get_phase", res);
        setPhase(res);
    }

    async function register_candidate(){
        console.log("name:", candidateName);
        let res = await registerCandidate(contractInstance, account, candidateName, candidateAge, candidateAddress);
        console.log("result:", res);
    }

    async function register_voter(){
        let res = await registerVoter(contractInstance, account, voterAddress);
        console.log("result:", res);
    }

    async function change_phase(){
        let res = await changePhase(contractInstance, account);
        let res2 = await getPhase(contractInstance, account);
        setPhase(res2);
        console.log("result: ", res2);
    }

    async function getWinner(){
        let res = await getWinner(contractInstance, account);
        console.log("result:", res.message);
        setWinnerAddress(res.message);
    }



    return(
        <>
            
            <div className="container">
                <div className="header">
                    <h2>Vote Me</h2>
                </div>
                <div className="left-container">
                    <div className="add-candidate">
                        <h3>Add New Candidate</h3>
                        <input type="text" placeholder='Name' onChange={(e)=>setCandidateName(e.target.value)}/>
                        <input type="text" placeholder='Age' onChange={(e)=>setCandidateAge(e.target.value)}/>
                        <input type="text" placeholder='Address' onChange={(e)=>setCandidatAddress(e.target.value)}/>
                        <button onClick={register_candidate}>Register Candidate</button>
                    </div>
                    <div className="add-voter">
                        <h3>Add New voter</h3>
                        <input type="text" placeholder='Address' onChange={(e)=>setVoterAddress(e.target.value)}/>
                        <button onClick={register_voter}>Register Voter</button>
                    </div>
                    <div className="change-phase">
                        <h3>Current Phase: {phase}</h3>
                        <button onClick={change_phase}>Change Phase</button>
                        <button onClick={get_phase}>Get Phase</button>
                    </div>

                </div>
                <div className="right-container">
                <div className="info">
                    <h2>Info</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, asperiores obcaecati. Ipsum libero officiis repellat voluptatem beatae id explicabo, autem debitis atque, sed, maiores maxime quos. Placeat nulla assumenda voluptatum.</p>
                    <br />
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dicta excepturi? Numquam iste illum vel possimus, voluptatum debitis nemo doloremque.</p>
                </div>
            </div>
        </div>  
        </>
    )
}

export default AdminComponent;