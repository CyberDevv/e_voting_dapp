const { assert, expect } = require('chai');
const { network, deployments, ethers, getNamedAccounts } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');

!developmentChains.includes(network.name)
   ? describe.skip
   : describe('VotingApp', function () {
        let votingApp;
        let owner;
        let user1;
        let user2;
        let user3;
        let deployer;

        beforeEach(async function () {
           [owner, user1, user2, user3] = await ethers.getSigners();
           const VotingApp = await ethers.getContractFactory('Vote');
           votingApp = await VotingApp.deploy();
           await votingApp.deployed();
           candidateNames = [
              'Candidate 1',
              'Candidate 2',
              'Candidate 3',
              'Candidate 4',
           ];
           await votingApp.createElection(
              'Election 1',
              1000000000,
              2000000000,
              candidateNames
           );
           electionId = 0;
           candidateIds = [0, 1, 2, 3];
        });

        it('should allow users to register', async function () {
           await votingApp
              .connect(user1)
              .registerVoter('Alice', 'alice@example.com');
           const voter = await votingApp.voters(user1.address);
           expect(voter.name).to.equal('Alice');
        });

        //   return
        it('should allow admin to add candidates', async function () {
           await votingApp
              .connect(owner)
              .addCandidate(electionId, 'Candidate 4');
           const candidate = await votingApp.elections(electionId);
           console.log(candidate.candidates);
           //  expect(candidate.name).to.equal('Candidate 4')
        });

        it('should not allow non-admin to add candidates', async function () {
           await expect(
              votingApp.connect(user1).addCandidate(electionId, 'Candidate 5')
           ).to.be.revertedWith('Only admin can perform this action');
        });

        // return
        it('should allow users to vote', async function () {
           await votingApp.connect(user1).vote(electionId, candidateIds[0]);
           const candidate = await votingApp
              .elections(electionId)
              .candidates(candidateIds[0]);
           expect(candidate.voteCount).to.equal(1);
        });

        it('should not allow users to vote twice', async function () {
           votingApp.connect(user1).vote(electionId, candidateIds[1]);

           await expect(
              votingApp.connect(user1).vote(electionId, candidateIds[1])
           ).to.be.revertedWith('You have already voted');
        });

        //   it('should not allow users to vote before election start time', async function () {
        //      await ethers.provider.send('evm_increaseTime', [100]);
        //      await expect(
        //         votingApp.connect(user3).vote(electionId, candidateIds[2])
        //      ).to.be.revertedWith('Voting is not open yet or has ended');
        //   });

        it('should not allow users to vote after election end time', async function () {
           await ethers.provider.send('evm_increaseTime', [2000000000]);
           await expect(
              votingApp.connect(user2).vote(electionId, candidateIds[2])
           ).to.be.revertedWith('Voting is not open yet or has ended');
        });

        it('should return the correct candidate names and vote counts', async function () {
           // Get the election results
           let results = await votingApp.getElectionResults(0);

           // Check the results
           assert.equal(
              results[0][0],
              'Candidate 1',
              'Candidate 1 name should match'
           );
           assert.equal(
              results[0][1],
              'Candidate 2',
              'Candidate 2 name should match'
           );
           assert.equal(
              results[0][2],
              'Candidate 3',
              'Candidate 3 name should match'
           );
           assert.equal(results[1][0], 2, 'Candidate 1 should have 2 votes');
           assert.equal(results[1][1], 1, 'Candidate 2 should have 1 vote');
           assert.equal(results[1][2], 0, 'Candidate 3 should have 0 votes');
        });

        it('should revert if the election is not over', async function () {
           // Deploy a new election with a future end time
           let endTime = Math.floor(Date.now() / 1000) + 3600;
           let newElection = await Election.deploy(endTime);

           // Try to get the election results
           await assert.revert(
              newElection.getElectionResults(0),
              'Election is not yet over'
           );
        });
     });
