let cells = createCells(10);

let cells1 = createCells(10);

let nowPlayer = cells

const random = (boardSize) => Math.floor(Math.random() * boardSize);


shipArrangement(cells)
shipArrangement(cells1)

renderBoard(cells)
renderBoard(cells1)
hidingField(cells)


function shipArrangement(cells) {
    const shipData = [
        { size: 1, count: 4 },
        { size: 2, count: 3 },
        { size: 3, count: 2 },
        { size: 4, count: 1 }
    ];


    shipData.forEach((ship) => {
        for (let i = 0; i < ship.count; i++) {
            const loc = generateRandomLocation(10, ship.size)

            if (validateLocation(loc, cells)) { setShip(loc, cells) }
            else i--;
        }
    });
}

function setShip(coord, cells) {
    for (let i = coord.startCoord.i; i <= coord.endCoord.i; i++) {
        for (let j = coord.startCoord.j; j <= coord.endCoord.j; j++) {
            cells[i][j].shipPlaced = true
        }
    }
};

function createCells(size) {
    const cells = new Array(size);

    for (let i = 0; i < cells.length; i++) {
        cells[i] = new Array(size);
        for (let j = 0; j < cells.length; j++) {
            cells[i][j] = { row: i, column: j, shipPlaced: false, shot: false, hide: false }
        }
    }

    return cells;
}

function renderBoard(data) {
    const board = document.createElement("div");
    board.classList.add("board");
    const field = document.querySelector(".field");

    data.forEach(row => row.forEach(cell => {
        const div = document.createElement("div");
        div.classList.add("cell");


        div.addEventListener('click', (el) => shot(cell, data))

        if (cell.shipPlaced === true) div.classList.add("ship");

        if (cell.shot === true) div.classList.add("shot");

        if (cell.hide === true) div.classList.add("hide");

        if (cell.shipPlaced === true && cell.shot === true) div.classList.add("shipDie");

        board.append(div);
    }));


    field.append(board);
}


function generateRandomLocation(boardSize, shipSize) {
    const direction = Math.round(Math.random());

    const startCoord = {
        i: random(boardSize - (!direction ? shipSize - 1 : 0)),
        j: random(boardSize - (direction ? shipSize - 1 : 0))
    };

    const coord = {
        startCoord,
        endCoord: {
            i: startCoord.i + (!direction ? shipSize - 1 : 0),
            j: startCoord.j + (direction ? shipSize - 1 : 0)
        },
        direction
    };

    return coord;
};

function validateLocation(location, cells) {

    let flag = true;

    for (let z = location.startCoord.j; z <= location.endCoord.j; z++) {
        if (cells[location.startCoord.i][z].shipPlaced === true) flag = false
    }

    for (let z = location.startCoord.i; z <= location.endCoord.i; z++) {
        if (cells[z][location.startCoord.j].shipPlaced === true) flag = false
    }


    for (let z = location.startCoord.i - 1; z <= location.endCoord.i + 1; z++) {
        if (cells[z] && cells[z][location.startCoord.j - 1]) {
            if (cells[z][location.startCoord.j - 1].shipPlaced) flag = false
        }
    }

    for (let z = location.startCoord.i - 1; z <= location.endCoord.i + 1; z++) {
        if (cells[z] && cells[z][location.endCoord.j + 1]) {
            if (cells[z][location.endCoord.j + 1].shipPlaced) flag = false
        }
    }

    for (let z = location.startCoord.j - 1; z <= location.endCoord.j + 1; z++) {
        if (cells[location.endCoord.i + 1] && cells[location.startCoord.i + 1][z]) {
            if (cells[location.endCoord.i + 1][z].shipPlaced) flag = false
        }
    }

    for (let z = location.startCoord.j - 1; z <= location.endCoord.j + 1; z++) {
        if (cells[location.startCoord.i - 1] && cells[location.startCoord.i - 1][z]) {
            if (cells[location.startCoord.i - 1][z].shipPlaced) flag = false
        }
    }

    return flag
};

function shot(element, data) {
    if (!element.shot) {
        if (nowPlayer === data) {
            element.shot = true
            const field = document.querySelector(".field");
            field.innerHTML = ""
            renderBoard(cells)
            renderBoard(cells1)
            if (!element.shipPlaced) {
                if (nowPlayer === cells) {
                    hidingField(cells1)
                    openField(cells)
                    nowPlayer = cells1
                } else {
                    hidingField(cells)
                    openField(cells1)
                    nowPlayer = cells
                }
            }
        }
        winCheck(data)
    }
}

function hidingField(data) {
    data.forEach(dataElements => {
        dataElements.forEach(dataElement => {
            dataElement.hide = true
        });
    });
    const field = document.querySelector(".field");
    field.innerHTML = ""
    renderBoard(cells)
    renderBoard(cells1)
}


function openField(data) {
    data.forEach(dataElements => {
        dataElements.forEach(dataElement => {
            dataElement.hide = false

        });
    });
    const field = document.querySelector(".field");
    field.innerHTML = ""
    renderBoard(cells)
    renderBoard(cells1)
}

function winCheck(data) {
    let winFlag = true;
    console.log(data)

    data.forEach(dataElements => {
        dataElements.forEach(dataElement => {
            if (dataElement.shipPlaced === true && dataElement.shot === false) {
                winFlag = false
            }
        });
    });
    if (winFlag) {
        if (data = cells) { alert('player 1 win') } else { alert('player 2 win') }
    }
}