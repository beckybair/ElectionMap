// Global Variables
var winner = "";

// Make each candidate from this object
var makeCandidate = function(name, color, results) {
  var candidate = {};
  candidate.name = name;
  candidate.partyColor = color;
  candidate.electionResults = results;

  candidate.totalVotes = function() {
    this.totalVotes = 0;
    for (var i = 0; i < this.electionResults.length; i++) {
      this.totalVotes = this.totalVotes + this.electionResults[i];
    }
  };

  candidate.totalVotes();

  return candidate;
};

// Candidate's Results
var cand1Results = [5 ,1 ,7 ,2 ,33 ,6 ,4 ,2 ,1 ,14 ,8 ,3 ,1 ,11 ,11 ,0 ,5 ,3 ,3 ,3 ,7 ,4 ,8 ,9 ,3 ,7 ,2 ,2 ,4 ,2 ,8 ,3 ,15 ,15 ,2 ,12 ,0 ,4 ,13 ,1 ,3 ,2 ,8 ,21 ,3 ,2 ,11 ,1 ,3 ,7 ,2];
var cand2Results = [4 ,2 ,4 ,4 ,22 ,3 ,3 ,1 ,2 ,15 ,8 ,1 ,3 ,9 ,0 ,6 ,1 ,5 ,5 ,1 ,3 ,7 ,8 ,1 ,3 ,3 ,1 ,3 ,2 ,2 ,6 ,2 ,14 ,0 ,1 ,6 ,7 ,3 ,7 ,3 ,6 ,1 ,3 ,17 ,3 ,1 ,2 ,11 ,2 ,3 ,1];

// Changes to the results array for both candidates
// Candidate 1
  cand1Results[9] = 1;
  cand1Results[4] = 17;
  cand1Results[43] = 11;
// Candidate 2
  cand2Results[9] = 28;
  cand2Results[4] = 38;
  cand2Results[43] = 27;

// Create different candidates
var candidate1 = makeCandidate("Alia", [132, 17, 11], cand1Results);
var candidate2 = makeCandidate("Jacque", [245, 141, 136], cand2Results);

//Each candidate's election results
console.log(candidate1.name + " has the following Election Results " + candidate1.electionResults);
console.log(candidate2.name + " has the following Election Results " + candidate2.electionResults);

// Each candidate's adjusted totals
console.log(candidate1.name + "'s Party Color is: " + candidate1.partyColor + " and has " + candidate1.totalVotes);
console.log(candidate2.name + "'s Party Color is: " + candidate2.partyColor + " and has " + candidate2.totalVotes);

// Assign the winner of each state
var setStateResults = function(state) {
  if (candidate1.electionResults[state] > candidate2.electionResults[state]) {
    theStates[state].winner = candidate1;
//    console.log(stateWinner.name + " is the winner of the state!");
  } else if (candidate2.electionResults[state] > candidate1.electionResults[state]) {
    theStates[state].winner = candidate2;
//    console.log(stateWinner.name + " is the winner of the state!");
  }

  var stateWinner = theStates[state].winner;

  if (stateWinner !== null) {
    if (stateWinner == candidate1) {
      theStates[state].rgbColor = candidate1.partyColor;
    } else {
      theStates[state].rgbColor = candidate2.partyColor;
    }
  } else {
    theStates[state].rgbColor = [11, 32, 57];
  };

  var stateInfoTable = document.getElementById('stateResults');
  var header = stateInfoTable.children[0].children[0];
  var stateName = header.children[0];
  var stateAbbrev = header.children[1];

  var cand1Data = stateInfoTable.children[1].children[0];
  var cand1Name = cand1Data.children[0];
  var cand1Results = cand1Data.children[1];

  var cand2Data = stateInfoTable.children[1].children[1];
  var cand2Name = cand2Data.children[0];
  var cand2Results = cand2Data.children[1];

  var winnerData = stateInfoTable.children[1].children[2];
  var winnerName = winnerData.children[1];

  if (stateWinner !== null) {
    winnerName.innerText = stateWinner.name;
  } else {
    winnerName.innerText="Tie";
  }

  stateName.innerText = theStates[state].nameFull;
  stateAbbrev.innerText = theStates[state].nameAbbrev;
  cand1Name.innerText = candidate1.name;
  cand1Results.innerText = candidate1.electionResults[state];
  cand2Name.innerText = candidate2.name;
  cand2Results.innerText = candidate2.electionResults[state];
};

// Determine the winner!
var findWinner = function() {
  if (candidate1.totalVotes > candidate2.totalVotes) {
    winner = candidate1.name;
  } else if (candidate2.totalVotes > candidate1.totalVotes) {
    winner = candidate2.name;
  } else {
    winner = "The election is a tie";
  }

  console.log(winner + " wins the Election!");
}

findWinner();

var table = document.getElementById('countryResults');

//  tbody           tr           td        place text
table.children[0].children[0].children[0].innerText = candidate1.name;
table.children[0].children[0].children[1].innerText = candidate1.totalVotes;
table.children[0].children[0].children[2].innerText = candidate2.name;
table.children[0].children[0].children[3].innerText = candidate2.totalVotes;
table.children[0].children[0].children[4].innerText = "Winner is: ";
table.children[0].children[0].children[5].innerText = winner;
