let cont = document.getElementById('container');
let idArr = [],
    numbArr = [];
let betAm = document.getElementById('betAm');
let mineAm = document.getElementById('mineAm');
let mines = 0,
    bal = 0,
    discovered = 0;

const createCells = () => {
    let i = 0;
    while (i < 25) {
        let div = document.createElement('div');
        div.classList = 'cell';
        div.innerHTML = '👷🏽‍♂️';
        div.id = `id${i}`;
        cont.appendChild(div);
        idArr = [...idArr, i];
        i++;
    }
}

const createRandomMines = am => {
    let i = 0;
    while (i < am) {
        numbArr = [...numbArr, idArr[idArr.length * Math.random() | 0]];
        i++;
    }
    let unique = [...new Set(numbArr)];
    numbArr = unique;
    while (numbArr.length < am) {
        numbArr = [...numbArr, idArr[idArr.length * Math.random() | 0]];
        let unique = [...new Set(numbArr)];
        numbArr = unique;
    }
    console.log(numbArr);
}

const checkIfMineCell = n => {
    let x = parseInt(n.substring(2));
    if (numbArr.includes(x)) {
        document.getElementById(n).innerHTML = '💣';
        balSpan.innerHTML = 0;
        bal = 0;
        switchToLoseUI();
    } else {
        document.getElementById(n).innerHTML = '💎';
        multiplyBal();
        discovered--;
    }
}

const multiplyBal = () => {
    bal = (bal * (1 + determineMultiplier()));
    balSpan.innerHTML = bal.toFixed(2);
}

const determineMultiplier = () => (mines / discovered) * 1.1;

const switchToLoseUI = () => {
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('main').style.filter = 'brightness(10%)';

}

const resetUI = () => {
    document.getElementById('main').style.filter = 'none';
    document.getElementById('gameOver').style.display = 'none';
}

const startGame = () => {
    mines = mineAm.value;
    bal = betAm.value;
    balSpan.innerHTML = bal;
    createRandomMines(mines);
    discovered = 25 - mines;
}

createCells();

let cells = document.querySelectorAll('.cell');

cells.forEach(el => {
    el.addEventListener('click', e => {
        checkIfMineCell(e.path[0].id);
    })
})