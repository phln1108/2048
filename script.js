



var inicio = false;
var left = true;
var right = true;
var up = true;
var down = true;
var interface = [['', '', '', ''],['', '', '', ''], ['', '', '', ''], ['', '', '', '']];

function reset_interface() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            interface[i][j] = '';
        }
    }
}

function cordRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function randomizador() {
    let vezes = 0, contar = 0;
    while (true) {
        let cord = [];
        for (let i = 0; i < 2; i++) {
            cord.push(cordRandom(0, 4));
        }
        if (interface[cord[0]][cord[1]] != '') {
            continue;
        }
        if (cordRandom(0, 10) == 1) {
            interface[cord[0]][cord[1]] = 4;
        } else {
            interface[cord[0]][cord[1]] = 2;
        }
        if (vezes === 0) {
            interface.forEach(function (item) {
                if (item.includes('')) {
                    vezes++;
                } else {
                    contar++;
                }
            });
            if (contar == 4) {
                break;
            }
            continue;
        }
        break;
    }
}

function carregar_interface() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let casa = document.getElementById("casa" + (j + (i * 4)));
            casa.classList.remove('n2', 'n4', 'n8', 'n16', 'n32', 'n64','n128','n256','n512','n1024','n2048');
            casa.classList.add('n'+interface[i][j])
            //casa.innerText = interface[i][j];
        }
    }
}

function vertical(key, matriz) {
    let w = [1, 4, 1], s = [2, -1, -1], u;
    if (key == 'w') {
        u = w;
    } else {
        u = s;
    }
    for (var i = 0; i < 4; i++) {
        for (let somador = 1; somador > -1; somador--) {
            let tet = true;
            while (tet) {
                tet = false;
                for (var j = u[0]; j != u[1]; j += u[2]) {
                    if (matriz[j - u[2]][i] == '' && !(matriz[j][i] == '')) {
                        matriz[j - u[2]][i] = matriz[j][i];
                        matriz[j][i] = '';
                        tet = true;
                    }
                }
            }
            if (somador) {
                for (let j = u[0]; j != u[1]; j += u[2]) {
                    if (matriz[j - u[2]][i] == matriz[j][i] && matriz[j][i] != '') {
                        matriz[j - u[2]][i] *= 2;
                        matriz[j][i] = '';
                    }
                }
            }
        }
    }
    return matriz;
}

function horizontal(key, matriz) {
    let a = [1, 4, 1], d = [2, -1, -1], u;
    if (key == 'a') {
        u = a;
    } else {
        u = d;
    }
    matriz.forEach(function (i) {
        for (let somador = 1; somador > -1; somador--) {
            let tet = true;
            while (tet) {
                tet = false;
                for (let j = u[0]; j != u[1]; j += u[2]) {
                    if (i[j - u[2]] == '' && i[j] != '') {
                        i[j - u[2]] = i[j];
                        i[j] = '';
                        tet = 1;
                    }
                }
            }
            if (somador) {
                for (let j = u[0]; j != u[1]; j += u[2]) {
                    if (i[j - u[2]] == i[j] && i[j] != '') {
                        i[j - u[2]] *= 2;
                        i[j] = '';
                    }
                }
            }
        }
    });
    return matriz;
}

function simular_interface() {
    var novo_vetor = [];
    interface.forEach(function (item) {
        let vetor = Array.from(item);
        novo_vetor.push(vetor);
    });
    return novo_vetor;
}

function verify(simulado, inter) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (simulado[i][j] != inter[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function juiz() {
    [up, down, left, right] = [true, true, true, true];
    let simulado = simular_interface();
    simulado = vertical('w', simulado);
    if (verify(simulado, interface)) {
        up = false;
    }
    simulado = simular_interface();
    simulado = vertical('s', simulado);
    if (verify(simulado, interface)) {
        down = false;
    }
    simulado = simular_interface();
    simulado = horizontal('d', simulado);
    if (verify(simulado, interface)) {
        right = false;
    }
    simulado = simular_interface();
    simulado = horizontal('a', simulado);
    if (verify(simulado, interface)) {
        left = false;
    }
    if (!left && !right && !up && !down) {
        console.log("Você Perdeu!!");
        inicio = false;
        return 0
    }
    for (let vetor = 0; vetor < 4; vetor++) {
        if (interface[vetor].includes(2048)) {
            console.log("Você Ganhou");
            return 2;
        }
    }
}

document.querySelector('body').addEventListener('keydown', function () {
    var tecla = event.keyCode;
    if (inicio) {
        if (tecla == 87 && up) {                      //tecla == w
            vertical('w', interface);
            randomizador();
            juiz();
        } else if (tecla == 83 && down) {                //tecla == s
            vertical('s', interface);
            randomizador();
            juiz();
        } else if (tecla == 65 && left) {                //tecla == a
            horizontal('a', interface);
            randomizador();
            juiz();
        } else if (tecla == 68 && right) {                //telca == d
            horizontal('d', interface);
            randomizador();
            juiz();
        }
        carregar_interface();
    }
});

function iniciar() {
    [up, down, left, right] = [true, true, true, true];
    inicio = true;
    reset_interface();
    randomizador();
    carregar_interface();
}

function cheat() {
    for (let i = 0; i < 16; i++) {
        let casa = document.getElementById("casa" + i);
        if (i === 0 || i == 1) {
            casa.innerHTML = 1024
        } else {
            casa.innerText = '';
        }
    }

}
