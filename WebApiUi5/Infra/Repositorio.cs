using System;
using System.Data;
using System.Data.SqlClient;

namespace WebApiUi5.Infra
{
    public class Repositorio
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

        protected void AddParam(SqlCommand command, string nome, object value)
        {
            var parmName = command.CreateParameter();
            parmName.ParameterName = nome;
            parmName.Value = value;
            command.Parameters.Add(parmName);
        }
    }
}
