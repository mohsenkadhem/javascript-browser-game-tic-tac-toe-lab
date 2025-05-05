/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  




  /*---------------------------- Variables (state) ----------------------------*/
  let board, turn, winner, tie;
  





  /*------------------------ Cached Element References ------------------------*/
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.getElementById('message');
  const resetBtnEl = document.getElementById('reset');
  






  /*-------------------------------- Functions --------------------------------*/
  function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  }
  
  function render() {
    updateBoard();
    updateMessage();
  }
  
  function updateBoard() {
    board.forEach((val, idx) => {
      squareEls[idx].textContent = val;
    });
  }
  
  function updateMessage() {
    if (winner) {
      messageEl.textContent = `${turn} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn.`;
    }
  }
  
  function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id);
    if (board[squareIndex] || winner) return;
  
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
  
  function placePiece(index) {
    board[index] = turn;
  }
  
  function checkForWinner() {
    winningCombos.forEach(combo => {
      if (
        board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
        winner = true;
      }
    });
  }
  
  function checkForTie() {
    if (!winner && !board.includes('')) tie = true;
  }
  
  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
  }
  








  
  /*----------------------------- Event Listeners -----------------------------*/
  squareEls.forEach(square => square.addEventListener('click', handleClick));
  resetBtnEl.addEventListener('click', init);
  
  init();
  