import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const formulario = document.getElementById("formNota");
const textoNota = document.getElementById("textoNota");
const tablero = document.getElementById("tablero");

onSnapshot(collection(db, "notas"), (consulta) => {

    tablero.innerHTML = "";

    consulta.forEach((documento) => {

        const datos = documento.data();

        tablero.innerHTML += `
            <div
                class="nota"
                data-id="${documento.id}"
                style="
                    left:${datos.x || 20}px;
                    top:${datos.y || 20}px;
                "
            >
                <p class="textoNota">${datos.texto}</p>

                <button class="btnEliminar">
                    X
                </button>
            </div>
        `;

    });

    activarArrastre();

});

formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const texto = textoNota.value.trim();

    if (texto === "") {
        return;
    }

    await addDoc(
        collection(db, "notas"),
        {
            texto: texto,
            x: Math.floor(Math.random() * 500),
            y: Math.floor(Math.random() * 300)
        }
    );

    textoNota.value = "";

});

tablero.addEventListener("dblclick", async function(evento) {

    const nota = evento.target.closest(".nota");

    if (!nota) {
        return;
    }

    const id = nota.dataset.id;

    const textoActual =
        nota.querySelector(".textoNota").textContent;

    const nuevoTexto = prompt(
        "Editar nota:",
        textoActual
    );

    if (nuevoTexto === null || nuevoTexto.trim() === "") {
        return;
    }

    await updateDoc(
        doc(db, "notas", id),
        {
            texto: nuevoTexto
        }
    );

});

tablero.addEventListener("click", async function(evento) {

    if (evento.target.classList.contains("btnEliminar")) {

        const nota = evento.target.parentElement;
        const id = nota.dataset.id;

        const confirmar = confirm(
            "¿Seguro que quieres borrar esta nota?"
        );

        if (!confirmar) {
            return;
        }

        await deleteDoc(
            doc(db, "notas", id)
        );

    }

});

function activarArrastre() {

    const notas = document.querySelectorAll(".nota");

    notas.forEach((nota) => {

        let moviendo = false;
        let offsetX = 0;
        let offsetY = 0;

        nota.addEventListener("mousedown", function(e) {

            moviendo = true;

            const rect = nota.getBoundingClientRect();

            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

        });

        document.addEventListener("mousemove", function(e) {

            if (!moviendo) {
                return;
            }

            const rectTablero =
                tablero.getBoundingClientRect();

            const nuevaX =
                e.clientX -
                rectTablero.left -
                offsetX;

            const nuevaY =
                e.clientY -
                rectTablero.top -
                offsetY;

            nota.style.left = nuevaX + "px";
            nota.style.top = nuevaY + "px";

        });

        document.addEventListener("mouseup", async function() {

            if (!moviendo) {
                return;
            }

            moviendo = false;

            const id = nota.dataset.id;

            await updateDoc(
                doc(db, "notas", id),
                {
                    x: parseInt(nota.style.left),
                    y: parseInt(nota.style.top)
                }
            );

        });

    });

}
