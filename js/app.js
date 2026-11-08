const formulario = document.getElementById("formNota");
const textoNota = document.getElementById("textoNota");
const tablero = document.getElementById("tablero");

formulario.addEventListener("submit", function(evento) 
{

    evento.preventDefault();

    const texto = textoNota.value;

    if (texto === "") {
        return;
    }

    tablero.innerHTML += ` <div class="nota"> <p>${texto}</p></div>`;
    
    

    textoNota.value = "";
});
