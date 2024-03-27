document.addEventListener('DOMContentLoaded', function () {
    const choices = document.querySelectorAll('.choices button');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('result');
    const restartButton = document.getElementById('restart');

    choices.forEach(choice => choice.addEventListener('click', playGame));

    function playGame(e) {
        restartButton.style.display = 'none';
        const playerChoice = e.target.id;
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        displayResult(playerChoice, computerChoice, result);
    }

    function getComputerChoice() {
        const choices = ['piedra', 'papel', 'tijeras'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function getResult(player, computer) {
        if (player === computer) {
            return '¡Te cagó la compu, es un empate!';
        } else if ((player === 'piedra' && computer === 'tijeras') ||
                (player === 'papel' && computer === 'piedra') ||
                (player === 'tijeras' && computer === 'papel')) {
            return '¡GANASTE, GENIO DEL PPT!';
        } else {
            return '¡Que bajón, te tocó perder!';
        }
    }

    function displayResult(player, computer, result) {
        resultDisplay.textContent = result;
        computerChoiceDisplay.textContent = `La compu eligió: ${computer}`;
        restartButton.style.display = 'block';
        choices.forEach(choice => choice.removeEventListener('click', playGame));
        restartButton.addEventListener('click', restartGame);
    }

    function restartGame() {
        resultDisplay.textContent = '';
        computerChoiceDisplay.textContent = '';
        restartButton.style.display = 'none';
        choices.forEach(choice => choice.addEventListener('click', playGame));
    }
});
