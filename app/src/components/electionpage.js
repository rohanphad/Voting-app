import React, {useState, useEffect} from 'react';
import {getAllCandidates, castVote, getPhase, getWinner} from '../web3_function';
import './styles/election.css'
import personimg from '../person.jpg';

function ElectionComponent({account, contractInstance}){

    const [candidateList, setCandidateList] = useState([]);
    const [phase, setPhase] = useState("NOTSTARTED");
    const [winner, setWinner] = useState();
    
    useEffect(()=>{ 
        async function connect(){
          const currentPhase = await getPhase(contractInstance, account);
          console.log("phase", currentPhase);
          if(currentPhase === "ONGOING"){
            const arr = await getAllCandidates(contractInstance, account);
            setCandidateList(arr);
            setPhase(currentPhase);
          }else if(currentPhase === "ENDED"){
            const res = await getWinner(contractInstance, account);
            setWinner(res.message);
            setPhase(currentPhase);
          }
          console.log("phase", phase);

        }
        setTimeout(connect, 100);
    },[account, contractInstance]);

    async function vote(candidate){
        let res = await castVote(contractInstance, account, candidate.candidateAddress);
        console.log("result:", res);
    }
    
    return (
        <div className='container'>
            <div className="header">
                <h2>Vote Me</h2>
            </div>
            <div className = "nav-bar home-page">
                <ul>
                    <li className="nav-li">Home</li>
                    <li className="nav-li election">Election</li>
                </ul>
            </div>
            <div className="main-container">
                <div className="heading">
                    <h2>Welcome to the President Election</h2>
                </div>
                <div className="candidate-list">
                {phase === "NOTSTARTED" ? (
                        <h3>Voting has not started yet!</h3>
                    ) : phase === "ONGOING" ? (
                        candidateList.map((candidate) => {
                            return(
                                <div className="candidate-container">
                                    <img src={personimg} alt="person img" />
                                    <h4>Name: {candidate.name}</h4>
                                    <h4>Age: {candidate.age}</h4>
                                    <button onClick={(e)=>vote(candidate)}>Vote</button>
                                </div>
                            )
                        })
                    ) : (
                        <div className="winner-container">
                            <h2>Winner!</h2>
                            <div className="candidate-container">
                                <img src={personimg} alt="person img" />
                                <h5>Name: {winner.name}</h5>
                                <h5>Age: {winner.age}</h5>
                                <h4>Votes: {winner.votes}</h4>
                            </div>
                        </div>   
                    )}
                </div>
            </div>
        </div>
    );
}

export default ElectionComponent