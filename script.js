const wordList = ['acender', 'basquete', 'champanhe', 'desalmado','eloquente', 'fugaz', 'impacto','papibaquígrafo', 'oftalmologista', 'pneumoultramicroscopicossilicovulcanoconiótico']

let chosenWord;
let wordExibition;
let letterGuessing;
let attempts;
let mistakes;


function startGame(){
    chosenWord  = wordList[Math.floor(Math.random()*wordList.length)]

    wordExibition = Array(chosenWord.length).fill('_')

    letterGuessing = []

    attempts = 7

    mistakes = 0

    document.getElementById('letterInput').disabled = false;
    document.getElementById('message').style.display = 'none';
    document.getElementById('restart').style.display = 'none';

    updateView()

}

function updateView(){
    document.getElementById('wordEx').innerText = '';
    document.getElementById('wordEx').innerText = wordExibition.join(' ')
    document.getElementById('guessedLetters').innerText = `${letterGuessing.join(', ')}`

    document.getElementById('img').src = `img/forca${mistakes}.png`

    if(attempts === 0){
        endGame('VOCÊ PERDEU!')
    }else if(!wordExibition.includes('_')){
        endGame('Parabéns!!!! Você venceu!!!')
    }
}

function guessLetter(){
    const letInput = document.getElementById('letterInput')
    const letter = letInput.value.toLowerCase()

    if(!letter.match(/[a-zà-ùç]/i)){
        alert('Por favor, insira uma letra válida!')
        return;
    }

    if(letterGuessing.includes(letter)){
        alert('Já tentou essa, mah. Testa outra aí')
        return;
    }

    letterGuessing.push(letter)

    if(chosenWord.includes(letter)){
        for(let i = 0; i < chosenWord.length; i++){
            if(chosenWord[i] === letter){
                wordExibition[i] = letter;
            }
        }
    }else{
        attempts--;
        mistakes++;
    }

    letInput.value = '';

    updateView();

}

function endGame(Message){
    document.getElementById('letterInput').disabled = true

    document.getElementById('message').innerText = Message
    document.getElementById('message').style.display = 'block'
    document.getElementById('restart').style.display = 'block'
}

window.onload = startGame;