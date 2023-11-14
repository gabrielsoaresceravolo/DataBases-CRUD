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

async function inserirProduto() 
{

    let valor_nome = document.querySelector('#inserir-nome').value;
    let valor_descricao = document.querySelector('#inserir-descricao').value;
    let valor_preco = document.querySelector('#inserir-valor').value;
    let valor_maxEstoque = document.querySelector('#inserir-maxEstoque').value;
    let valor_minEstoque = document.querySelector('#inserir-minEstoque').value;

    try 
    {
        await addDoc(collection(db, "produto"),
        {
            nome: valor_nome,
            descricao: valor_descricao,
            preco: valor_preco,
            maxEstoque: valor_maxEstoque,
            minEstoque: valor_minEstoque
        });

        const toast = new bootstrap.Toast(document.querySelector("#toastInserirSucesso"));
        toast.show();
        carregarDados();

    }
    catch (e) 
    {
        const toast = new bootstrap.Toast(document.querySelector("#toastInserirErro"));
        toast.show();
    }

    document.querySelector('#inserir-nome').value = "";
    document.querySelector('#inserir-descricao').value = "";
    document.querySelector('#inserir-valor').value = "";
    document.querySelector('#inserir-maxEstoque').value = "";
    document.querySelector('#inserir-minEstoque').value = "";

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

    const q = query(collection(db, "produto"));
    const resultado = await getDocs(q);

    resultado.forEach(
        (dados) => {
            table.row.add([
                dados.data().nome, dados.data().descricao, dados.data().preco, dados.data().maxEstoque, dados.data().minEstoque,
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

    btnsConsultar.forEach(btn => { btn.addEventListener('click', consultarProduto) });
    btnsAlterar.forEach(btn => { btn.addEventListener('click', alterarProduto) });
    btnsDeletar.forEach(btn => { btn.addEventListener('click', deletarProduto) });
}

/*===========================================================*/

async function consultarProduto() 
{
    let id = this.value;
    const consulta = doc(db, "produto", id);
    const resultado = await getDoc(consulta);

    if(resultado.exists())
    {
        document.getElementById("consultar-nome").innerHTML = resultado.data().nome;
        document.getElementById("consultar-descricao").innerHTML = resultado.data().descricao;
        document.getElementById("consultar-valor").innerHTML = resultado.data().preco;
        document.getElementById("consultar-maxStock").innerHTML = resultado.data().maxEstoque;
        document.getElementById("consultar-minStock").innerHTML = resultado.data().minEstoque;
    }
}

/*===========================================================*/

async function deletarProduto() 
{
    let id = this.value;
    const consulta = doc(db, "produto", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) 
    {
        document.getElementById("deletar-id-Produto").value = id;
        document.getElementById("deletar-nome").innerHTML = resultado.data().nome;
        document.getElementById("deletar-descricao").innerHTML = resultado.data().descricao;
        document.getElementById("deletar-valor").innerHTML = resultado.data().preco;
        document.getElementById("deletar-maxEstoque").innerHTML = resultado.data().maxEstoque;
        document.getElementById("deletar-minEstoque").innerHTML = resultado.data().minEstoque;
    }
}

async function deletarProdutoBD()
{
    let id = document.getElementById("deletar-id-Produto").value;
    try
    {
        await deleteDoc(doc(db, "produto", id));
        const toast = new bootstrap.Toast(document.getElementById("toastDeletarSucesso"));
        toast.show();
        carregarDados();
    } 
    catch (e)
    {
        const toast = new bootstrap.Toast(document.getElementById("toastDeletarErro"));
        toast.show();
    }
}

/*===========================================================*/

async function alterarProduto() 
{
    let id = this.value;
    const consulta = doc(db, "produto", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) 
    {
        document.getElementById("alterar-id-Produto").value = id;
        document.getElementById("alterar-nome").innerHTML = resultado.data().nome;
        document.getElementById("alterar-descricao").innerHTML = resultado.data().descricao;
        document.getElementById("alterar-valor").innerHTML = resultado.data().preco;
        document.getElementById("alterar-maxEstoque").innerHTML = resultado.data().maxEstoque;
        document.getElementById("alterar-minEstoque").innerHTML = resultado.data().minEstoque;
    }
}

async function alterarProdutoBD()
{
    let id = document.getElementById("alterar-id-Produto").value;
    let valor_nome = document.getElementById("alterar-nome").value;
    let valor_descricao = document.getElementById("alterar-descricao").value;
    let valor_preco = document.getElementById("alterar-valor").value;
    let valor_maxEstoque = document.getElementById("alterar-maxEstque").value;
    let valor_minEstoque = document.getElementById("alterar-minEstque").value;
    
    try
    {
        let produto = doc(db, "produto", id);
        await updateDoc(produto, {nome: valor_nome, descricao: valor_descricao, preco: valor_preco, maxEstoque: valor_maxEstoque, minEstoque: valor_minEstoque} );
        const toast = new bootstrap.Toast(document.getElementById("toastAlterarSucesso"));
        toast.show();
        carregarDados();
    } 
    catch (e)
    {
        const toast = new bootstrap.Toast(document.getElementById("toastAlterarErro"));
        toast.show();
    }

}

/*===========================================================*/

document.querySelector("#btnInserirProduto").addEventListener("click", inserirProduto);
document.querySelector("#btnAlterarProduto").addEventListener("click", alterarProduto);
document.querySelector("#btnDeletarProduto").addEventListener("click", deletarProduto);

/*=====*/

document.querySelector("#btnAlterarProduto").addEventListener("click", alterarProdutoBD);
document.querySelector("#btnDeletarProduto").addEventListener("click", deletarProdutoBD);

/*===========================================================*/

document.addEventListener("DOMContentLoaded", function (e) 
{
    carregarDados();
});