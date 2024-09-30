// Import the prompt package
const prompt = require('prompt');

// Start the prompt
prompt.start();

// Generate computer's selection using Math.random
function getComputerSelection() {
  const randomNum = Math.random();
  if (randomNum <= 0.34) return 'PAPER';
  if (randomNum <= 0.67) return 'SCISSORS';
  return 'ROCK';
}

// Function to determine the winner
function determineWinner(userSelection, computerSelection) {
  if (userSelection === computerSelection) {
    return "It's a tie";
  }
  if (
    (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (userSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
    (userSelection === 'PAPER' && computerSelection === 'ROCK')
  ) {
    return 'User Wins';
  } else {
    return 'Computer Wins';
  }
}

// Function to validate the user's input (avoid invalid input)
function validateUserSelection(input) {
  const validSelections = ['ROCK', 'PAPER', 'SCISSORS'];
  return validSelections.includes(input);  // Compare input with valid selections
}

// Ask the user for their selection with error handling
function promptUser() {
  prompt.get(['userSelection'], function (err, result) {
    if (err) {
      console.error('An error occurred during input:', err);
      return;
    }

    // Check if result.userSelection exists
    if (!result || !result.userSelection) {
      console.error('No input received. Please enter ROCK, PAPER, or SCISSORS.');
      return promptUser(); // Re-prompt the user
    }

    // Trim and convert user input to uppercase to avoid case sensitivity and extra spaces
    const userSelection = result.userSelection.trim().toUpperCase();

    // Validate the user selection
    if (!validateUserSelection(userSelection)) {
      console.error('Invalid input! Please choose ROCK, PAPER, or SCISSORS.');
      return promptUser(); // Re-prompt the user for valid input
    }

    // Get the computer's selection
    const computerSelection = getComputerSelection();

    // Display user and computer selections
    console.log(`User selected: ${userSelection}`);
    console.log(`Computer selected: ${computerSelection}`);

    // Display the outcome of the game
    const outcome = determineWinner(userSelection, computerSelection);
    console.log(outcome);
  });
}

// Start the game by prompting the user
promptUser();
