const
columnas = 8,
filas = 8,
celdaLibre = 0,
movimientos = 7;

const      //  0    1   2   3   4   5  6  7
movimientoX = [2,   1, -1, -2, -2, -1, 1, 2],
movimientoY = [-1, -2, -2, -1,  1,  2, 2, 1];

var tablero = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];

var accesibilidad = [
    [4,3,2,2,2,2,3,4],
    [3,2,1,1,1,1,2,3],
    [2,1,0,0,0,0,1,2],
    [2,1,0,0,0,0,1,2],
    [2,1,0,0,0,0,1,2],
    [2,1,0,0,0,0,1,2],
    [3,2,1,1,1,1,2,3],
    [4,3,2,2,2,2,3,4]
];

function clonarTablero(tablero) {
    var nuevoTablero = [];
    for (let col = 0; col < columnas; col++) {
        nuevoTablero.push(tablero[col].slice());
    }
    return nuevoTablero;
}

function tableroCompletado(tablero) {
    for (let i = 0; i < filas; i++) {
        if(tablero[i].indexOf(0) != -1){
            return false;
        }
    }
    return true;
}

function imprimirTablero(tablero) {
    var str = "";
    for (let i = 0; i < columnas; i++) {
        str += tablero[i].map(function(v) {
            return v < 10 ? "0" + v : "" + v;
        }).join(" ") + "\n";
    }

    console.log(str);
}

function posicionesValidas(posicionX, posicionY) {
    var tempX, tempY;
    var coordenadas = [];
    for (var mov = 0; mov <= movimientos; mov++) {
        tempX = posicionX;
        tempY = posicionY;

        tempX += movimientoX[mov];
        tempY += movimientoY[mov];

        if(tempX <= -1 || tempX >= columnas || tempY <= -1 || tempY >= filas) {
            continue;
        }

        coordenadas.push({ x: tempX, y: tempY, a:accesibilidad[tempX][tempY] });
    }

    if(coordenadas.length > 0){
        coordenadas = coordenadas.sort(function(c1, c2) {
            return c2.a - c1.a;
        });
    }

    return coordenadas;
}

function procesarTablero(posicionX, posicionY, movimientosRealizados, tb) {
    var mov = 0,
    movRel = 0,
    tempX = 0,
    tempY = 0;

    movRel = movimientosRealizados;

    var tablero = clonarTablero(tb);

    tablero[posicionX][posicionY] = ++movRel;
    
    if(tableroCompletado(tablero)) {
        imprimirTablero(tablero);
        return true;
    }
    
    var coor = posicionesValidas(posicionX, posicionY);

    for (mov = 0; mov < coor.length; mov++) {
        tempX = coor[mov].x;
        tempY = coor[mov].y;

        if(tablero[tempX][tempY] == celdaLibre) {
            if(procesarTablero(tempX, tempY, movRel, tablero)) {
                return true;
            }
        }
    }

    return false;
}

console.log("Procesando");
console.time("Finalizado");
procesarTablero(0, 0, 0, tablero);
console.timeEnd("Finalizado");
