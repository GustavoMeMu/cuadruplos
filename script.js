const generarCuadruplos = () => {
    const entrada = document.getElementById("operation").value;
    let cuadruplos = [];

    const tokens = entrada.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
    const numeros = tokens.filter(token => !isNaN(token));
    const operadores = tokens.filter(token => ['+', '-', '*', '/'].includes(token));
    const paréntesis = tokens.filter(token => ['(', ')'].includes(token));

    if (numeros.length > 5) {
        document.getElementById("resultado").textContent = "No se pueden ingresar más de 5 números.";
        return;
    }
    if (operadores.length > 4) {
        document.getElementById("resultado").textContent = "No se pueden ingresar más de 4 operadores.";
        return;
    }
    if (paréntesis.length > 0) {
        document.getElementById("resultado").textContent = "Operación no válida.";
        return;
    }

    try {
        const resultado = eval(entrada); 
        document.getElementById("resultado").textContent = `Resultado: ${resultado}`;
    } catch (e) {
        document.getElementById("resultado").textContent = "Operación no válida.";
        return;
    }

    const precedenciaOperadores = { '+': 1, '-': 1, '*': 2, '/': 2 };

    const procesarOperador = (op, a, b) => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        let resultado;

        switch (op) {
            case '+':
                resultado = numA + numB;
                break;
            case '-':
                resultado = numA - numB;
                break;
            case '*':
                resultado = numA * numB;
                break;
            case '/':
                resultado = numA / numB;
                break;
        }

        cuadruplos.push({ op, arg1: a, arg2: b, result: resultado });
        return resultado; 
    };

    let colaSalida = [];
    let pilaOperadores = [];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            colaSalida.push(token);
        } else if (precedenciaOperadores[token]) {
            while (
                pilaOperadores.length &&
                precedenciaOperadores[pilaOperadores[pilaOperadores.length - 1]] >= precedenciaOperadores[token]
            ) {
                colaSalida.push(pilaOperadores.pop());
            }
            pilaOperadores.push(token);
        }
    });

    while (pilaOperadores.length) {
        colaSalida.push(pilaOperadores.pop());
    }
    let pila = [];
    colaSalida.forEach(token => {
        if (!isNaN(token)) {
            pila.push(token);
        } else if (precedenciaOperadores[token]) {
            const b = pila.pop();
            const a = pila.pop();
            const resultado = procesarOperador(token, a, b);
            pila.push(resultado);
        }
    });

    const cuadruplosDiv = document.getElementById("cuadruplos");
    cuadruplosDiv.innerHTML = `<h2>Cuádruplos</h2>`;
    cuadruplos.forEach((quad, index) => {
        cuadruplosDiv.innerHTML += `<p>${index + 1}: (${quad.op}, ${quad.arg1}, ${quad.arg2}, ${quad.result})</p>`;
    });
};
