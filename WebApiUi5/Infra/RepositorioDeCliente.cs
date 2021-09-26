using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using WebApiUi5.Model;

namespace WebApiUi5.Infra
{
    public class RepositorioDeCliente : Repositorio
    {
        public List<Cliente> ObterClientes(string userName)
        {
            var clientes = new List<Cliente>();

            using (var dcCoon = Open())
            {

                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = "Select * From TabelaDeClientes Where UserName = @user";
                    AddParam(command, "user", userName);
                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {
                        var cliente = new Cliente();
                        cliente.Id = dbReader.GetInt32("Id");
                        cliente.Nome = dbReader.GetString("Nome");
                        cliente.CPF = dbReader.GetString("CPF");
                        cliente.CNH = dbReader.GetString("CNH");
                        cliente.DataDeNascimento = dbReader.GetDateTime("DataDeNascimento");
                        cliente.Categoria = dbReader.GetString("Categoria");
                        cliente.Naturalidade = dbReader.GetString("Naturalidade");
                        cliente.CEP = dbReader.GetString("CEP");
                        cliente.Rua = dbReader.GetString("Rua");
                        cliente.Numero = dbReader.GetString("Numero");
                        cliente.Bairro = dbReader.GetString("Bairro");
                        cliente.Complemento = dbReader.GetString("Complemento");
                        cliente.Cidade = dbReader.GetString("Cidade");
                        cliente.Estado = dbReader.GetString("Estado");
                        cliente.TelefoneCelular = dbReader.GetString("TelefoneCelular");
                        cliente.TelefoneFixo = dbReader.GetString("TelefoneFixo");
                        cliente.Email = dbReader.GetString("Email");

                        clientes.Add(cliente);
                    }
                }
            }
            return clientes;
        }

        public Cliente ObterPorId(int id)
        {
            var clientes = new List<Cliente>();

            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"Select * From TabelaDeClientes Where Id = @Id";
                    AddParam(command, "Id", id);
                    var dbReader = command.ExecuteReader();
                    try
                    {
                        while (dbReader.Read())
                        {
                            var cliente = new Cliente();
                            cliente.Id = dbReader.GetInt32("Id");
                            cliente.Nome = dbReader.GetString("Nome");
                            cliente.CPF = dbReader.GetString("CPF");
                            cliente.CNH = dbReader.GetString("CNH");
                            cliente.DataDeNascimento = dbReader.GetDateTime("DataDeNascimento");
                            cliente.Categoria = dbReader.GetString("Categoria");
                            cliente.Naturalidade = dbReader.GetString("Naturalidade");
                            cliente.CEP = dbReader.GetString("CEP");
                            cliente.Rua = dbReader.GetString("Rua");
                            cliente.Numero = dbReader.GetString("Numero");
                            cliente.Bairro = dbReader.GetString("Bairro");
                            cliente.Complemento = dbReader.GetString("Complemento");
                            cliente.Cidade = dbReader.GetString("Cidade");
                            cliente.Estado = dbReader.GetString("Estado");
                            cliente.TelefoneCelular = dbReader.GetString("TelefoneCelular");
                            cliente.TelefoneFixo = dbReader.GetString("TelefoneFixo");
                            cliente.Email = dbReader.GetString("Email");


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

        public int Inserir(Cliente cliente)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    var query = $"insert into TabelaDeClientes (Nome," +
                        $" CPF, " +
                        $" DataDeNascimento," +
                        $" CNH," +
                        $" Categoria," +
                        $" Naturalidade," +
                        $" CEP, " +
                        $" Logradouro," +
                        $" Numero," +
                        $" Bairro," +
                        $" Complemento," +
                        $" Cidade," +
                        $" Estado," +
                        $" TelefoneCelular," +
                        $" TelefoneFixo," +
                        $" Email, UserName)" +
                        $" values(@pNome, " +
                        $"@pCPF, " +
                        $"@pDataDeNascimento, " +
                        $"@pCNH, " +
                        $"@pCategoria, " +
                        $"@pNaturalidade, " +
                        $"@pCEP, " +
                        $"@pLogradouro, " +
                        $"@pNumero, " +
                        $"@pBairro, " +
                        $"@pComplemento, " +
                        $"@pCidade, " +
                        $"@pEstado, " +
                        $"@pTelefoneCelular, " +
                        $"@pTelefoneFixo, " +
                        $"@pEmail, @pUserName)";

                    command.CommandText = query;
                    AddParam(command, "pNome", cliente.Nome);
                    AddParam(command, "pCPF", cliente.CPF);
                    AddParam(command, "pDataDeNascimento", cliente.DataDeNascimento);
                    AddParam(command, "pCNH", cliente.CNH);
                    AddParam(command, "pCategoria", cliente.Categoria);
                    AddParam(command, "pNaturalidade", cliente.Naturalidade);
                    AddParam(command, "pCEP", cliente.CEP);
                    AddParam(command, "pLogradouro", cliente.Rua);
                    AddParam(command, "pNumero", cliente.Numero);
                    AddParam(command, "pBairro", cliente.Bairro);
                    AddParam(command, "pComplemento", cliente.Complemento);
                    AddParam(command, "pCidade", cliente.Cidade);
                    AddParam(command, "pEstado", cliente.Estado);
                    AddParam(command, "pTelefoneCelular", cliente.TelefoneCelular);
                    AddParam(command, "pTelefoneFixo", cliente.TelefoneFixo);
                    AddParam(command, "pEmail", cliente.Email);
                    AddParam(command, "pUserName", cliente.Usuario);

                    command.ExecuteNonQuery();
                    command.CommandText = "SELECT @@IDENTITY";

                    var idInserido = command.ExecuteScalar();
                    return Convert.ToInt32(idInserido);
                }
            }
        }
        public void Deletar(Cliente cliente)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"delete from TabelaDeClientes Where Id = @Id";
                    AddParam(command, "Id", cliente.Id);
                    var dbReader = command.ExecuteNonQuery();
                }
            }
        }

        public void Alterar(Cliente cliente)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"update TabelaDeClientes set " +
                        $"Nome = @pNome, " +
                        $"CPF = @pCPF, " +
                        $"DataDeNascimento = @pDataDeNascimeto, " +
                        $"CNH = @pCNH, " +
                        $"Categoria = @pCategoria, " +
                        $"Naturalidade = @pNaturalidade, " +
                        $"CEP = @pCEP, " +
                        $"Logradouro = @pLogradouro, " +
                        $"Numero = @pNumero, " +
                        $"Bairro = @pBairro, " +
                        $"Complemento = @pComplemento, " +
                        $"Cidade = @pCidade, " +
                        $"Estado = @pEstado, " +
                        $"TelefoneCelular = @pTelefoneCelular, " +
                        $"TelefoneFixo = @pTelefoneFixo, " +
                        $"Email = @pEmail" +
                        $" where id = @pId ";

                    AddParam(command, "pNome", cliente.Nome);
                    AddParam(command, "pCPF", cliente.CPF);
                    AddParam(command, "pDataDeNascimeto", cliente.DataDeNascimento);
                    AddParam(command, "pCNH", cliente.CNH);
                    AddParam(command, "pCategoria", cliente.Categoria);
                    AddParam(command, "pNaturalidade", cliente.Naturalidade);
                    AddParam(command, "pCEP", cliente.CEP);
                    AddParam(command, "pLogradouro", cliente.Rua);
                    AddParam(command, "pNumero", cliente.Numero);
                    AddParam(command, "pBairro", cliente.Bairro);
                    AddParam(command, "pComplemento", cliente.Complemento);
                    AddParam(command, "pCidade", cliente.Cidade);
                    AddParam(command, "pEstado", cliente.Estado);
                    AddParam(command, "pTelefoneCelular", cliente.TelefoneCelular);
                    AddParam(command, "pTelefoneFixo", cliente.TelefoneFixo);
                    AddParam(command, "pEmail", cliente.Email);
                    AddParam(command, "pId", cliente.Id);

                    var dbReader = command.ExecuteNonQuery();
                }
            }
        }

        public List<Cliente> ObterPorNome(string nome)
        {
            var listDeClientes = new List<Cliente>();
            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    command.CommandText = $"Select * From TabelaDeClientes Nome like @pNome";

                    AddParam(command, "pNome", nome + $"{"%"}");

                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {
                        var clienteModel = new Cliente
                        {
                            Id = dbReader.IsDBNull("Id") ? default : dbReader.GetInt32("Id"),
                            Nome = dbReader.IsDBNull("Nome") ? default : dbReader.GetString("Nome"),
                            CPF = dbReader.IsDBNull("CPF") ? default : dbReader.GetString("CPF"),
                        };
                        listDeClientes.Add(clienteModel);
                    }
                }
            }
            return listDeClientes;
        }
    }
}