import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, addDoc, collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

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

async function inserirCliente() 
{

    let valor_nome = document.querySelector('#inserir-nome').value;
    let valor_email = document.querySelector('#inserir-email').value;

    try 
    {
        await addDoc(collection(db, "cliente"),
        {
            nome: valor_nome,
            email: valor_email
        });

        const toast = new bootstrap.Toast(document.querySelector("#toastInserirSucesso"));
        toast.show();
        table.rows().remove().draw
        table.destroy();
        carregarDados();

    }
    catch (e) 
    {
        const toast = new bootstrap.Toast(document.querySelector("#toastInserirErro"));
        toast.show();
    }

    document.querySelector('#insert-nome').value = "";
    document.querySelector('#insert-email').value = "";

}

/*===========================================================*/

async function carregarDados() 
{

    var table = new DataTable('#tabela',
    {
        language:
        {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/en-GB.json', //lingua da tabela (en-GB.json / pt-BR.json)
        },
    });

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
    const btnsAlterar = Array.from(document.getElementsByClassName("btn-outline-warning"));
    const btnsDeletar = Array.from(document.getElementsByClassName("btn-outline-danger"));

    btnsConsultar.forEach(btn => { btn.addEventListener('click', consultarCliente) });
    btnsAlterar.forEach(btn => { btn.addEventListener('click', alterarCliente) });
    btnsDeletar.forEach(btn => { btn.addEventListener('click', deletarCliente) });
}

/*===========================================================*/

async function consultarCliente() 
{
    table = new DataTable('#tabela', 
    {
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
        },
    });
    const q = query(collection(db, "cliente"));
    const resultado = await getDocs(q);

    resultado.forEach(
        (dados) => {
            table.row.add([
                dados.data().nome, dados.data().email,
                `<button type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                    data-bs-target="#consultarModal" value="${dados.id}">
                    View
                </button>
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal"
                    data-bs-target="#alterarModal" value="${dados.id}">
                    Modify
                </button>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                    data-bs-target="#excluirModal" value="${dados.id}">
                    Delete
                </button>`
            ]).draw(false);
            table.column(0).data().sort();
        }
    );
    
    const btnConsultar = Array.from(document.getElementsByClassName('btn-outline-info'));
    const btnAlterar = Array.from(document.getElementsByClassName('btn-outline-warning'));
    const btnDeletar = Array.from(document.getElementsByClassName('btn-outline-danger'));

    btnDeletar.forEach(btn => { btn.addEventListener('click', deletarCliente) });
    btnAlterar.forEach(btn => { btn.addEventListener('click', alterarCliente) });
    btnConsultar.forEach(btn => { btn.addEventListener('click', consultarCliente) });
}

/*===========================================================*/

async function deletarCliente() 
{
    let id = this.value;
    const consulta = doc(db, "cliente", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) 
    {
        document.getElementById("deletar-id-Cliente").value = id;
        document.getElementById("deletar-nome").innerHTML = resultado.data().nome;
        document.getElementById("deletar-email").innerHTML = resultado.data().email;
    }
}

async function deletarClienteBD()
{
    let id = document.getElementById("deletar-id-Cliente").value;
    try
    {
        await deleteDoc(doc(db, "cliente", id));
        const toast = new bootstrap.Toast(document.getElementById("toastDeletarSucesso"));
        toast.show();
        table.rows().remove().draw();
        table.destroy();
        carregarDados();
    } 
    catch (e)
    {
        const toast = new bootstrap.Toast(document.getElementById("toastDeletarErro"));
        toast.show();
    }
}

/*===========================================================*/

async function alterarCliente() 
{
    let id = this.value;
    const consulta = doc(db, "cliente", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) 
    {
        document.getElementById("alterar-id-Cliente").value = id;
        document.getElementById("alterar-nome").value = resultado.data().nome;
        document.getElementById("alterar-email").value = resultado.data().email;
    }
}

async function alterarClienteBD()
{
    let id = document.getElementById("alterar-id-Cliente").value;
    let valor_nome = document.getElementById("alterar-nome").value;
    let valor_email = document.getElementById("alterar-email").value;
    try
    {
        let cliente = doc(db, "cliente", id);
        await updateDoc(cliente, {nome: valor_nome, email: valor_email} );
        const toast = new bootstrap.Toast(document.getElementById("toastAlterarSucesso"));
        toast.show();
        table.rows().remove().draw();
        table.destroy();
        carregarDados();
    } 
    catch (e)
    {
        const toast = new bootstrap.Toast(document.getElementById("toastAlterarErro"));
        toast.show();
    }

}

/*===========================================================*/

document.querySelector("#btnInserirCliente").addEventListener("click", inserirCliente);
document.querySelector("#btnAlterarCliente").addEventListener("click", alterarCliente);
document.querySelector("#btnDeletarCliente").addEventListener("click", deletarCliente);

/*=====*/

document.querySelector("#btnAlterarCliente").addEventListener("click", alterarClienteBD);
document.querySelector("#btnDeletarCliente").addEventListener("click", deletarClienteBD);

/*===========================================================*/

document.addEventListener("DOMContentLoaded", function (e) {
    carregarDados();
});