using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using WebApiUi5.Model;

namespace WebApiUi5.Infra
{
    public class RepositorioCliente
    {
        public SqlConnection Open()
        {
            var dbCoon = new SqlConnection("Server=147.182.248.84;Database=ABancoDeDados;UID=sa;Password=7878w1zKl");

            dbCoon.Open();

            if (dbCoon.State != ConnectionState.Open)
            {
                 throw new Exception(message: "Não foi possível conectar!!!");
            }
            return dbCoon;
        }

        public List<ClienteModel> ObterClientes()
        {
            var clientes = new List<ClienteModel>();

            using (var dcCoon = Open())
            {

                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = "Select * From TabelaDeClientes";
                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {
                        var cliente = new ClienteModel();
                        cliente.Id = dbReader.GetInt32("Id");
                        cliente.Nome = dbReader.GetString("Nome");
                        cliente.CPF = dbReader.GetString("CPF");

                        clientes.Add(cliente);
                    }
                }
            }
            return clientes;
        }

        public ClienteModel ObterPorId(int id)
        {
            var clientes = new List<ClienteModel>();

            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"Select * From TabelaDeClientes Where Id = {id}";
                    var dbReader = command.ExecuteReader();
                    try
                    {
                        while (dbReader.Read())
                        {
                            var cliente = new ClienteModel();
                            cliente.Id = dbReader.GetInt32("Id");
                            cliente.Nome = dbReader.GetString("Nome");
                            cliente.CPF = dbReader.GetString("CPF");
                            

                            clientes.Add(cliente);
                        }
                    }
                    catch (Exception erro)
                    {
                        Console.WriteLine("Erro ao listar todos!! " + erro);

                    }
                }
            }
            return clientes.FirstOrDefault();
        }

        public int Inserir(ClienteModel cliente)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    var query = $"insert into TabelaDeClientes (Nome," +
                        $" CPF)" +
                        $" values(@pNome, " +
                        $"@pCPF)";

                    command.CommandText = query;
                    AddParam(command, "pNome", cliente.Nome);
                    AddParam(command, "pCPF", cliente.CPF);


                    command.ExecuteNonQuery();
                    command.CommandText = "SELECT @@IDENTITY";

                    var idInserido = command.ExecuteScalar();
                    return Convert.ToInt32(idInserido);
                }
            }
        }
        public void Deletar(ClienteModel cliente)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"delete from TabelaDeClientes Where Id = {cliente.Id}";
                    var dbReader = command.ExecuteNonQuery();
                }
            }
        }

        public void Alterar(ClienteModel cliente)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"update TabelaDeClientes set " +
                        $"Nome = @pNome, " +
                        $"CPF = @pCPF " +
                        $" where Id = {cliente.Id} ";

                    AddParam(command, "pNome", cliente.Nome);
                    AddParam(command, "pCPF", cliente.CPF);
                    command.ExecuteNonQuery();
                }
            }
        }
        private void AddParam(SqlCommand command, string nome, object value)
        {
            var parmName = command.CreateParameter();
            parmName.ParameterName = nome;
            parmName.Value = value;
            command.Parameters.Add(parmName);
        }
    }
}