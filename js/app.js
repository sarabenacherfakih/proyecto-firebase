import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

console.log("Firebase conectado");

const formulario = document.getElementById("formNota");
const textoNota = document.getElementById("textoNota");
const tablero = document.getElementById("tablero");

onSnapshot(collection(db, "notas"), (consulta) => {

    tablero.innerHTML = "";

    consulta.forEach((documento) => {

        tablero.innerHTML += `
            <div class="nota" data-id="${documento.id}">
                <p class="textoNota">${documento.data().texto}</p>

                <button class="btnEditar">
                    Editar
                </button>

                <button class="btnEliminar">
                    X
                </button>
            </div>
        `;

    });

});

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

});

tablero.addEventListener("click", async function(evento) {

    if (evento.target.classList.contains("btnEditar")) {

        const nota = evento.target.parentElement;

        const id = nota.dataset.id;

        const nuevoTexto = prompt(
            "Nuevo texto:",
            nota.querySelector(".textoNota").textContent
        );

        if (nuevoTexto === null || nuevoTexto === "") {
            return;
        }

        await updateDoc(
            doc(db, "notas", id),
            {
                texto: nuevoTexto
            }
        );

    }

    if (evento.target.classList.contains("btnEliminar")) {

        const nota = evento.target.parentElement;

        const id = nota.dataset.id;

        await deleteDoc(
            doc(db, "notas", id)
        );

    }

});