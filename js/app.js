import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

console.log("Firebase conectado");


const formulario = document.getElementById("formNota");
const textoNota = document.getElementById("textoNota");
const tablero = document.getElementById("tablero");

async function cargarNotas() {

    const consulta = await getDocs(collection(db, "notas"));

    consulta.forEach((doc) => {

        tablero.innerHTML += `
            <div class="nota">
                <p>${doc.data().texto}</p>
            </div>
        `;
    });
}

cargarNotas();

formulario.addEventListener("submit", async function(evento)
{

    evento.preventDefault();

    const texto = textoNota.value;

    if (texto === "") {
        return;
    }

    await addDoc(
        collection(db, "notas"),
            {
                texto: texto
            });
    
    

    textoNota.value = "";
});
