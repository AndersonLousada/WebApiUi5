using System.Collections.Generic;
using System.Data;
using System.Linq;
using WebApiUi5.Model;

namespace WebApiUi5.Infra
{
    public class RepositorioDeUsuario : Repositorio
    {
        public Usuario ObterPorUserName(string UserName)
        {
            var usuarios = new List<Usuario>();

            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = $"Select * From Usuarios Where UserName = @UserName";
                    AddParam(command, "UserName", UserName);
                    var dbReader = command.ExecuteReader();
                    var usuario = new Usuario();

                    while (dbReader.Read())
                    {
                        var user = new Usuario
                        {
                            Nome = dbReader.GetString("Nome"),
                        };
                        usuarios.Add(user);
                    }
                }
            }
            return usuarios.FirstOrDefault();
        }

        public void Inserir(Usuario usuario)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    var query = $"insert into Usuarios (UserName, Senha, Nome) values(@pUserName, @pSenha, @pNome)";

                    command.CommandText = query;
                    AddParam(command, "pNome", usuario.Nome);
                    AddParam(command, "pUserName", usuario.UserName);
                    AddParam(command, "pSenha", usuario.Senha);

                    command.ExecuteNonQuery();


                }

            }
        }
    }
}
