String.prototype.replaceAt = function (index, character) {
    return this.substring(0, index) + character + this.substring(index + character.length); 
}

const PALABRAS= ['perro', 'gato', 'casa', 'libro', 'tarea', 'edificio', 'mesa', 'flores', 'bufanda', 'peluche'];
const PALABRA= PALABRAS[Math.floor(Math.random()*PALABRAS.length)];
const RESULTADO= document.getElementById('resultado');
const EXP= document.getElementById('explicacion');
const CALC= document.getElementById('calcular');
let letra= document.getElementById('letra');
let palabraSecreta= PALABRA.replace(/./g, "_ ");
let contadorFallos= 0;

document.getElementById('texto').innerHTML= palabraSecreta;

document.getElementById('calcular').addEventListener('click', () => {
    CALC.disabled= false;
    letra.disabled= false;
    EXP.style.display= 'block';
    const LETRA= document.getElementById('letra').value;
    let fallo= true; 
    for(const i in PALABRA){
        if(LETRA==PALABRA[i]){
            palabraSecreta= palabraSecreta.replaceAt(i*2, LETRA);
            fallo= false;
        }
    }
    if(fallo){
        contadorFallos++;
        if(contadorFallos<6){
        document.getElementById('ahorcado').style.backgroundPosition= -(171*contadorFallos) + 'px 0';
        }if(contadorFallos==5){
            EXP.style.display= 'none';
            RESULTADO.innerHTML= `Perdiste! La palabra era ${PALABRA}.`;
            letra.disabled= true;
            CALC.disabled= true;
        }
    }else if(palabraSecreta.indexOf('_')<0){
            EXP.style.display= 'none';
            RESULTADO.innerHTML= 'Ganaste!';
            letra.disabled= true;
            CALC.disabled= true;
        }

    document.getElementById('texto').innerHTML= palabraSecreta;
    document.getElementById('letra').value= '';
    document.getElementById('letra').focus();
});

letra.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("calcular").click();
    }
  });