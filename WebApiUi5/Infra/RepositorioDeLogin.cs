using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using WebApiUi5.Model;

namespace WebApiUi5.Infra
{
    public class RepositorioDeLogin : Repositorio
    {
        public bool Authenticate(string userName, string password)
        {
            using (var dcCoon = Open())
            {
                using (var command = dcCoon.CreateCommand())
                {
                    command.CommandText = "Select Count(1) From Usuarios WHERE userName = @user and Senha = @senha";
                    AddParam(command, "user", userName);
                    AddParam(command, "senha", password);

                    var resultado = Convert.ToInt32(command.ExecuteScalar());
                    return resultado > 0;
                }
            }
        }
    }
}
