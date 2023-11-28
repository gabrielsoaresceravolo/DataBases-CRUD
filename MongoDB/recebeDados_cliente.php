<?php

    if($_POST)
    {
        if(isset($_POST['btnEnviar']))
        {
            $nome = $_POST['nome'];
            $email = $_POST['email'];

            $curl = curl_init();
            $url = "https://sa-east-1.aws.data.mongodb-api.com/app/data-llqkk/endpoint/data/v1/action/insertOne";
            $dadosCliente = array(
                "nome" => $nome,
                "email" => $email
            );
            $dadosCorpo = array(
                "dataSource" => "Cluster0",
                "database" => "primeiro_banco",
                "collection" => "clientes",
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
    else if($_GET)
    {

    }
?>