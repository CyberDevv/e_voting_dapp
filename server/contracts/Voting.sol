// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// Import statements for required libraries

contract Voting {
    // Structs for Voter, Candidate, and Election
    struct Voter {
        string name;
        string email;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Election {
        string title;
        uint startTime;
        uint endTime;
        mapping(uint => Candidate) candidates;
        uint numCandidates;
    }

    // Mappings for voters, elections, and admin
    mapping(address => Voter) public voters;
    mapping(uint => Election) public elections;
    uint public numElections;
    address public admin;

    // Events for registration, voting, and revoking access
    event VoterRegistered(
        address indexed _voterAddress,
        string _name,
        string _email
    );
    event VoterRevoked(address indexed _voterAddress);
    event VoteCasted(
        address indexed _voterAddress,
        uint indexed _electionId,
        uint indexed _candidateId
    );

    // constructor
    constructor() {
        admin = msg.sender;
    }

    // Modifier for admin-only access
    modifier onlyAdmin() {
        require(msg.sender == admin, "Admin access required");
        _;
    }

    // Modifier for registered voter-only access
    modifier onlyVoteOnce() {
        require(voters[msg.sender].hasVoted == false, "You have already voted");
        _;
    }

    /// @notice Function for registering a voter
    /// @param _name name of the vorer
    /// @param _email email of the voter
    function registerVoter(string memory _name, string memory _email) public {
        require(
            voters[msg.sender].hasVoted == false,
            "You have already registered"
        );
        voters[msg.sender] = Voter(_name, _email, false);
        emit VoterRegistered(msg.sender, _name, _email);
    }

    /// @notice Function for creating an election
    /// @param _title title of the election
    /// @param _startTime start date and time of the election in block.timestamp format
    /// @param _endTime end date and time of the election in block.timestamp format
    /// @param _candidateNames an array of candidate for the election
    function createElection(
        string memory _title,
        uint _startTime,
        uint _endTime,
        string[] memory _candidateNames
    ) public onlyAdmin {
        require(_startTime < _endTime, "Invalid election duration");
        Election storage newElection = elections[numElections];
        newElection.title = _title;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.numCandidates = _candidateNames.length;
        for (uint i = 0; i < _candidateNames.length; i++) {
            newElection.candidates[i] = Candidate(_candidateNames[i], 0);
        }
        numElections++;
    }

    // Function for adding a candidate
    function addCandidate(
        uint _electionId,
        string memory _name
    ) public onlyAdmin {
        Election storage election = elections[_electionId];
        election.candidates[election.numCandidates] = Candidate(_name, 0);
        election.numCandidates++;
    }

    // Function for revoking voter access
    function revokeAccess(address _votersAddress) public onlyAdmin {
        require(
            voters[_votersAddress].hasVoted == false,
            "This voter has already voted"
        );
        delete voters[_votersAddress];
        emit VoterRevoked(_votersAddress);
    }

    // Function for voting
    function vote(
        uint _electionId,
        uint _candidateId
    ) public onlyVoteOnce {
        Election storage election = elections[_electionId];
        require(
            block.timestamp >= election.startTime &&
                block.timestamp <= election.endTime,
            "Voting not started or ended"
        );
        require(_candidateId < election.numCandidates, "Invalid candidate ID");

        Voter storage voter = voters[msg.sender];
        voter.hasVoted = true;
        election.candidates[_candidateId].voteCount++;
        emit VoteCasted(msg.sender, _electionId, _candidateId);
    }

    // Function for getting election results
    function getElectionResults(
        uint _electionId
    ) public view returns (string[] memory, uint[] memory) {
        Election storage election = elections[_electionId];
        // require(block.timestamp >= election.endTime, 'Election is not yet over');
        uint numCandidates = election.numCandidates;
        string[] memory candidateNames = new string[](numCandidates);
        uint[] memory voteCounts = new uint[](numCandidates);
        for (uint i = 0; i < numCandidates; i++) {
            candidateNames[i] = election.candidates[i].name;
            voteCounts[i] = election.candidates[i].voteCount;
        }
        return (candidateNames, voteCounts);
    }

    // function to get a voter
    function getVoter(
        address _voterAddress
    ) public view returns (string memory, string memory, bool) {
        Voter storage voter = voters[_voterAddress];
        return (voter.name, voter.email, voter.hasVoted);
    }
}