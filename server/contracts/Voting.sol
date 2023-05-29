// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
        uint256 voteCount;
    }

    struct Election {
        string title;
        uint startTime;
        uint endTime;
        mapping(uint => Candidate) candidates;
        uint numCandidates;
        string electionId;
        bool exists;
    }

    // Mappings for voters, elections, and admin
    mapping(address => Voter) public voters;
    mapping(string => Election) public elections;
    string[] public electionIdsArray;
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
        string indexed _electionId,
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
        string[] memory _candidateNames,
        string memory _electionId
    ) public onlyAdmin {
        Election storage election = elections[_electionId];
        require(!election.exists, "Election ID already exists");

        require(_startTime < _endTime, "Invalid election duration");

        election.title = _title;
        election.startTime = _startTime;
        election.endTime = _endTime;
        election.numCandidates = _candidateNames.length;
        election.electionId = _electionId;
        election.exists = true;

        for (uint i = 0; i < _candidateNames.length; i++) {
            election.candidates[i] = Candidate(_candidateNames[i], 0);
        }

        electionIdsArray.push(_electionId);

        numElections++;
    }

    // Function for adding a candidate
    function addCandidate(
        string memory _electionId,
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
        string memory _electionId,
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
        string memory _electionId
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

    // function to get all elections
    function getAllElections()
        public
        view
        returns (
            string[] memory titles,
            uint[] memory startTimes,
            uint[] memory endTimes,
            string[] memory electionIds,
            uint[] memory numCandidatesArray
        )
    {
        titles = new string[](numElections);
        startTimes = new uint[](numElections);
        endTimes = new uint[](numElections);
        electionIds = new string[](numElections);
        numCandidatesArray = new uint[](numElections);

        for (uint256 i = 0; i < numElections; i++) {
            Election storage election = elections[electionIdsArray[i]];
            titles[i] = election.title;
            startTimes[i] = election.startTime;
            endTimes[i] = election.endTime;
            electionIds[i] = election.electionId;
            numCandidatesArray[i] = election.numCandidates;
        }
    }

    // function to get a single election
    function getElection(
        string memory _electionId
    )
        public
        view
        returns (
            string memory title,
            uint256 startTime,
            uint256 endTime,
            uint256 numCandidates,
            Candidate[] memory candidates
        )
    {
        Election storage election = elections[_electionId];
        require(election.exists, "Election does not exist");

        title = election.title;
        startTime = election.startTime;
        endTime = election.endTime;
        numCandidates = election.numCandidates;
        candidates = new Candidate[](numCandidates);

        for (uint256 i = 0; i < numCandidates; i++) {
            candidates[i] = election.candidates[i];
        }
    }
}
