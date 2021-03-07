// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }

	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    let userWord = input.question("Let's play some scrabble! Enter a word: ");
    return userWord;
}

function simpleScorer (userWord) {
    return userWord.length;
}

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScorer
};



function vowelBonusScorer (userWord) {
    userWord = userWord.toUpperCase();

      function vowelCounter (userWord) {
        matchCount = userWord.match(/[aeiou]/gi);
      return matchCount === null ? 0 : matchCount.length;
      }

    let vowelCount = vowelCounter(userWord);
    let charCount = userWord.length;
    let letterPoints = (charCount - vowelCount) + (vowelCount * 3);
  
  return letterPoints;
  }

let vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScorer
};


function scrabbleScorer (userWord) {
    userWord = userWord.toLowerCase();
    points = 0;

    for (let i = 0; i < userWord.length; i++) {
      for (item in newPointStructure) {
        if (userWord[i] === item) {
         points += newPointStructure[item];
        }
      }
    } 
  return points;
  }

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScorer
};


const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
  let userChoice = input.question(
      `

    Which scoring algorithm would you like to use? Select the number that corresponds with your preferred scoring algorithm:

      0: ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
      1: ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
      2: ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description} 
      
      Enter your number here --> `)

   switch (userChoice) {
    case '0': 
      userChoice = scoringAlgorithms[0];
      break;
    case '1':
      userChoice = scoringAlgorithms[1];
      break;
    case '2':
      userChoice = scoringAlgorithms[2];
      break;
  }
  return userChoice;
}

function transform (oldPointStructure) {
  let newObject = {};
  for (const keyNumber in oldPointStructure) {
    for ( let i = 0; i < oldPointStructure[keyNumber].length; i++) {
      newObject[oldPointStructure[keyNumber][i].toLowerCase()] = Number(keyNumber);
    }
  }
  return newObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let userWord = initialPrompt();
   let chosenAlgorithm = scorerPrompt();
   let userScore = chosenAlgorithm.scorerFunction(userWord);
   console.log(
      `
      .........................................

         >>> Score for '${userWord}':  ${userScore} <<<

      .........................................
`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

