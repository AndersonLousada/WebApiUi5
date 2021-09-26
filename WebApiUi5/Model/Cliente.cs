using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiUi5.Model
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CPF { get; set; }
        public DateTime DataDeNascimento { get; set; }
        public string CNH { get; set; }
        public string Categoria { get; set; }
        public string Naturalidade { get; set; }
        public string CEP { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Bairro { get; set; }
        public string Complemento { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string TelefoneCelular { get; set; }
        public string TelefoneFixo { get; set; }
        public string Email { get; set; }
        public string Usuario { get; set; }
    }
}
