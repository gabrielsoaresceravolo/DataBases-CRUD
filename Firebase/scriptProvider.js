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

async function inserirFornecedor() 
{

    let valor_nome = document.querySelector('#inserir-nome').value;
    let valor_CNPJ = document.querySelector('#inserir-CNPJ').value;
    let valor_responsavel = document.querySelector('#inserir-responsavel').value;
    let valor_razao = document.querySelector('#inserir-razao').value;
    let valor_endereco = document.querySelector('#inserir-endereco').value;
    let valor_numero = document.querySelector('#inserir-numero').value;
    let valor_cidade = document.querySelector('#inserir-cidade').value;
    let valor_estado = document.querySelector('#inserir-estado').value;
    let valor_email = document.querySelector('#inserir-email').value;
    let valor_telefone = document.querySelector('#inserir-telefone').value;

    try 
    {
        await addDoc(collection(db, "fornecedor"),
        {
            nome: valor_nome,
            dados_CNPJ: valor_CNPJ,
            responsavel: valor_responsavel,
            razao: valor_razao,
            endereco: valor_endereco,
            numero: valor_numero,
            cidade: valor_cidade,
            estado: valor_estado,
            email: valor_email,
            telefone: valor_telefone
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
    document.querySelector('#inserir-CNPJ').value = "";
    document.querySelector('#inserir-responsavel').value = "";
    document.querySelector('#inserir-razao').value = "";
    document.querySelector('#inserir-endereco').value = "";
    document.querySelector('#inserir-numero').value = "";
    document.querySelector('#inserir-cidade').value = "";
    document.querySelector('#inserir-estado').value = "";
    document.querySelector('#inserir-email').value = "";
    document.querySelector('#inserir-telefone').value = "";


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

    const q = query(collection(db, "fornecedor"));
    const resultado = await getDocs(q);

    resultado.forEach(
        (dados) => {
            table.row.add([
                dados.data().nome, dados.data().dados_CNPJ, dados.data().responsavel, dados.data().razao, dados.data().endereco, dados.data().numero, dados.data().cidade, dados.data().estado, dados.data().email, dados.data().telefone, 
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

    btnsConsultar.forEach(btn => { btn.addEventListener('click', consultarFornecedor) });
    btnsAlterar.forEach(btn => { btn.addEventListener('click', alterarFornecedor) });
    btnsDeletar.forEach(btn => { btn.addEventListener('click', deletarFornecedor) });
}

/*===========================================================*/

async function consultarFornecedor() 
{
    let id = this.value;
    const consulta = doc(db, "fornecedor", id);
    const resultado = await getDoc(consulta);

    if(resultado.exists())
    {
        document.getElementById("consultar-nome").innerHTML = resultado.data().nome;
        document.getElementById("consultar-CNPJ").innerHTML = resultado.data().CNPJ;
        document.getElementById("consultar-responsavel").innerHTML = resultado.data().responsavel;
        document.getElementById("consultar-razao").innerHTML = resultado.data().razao;
        document.getElementById("consultar-endereco").innerHTML = resultado.data().endereco;
        document.getElementById("consultar-numero").innerHTML = resultado.data().numero;
        document.getElementById("consultar-cidade").innerHTML = resultado.data().cidade;
        document.getElementById("consultar-estado").innerHTML = resultado.data().estado;
        document.getElementById("consultar-email").innerHTML = resultado.data().email;
        document.getElementById("consultar-telefone").innerHTML = resultado.data().telefone;
    }
}

/*===========================================================*/

async function deletarFornecedor() 
{
    let id = this.value;
    const consulta = doc(db, "fornecedor", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) 
    {
        document.getElementById("deletar-id-Fornecedor").value = id;
        document.getElementById('deletar-nome').innerHTML = resultado.data().nome;
        document.getElementById('deletar-CNPJ').innerHTML = resultado.data().dados_CNPJ;
        document.getElementById('deletar-responsavel').innerHTML = resultado.data().responsavel;
        document.getElementById('deletar-razao').innerHTML = resultado.data().razao;
        document.getElementById('deletar-endereco').innerHTML = resultado.data().endereco;
        document.getElementById('deletar-numero').innerHTML = resultado.data().numero;
        document.getElementById('deletar-cidade').innerHTML = resultado.data().cidade;
        document.getElementById('deletar-estado').innerHTML = resultado.data().estado;
        document.getElementById('deletar-email').innerHTML = resultado.data().email;
        document.getElementById('deletar-telefone').innerHTML = resultado.data().telefone;
    }
}

async function deletarFornecedorBD()
{
    let id = document.getElementById("deletar-id-Fornecedor").value;
    try
    {
        await deleteDoc(doc(db, "fornecedor", id));
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

async function alterarFornecedor() 
{
    let id = this.value;
    const consulta = doc(db, "fornecedor", id);
    const resultado = await getDoc(consulta);

    if (resultado.exists()) 
    {
        document.getElementById("alterar-id-Fornecedor").value = id;
        document.getElementById('alterar-nome').innerHTML = resultado.data().nome;
        document.getElementById('alterar-CNPJ').innerHTML = resultado.data().dados_CNPJ;
        document.getElementById('alterar-responsavel').innerHTML = resultado.data().responsavel;
        document.getElementById('alterar-razao').innerHTML = resultado.data().razao;
        document.getElementById('alterar-endereco').innerHTML = resultado.data().endereco;
        document.getElementById('alterar-numero').innerHTML = resultado.data().numero;
        document.getElementById('alterar-cidade').innerHTML = resultado.data().cidade;
        document.getElementById('alterar-estado').innerHTML = resultado.data().estado;
        document.getElementById('alterar-email').innerHTML = resultado.data().email;
        document.getElementById('alterar-telefone').innerHTML = resultado.data().telefone;
    }
}

async function alterarFornecedorBD()
{
    let id = document.getElementById("alterar-id-Fornecedor").value;
    let valor_nome = document.getElementById('alterar-nome').value;
    let valor_CNPJ = document.getElementById('alterar-CNPJ').value;
    let valor_responsavel = document.getElementById('alterar-responsavel').value;
    let valor_razao = document.getElementById('alterar-razao').value;
    let valor_endereco = document.getElementById('alterar-endereco').value;
    let valor_numero = document.getElementById('alterar-numero').value;
    let valor_cidade = document.getElementById('alterar-cidade').value;
    let valor_estado = document.getElementById('alterar-estado').value;
    let valor_email = document.getElementById('alterar-email').value;
    let valor_telefone = document.getElementById('alterar-telefone').value;
    
    try
    {
        let fornecedor = doc(db, "fornecedor", id);
        await updateDoc(fornecedor, {nome: valor_nome, dados_CNPJ: valor_CNPJ, responsavel: valor_responsavel, razao: valor_razao, endereco: valor_endereco, numero: valor_numero, cidade:valor_cidade, estado: valor_estado, email: valor_email, telefone: valor_telefone} );
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

document.querySelector("#btnInserirFornecedor").addEventListener("click", inserirFornecedor);
document.querySelector("#btnAlterarFornecedor").addEventListener("click", alterarFornecedor);
document.querySelector("#btnDeletarFornecedor").addEventListener("click", deletarFornecedor);

/*=====*/

document.querySelector("#btnAlterarFornecedor").addEventListener("click", alterarFornecedorBD);
document.querySelector("#btnDeletarFornecedor").addEventListener("click", deletarFornecedorBD);

/*===========================================================*/

document.addEventListener("DOMContentLoaded", function (e) 
{
    carregarDados();
});