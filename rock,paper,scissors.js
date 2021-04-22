const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const compScoreSpan = document.querySelector('[data-comp-score')
const yourScoreSpan = document.querySelector('[data-your-score')
const SELECTIONS = [
  {
    name: 'Rock', beats: 'Scissors'
  },
  {
    name: 'Paper', beats: 'Rock'
  },
  {
    name: 'Scissors', beats: 'Paper'
  }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
      const selectionName = selectionButton.dataset.selection
      const selection = SELECTIONS.find(selection => selection.name === selectionName)
      makeSelection(selection)
    })
})

function makeSelection(selection) {
  const computerSelection = randomSelection()
  const playerWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, playerWinner)

  if (playerWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(compScoreSpan)

 
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.name
  div.classList.add('results-selection')
  if (winner) div.classList.add('Winner')
   finalColumn.after(div)
}

function isWinner(selection, opponentsSelection) {
  return selection.beats === opponentsSelection.name
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}