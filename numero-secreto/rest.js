
    let numeroSecreto = 0, usuario = 0, intentos = 1, maximo = 10, maximosIntentos = 0;
    let historial = [];
    numeroSecreto = nuevoNumeroSecreto();

    function verificar(){
        usuario = parseInt(document.getElementById("entradaUsuario").value);
        let veces = intentos > 1 ? "Veces" : "Vez";
        
        if (usuario == numeroSecreto){
            resultado(`<b>Acertaste el numero secreto!</b> Lo lograste en: <strong>${intentos}</strong> ${veces}`);
            historial.push(numeroSecreto);
            deshabilitar("intento");
            habilitar("reset");
        } else if (usuario > numeroSecreto){
            resultado("El numero secreto es menor");
        } else {
            resultado("El numero secreto es mayor");
        }
        document.getElementById("entradaUsuario").focus();
        document.getElementById("entradaUsuario").value = "";
        verificarIntentos(maximosIntentos)
        intentos++;

    }

    function resultado (x){
        document.querySelector("#resultado").innerHTML = x;
    }

    function condicionesIniciales(maximo){
        numeroSecreto = Math.floor(Math.random()*maximo + 1);

        
        if (historial.length == maximo){
            historial = [];
        }

        if (maximo == 100){
            nivelDificil();
            maximo = 100;
        }else if (maximo == 50){
            nivelIntermedio();
            maximo = 50;
        } else {
            nivelFacil();
            maximo = 10;
        }

        resultado(`Ingresa un numero del 1 - ${maximo}`);
        deshabilitar("reset");
        habilitar("intento");

        return numeroSecreto;
    }

    function verificarIntentos(maximosIntentos){
        if (intentos >= maximosIntentos){
            deshabilitar("intento");
            habilitar("reset");
            historial.push(numeroSecreto);
        }
    }

    function nivelar(maximoNumeroSecreto){
        numeroSecreto = condicionesIniciales(maximoNumeroSecreto);

    }

    function deshabilitar(x){
        document.getElementById(x).setAttribute("disabled", true);
    }
    
    function habilitar(x){
        document.getElementById(x).removeAttribute("disabled");
    }

    function nivelFacil(){
        eliminarH3();
        deshabilitar("facil");
        habilitar("intermedio");
        habilitar("dificil");
        nuevoJuego();
        maximosIntentos = 5;
    }

    function nivelIntermedio(){
        eliminarH3();
        deshabilitar("intermedio");
        habilitar("facil");
        habilitar("dificil");
        nuevoJuego();
        maximosIntentos = 10;
    }

    function nivelDificil(){
        eliminarH3();
        deshabilitar("dificil");
        habilitar("intermedio");
        habilitar("facil");
        nuevoJuego();
        maximosIntentos = 20;
    }

    function nuevoJuego(){
        document.getElementById("entradaUsuario").focus();
        habilitar("intento");
        deshabilitar("reset");
        nuevoNumeroSecreto();
        intentos = 1;
    }

    function nuevoNumeroSecreto(){        
        if (historial.includes(numeroSecreto)){
            numeroSecreto = condicionesIniciales(maximo);
        } else {
            return numeroSecreto;
        }
    }

    function eliminarH3(){
        document.querySelector("h3").innerHTML = "";
    }