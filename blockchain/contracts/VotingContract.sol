// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;


contract VotingContract {

    address public admin;   // Address of admin
    address public winnerAddress;   // Address of winner
    string public electionName;  //Name of an election
    uint public winnerVotes;     // winner so far
    enum votingPhase{
        ONGOING,
        NOTSTARTED,
        ENDED
    }
    votingPhase phase;

    struct Candidate{
        string name;
        uint age;
        bool registered;
        address candidateAddress;
        uint votes;
    }

    struct Voter{
        bool registered;
        bool voted;
    }

    event success(string msg);
    mapping (address => uint) public candidates;   // maps candidate's address to their index in candidateList
    Candidate[] public candidateList;              
    mapping (address => Voter) public voterList; 

    constructor(string memory _electionName){
        admin = msg.sender;
        electionName = _electionName;
        winnerVotes = 0;
        phase = votingPhase.NOTSTARTED;
    }  

    function candidateRegister(string memory _name, uint _age, address _candidateAddress) public{
        require(msg.sender == admin, "Only admin can register candidate");  
        require(_candidateAddress != admin, "Admin can not be a candidate");
        require(candidates[_candidateAddress]==0, "Candidate is already registered");

        Candidate memory candidate = Candidate({
            name : _name,
            age : _age,
            registered : true,
            candidateAddress : _candidateAddress,
            votes : 0
        });

        if(candidateList.length==0){
            candidateList.push();
        }

        candidates[_candidateAddress] = candidateList.length;
        candidateList.push(candidate);
        emit success("Candidate registered Successfully!");
    }


    function voterRegister(address _voterAddress) public {
        require(_voterAddress != admin, "Owner can not vote!!");
        require(msg.sender == admin, "Only owner can whitelist the addresses!!");
        require(voterList[_voterAddress].registered == false, "Voter already registered!!");
        Voter memory voter = Voter({
            registered: true,
            voted: false
        });

        voterList[_voterAddress] = voter;
        emit success("Voter registered!!");
    }

    function changePhase() public {
        require(msg.sender == admin, "Only admin can change phase");
        if(phase == votingPhase.NOTSTARTED){
            phase = votingPhase.ONGOING;
        }else if(phase == votingPhase.ONGOING){
            phase = votingPhase.ENDED;
        }else{
            phase = votingPhase.NOTSTARTED;
        }
    }


    function castVote(address _candidateAddress) public {
        require(msg.sender != admin, "Admin cannot cast a Vote!");  
        require(voterList[msg.sender].registered==true,"You are not registered");
        require(voterList[msg.sender].voted==false, "You have already voted");
        require(candidateList[candidates[_candidateAddress]].registered == true, "Candidate is not registered");

        candidateList[candidates[_candidateAddress]].votes ++;
        voterList[msg.sender].voted = true;

        uint candidateVotes = candidateList[candidates[_candidateAddress]].votes;

        if(candidateVotes > winnerVotes){
            winnerVotes = candidateVotes;
            winnerAddress = _candidateAddress;
        }

        emit success("Vote casted successfully!");
    }

    function getAllCandidate() public view returns(Candidate[] memory list){
        return candidateList;
    }

    function votingStatus() public view returns(string memory status){
        
        if(phase == votingPhase.NOTSTARTED){
            status = "NOTSTARTED";
        }else if(phase==votingPhase.ONGOING){
            status = "ONGOING";
        }else{
            status = "ENDED";
        }
        return status;
    }

    function declareResult() public view returns(Candidate memory candidate){
        require(msg.sender == admin, "Only admin can declare results!");
        return candidateList[candidates[winnerAddress]];
    }
}