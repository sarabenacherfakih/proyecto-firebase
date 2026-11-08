import { db } from "./firebase.js";
import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

console.log("Firebase conectado");


const formulario = document.getElementById("formNota");
const textoNota = document.getElementById("textoNota");
const tablero = document.getElementById("tablero");

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
