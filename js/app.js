import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

console.log("Firebase conectado");

const formulario = document.getElementById("formNota");
const textoNota = document.getElementById("textoNota");
const tablero = document.getElementById("tablero");

async function cargarNotas() {

    const consulta = await getDocs(collection(db, "notas"));

    consulta.forEach((documento) => {

        tablero.innerHTML += `
            <div class="nota" data-id="${documento.id}">
                <p>${documento.data().texto}</p>
                <button class="btnEliminar">X</button>
            </div>
        `;

    });

}

cargarNotas();

formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const texto = textoNota.value;

    if (texto === "") {
        return;
    }

    await addDoc(
        collection(db, "notas"),
        {
            texto: texto
        }
    );

    textoNota.value = "";

    location.reload();

});

tablero.addEventListener("click", async function(evento) {

    if (evento.target.classList.contains("btnEliminar")) {

        const nota = evento.target.parentElement;

        const id = nota.dataset.id;

        await deleteDoc(doc(db, "notas", id));

        nota.remove();

    }

});
