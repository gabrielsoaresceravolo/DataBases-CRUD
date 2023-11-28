<?php

    if($_POST)
    {
        if(isset($_POST['btnEnviar']))
        {
            $fornecedor = $_POST['fornecedor'];
            $CNPJ = $_POST['CNPJ'];
            $responsavel = $_POST['responsavel'];
            $razao = $_POST['razao'];
            $endereco = $_POST['endereco'];
            $cidade = $_POST['cidade'];
            $estado = $_POST['estado'];
            $email = $_POST['email'];
            $telefone = $_POST['telefone'];

            $curl = curl_init();
            $url = "https://sa-east-1.aws.data.mongodb-api.com/app/data-llqkk/endpoint/data/v1/action/insertOne";
            $dadosCliente = array(
                "fornecedor" => $fornecedor,
                "CNPJ" => $CNPJ,
                "responsavel" => $responsavel,
                "razao" => $razao,
                "endereco" => $endereco,
                "cidade" => $cidade,
                "estado" => $estado,
                "email" => $email,
                "telefone" => $telefone
            );
            $dadosCorpo = array(
                "dataSource" => "Cluster0",
                "database" => "primeiro_banco",
                "collection" => "fornecedores",
                "document" => $dadosCliente
            );
            $dadosCorpo = json_encode($dadosCorpo);

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $dadosCorpo);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                "Content-Type: application/json", 
                "Accept: application/json", 
                "apiKey: Prg2peiQ6RyLtuv2qQYn6KcFUQorMXaF0Jsy8EjqMeJyfnFenzHnVi5rme9ENCfc"
            ));

            $response = curl_exec($curl);
            echo $response;
        }
    }
?>