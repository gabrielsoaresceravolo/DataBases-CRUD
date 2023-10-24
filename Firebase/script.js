import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, addDoc, collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

/*=========================*/
/*  Tabela de Informações  */
/*=========================*/

var table = new DataTable('#tabela',
    {
        language:
        {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/en-GB.json', //lingua da table (en-US.json / pt-BR.json)
        },
    });

/*===========================================================*/

const firebaseConfig =
{
    apiKey: "AIzaSyBuZwQQbkWYoIH94q964IhjspEjYw32iGE",
    authDomain: "learning-firebase-crud-project.firebaseapp.com",
    projectId: "learning-firebase-crud-project",
    storageBucket: "learning-firebase-crud-project.appspot.com",
    messagingSenderId: "208284862149",
    appId: "1:208284862149:web:5c216b57b9681b9ab8d2ac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/*===========================================================*/

async function inserirCliente() {

    let valor_nome = document.querySelector('#inserir-nome').value;
    let valor_email = document.querySelector('#inserir-email').value;

    try {
        await addDoc(collection(db, "cliente"),
            {
                nome: valor_nome,
                email: valor_email
            });

        const toast = new bootstrap.Toast(document.querySelector("#toastInserirSucesso"));
        toast.show();

        table.row.add([
            valor_nome, valor_email,
            `<button type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                    data-bs-target="#consultarModal">
                    View
                </button>
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal"
                    data-bs-target="#alterarModal">
                    Modify
                </button>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                    data-bs-target="#excluirModal">
                    Delete
                </button>`
        ]).draw(false);
        table.column(0).data().sort();

    }
    catch (e) {
        const toast = new bootstrap.Toast(document.querySelector("#toastInserirErro"));
        toast.show();
    }

    document.querySelector('#insert-nome').value = "";
    document.querySelector('#insert-email').value = "";

}

/*===========================================================*/

async function carregarDados() {
    const q = query(collection(db, "cliente"));
    const resultado = await getDocs(q);

    resultado.forEach(
        (dados) => {
            table.row.add([
                dados.data().nome, dados.data().email,
                `<button value="${dados.id}" type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                    data-bs-target="#consultarModal">
                    View
                </button>
                <button value="${dados.id}" type="button" class="btn btn-outline-warning" data-bs-toggle="modal"
                    data-bs-target="#alterarModal">
                    Modify
                </button>
                <button value="${dados.id}" type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                    data-bs-target="#excluirModal">
                    Delete
                </button>`
            ]).draw(false);
            table.column(0).data().sort();
        }
    );

    const btnsConsultar = Array.from(document.getElementsByClassName("btn-outline-info"));
    const btnsDeletar = Array.from(document.getElementsByClassName("btn-outline-danger"));
    const btnsAlterar = Array.from(document.getElementsByClassName("btn-outline-warning"));

    btnsConsultar.forEach(btn => { btn.addEventListener('click', ConsultarCliente) });
    btnsDeletar.forEach(btn => { btn.addEventListener('click', DeletarCliente) });
    btnsAlterar.forEach(btn => { btn.addEventListener('click', AlterarCliente) });
}

async function ConsultarCliente() {
    const id = this.value;
    const consulta = doc(db, "cliente", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) {
        document.getElementById("consultar-nome").innerHTML = resultado.data().nome;
        document.getElementById("consultar-email").innerHTML = resultado.data().email;
    }
}

async function DeletarCliente() {
    const id = this.value;
    const consulta = doc(db, "cliente", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) {
        document.getElementById("deletar-nome").innerHTML = resultado.data().nome;
        document.getElementById("deletar-email").innerHTML = resultado.data().email;
    }
}

async function AlterarCliente() {
    const id = this.value;
    const consulta = doc(db, "cliente", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) {
        document.getElementById("alterar-nome").value = resultado.data().nome;
        document.getElementById("alterar-email").value = resultado.data().email;
    }
}

async function salvarAlteracaoCliente() {

    let valor_nome = document.querySelector('#alterar-nome').value;
    let valor_email = document.querySelector('#alterar-email').value;

    try {
        await addDoc(collection(db, "cliente"),
            {
                nome: valor_nome,
                email: valor_email
            });

        const toast = new bootstrap.Toast(document.querySelector("#toastInserirSucesso"));
        toast.show();

    }
    catch (e) {
        const toast = new bootstrap.Toast(document.querySelector("#toastInserirErro"));
        toast.show();
    }

    document.querySelector('#alterar-nome').value = "";
    document.querySelector('#alterar-email').value = "";

}

document.querySelector("#btnInserirCliente").addEventListener("click", inserirCliente);
document.querySelector("#btnAlterarCliente").addEventListener("click", salvarAlteracaoCliente);

document.addEventListener("DOMContentLoaded", function (e) {
    carregarDados();
});