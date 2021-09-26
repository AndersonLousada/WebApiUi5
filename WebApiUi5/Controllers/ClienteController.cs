using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiUi5.Infra;
using WebApiUi5.Model;

namespace WebApiUi5.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ClienteController : BaseController
    {
        private readonly RepositorioDeCliente repositorioDeCliente;
        public ClienteController(RepositorioDeCliente repositorioDeCliente)
        {
            this.repositorioDeCliente = repositorioDeCliente;
        }

        [HttpGet]
        [Authorize]
        public List<Cliente> Get()
        {
            var listaDeClientes = repositorioDeCliente.ObterClientes(UserId());
            return listaDeClientes;
        }

        [HttpGet("{Id}")]
        [Authorize]
        public IActionResult GetPorId(int Id)
        {
            var cliente = repositorioDeCliente.ObterPorId(Id);
            return Ok(cliente);
        }

        [HttpPost]
        [Authorize]
        public IActionResult InserirCliente(Cliente cliente)
        {

            if (string.IsNullOrWhiteSpace(cliente.Nome))
            {
                throw new Exception("Preencha o campo nome");
            }
            if (string.IsNullOrWhiteSpace(cliente.CPF))
            {
                throw new Exception("Preencha o campo CPF");
            }
            if (cliente.DataDeNascimento == null)
            {
                throw new Exception("Preencha o campo Data De Nascimento");
            }
            if (string.IsNullOrWhiteSpace(cliente.CNH))
            {
                throw new Exception("Preencha o campo CNH");
            }
            if (string.IsNullOrWhiteSpace(cliente.Categoria))
            {
                throw new Exception("Preencha o campo Categoria");
            }
            if (string.IsNullOrWhiteSpace(cliente.Naturalidade))
            {
                throw new Exception("Preencha o campo Naturalidade");
            }
            if (string.IsNullOrWhiteSpace(cliente.CEP))
            {
                throw new Exception("Preencha o campo CEP");
            }
            if (string.IsNullOrWhiteSpace(cliente.Numero))
            {
                throw new Exception("Preencha o campo Numero");
            }
            if (string.IsNullOrWhiteSpace(cliente.Bairro))
            {
                throw new Exception("Preencha o campo Bairro");
            }
            if (string.IsNullOrWhiteSpace(cliente.Complemento))
            {
                throw new Exception("Preencha o campo Complemento");
            }
            if (string.IsNullOrWhiteSpace(cliente.Cidade))
            {
                throw new Exception("Preencha o campo Cidade");
            }
            if (string.IsNullOrWhiteSpace(cliente.Estado))
            {
                throw new Exception("Preencha o campo Estado");
            }
            if (string.IsNullOrWhiteSpace(cliente.TelefoneCelular))
            {
                throw new Exception("Preencha o campo Telefone celular");
            }
            if (string.IsNullOrWhiteSpace(cliente.TelefoneFixo))
            {
                throw new Exception("Preencha o campo Telefone Fixo");
            }
            if (string.IsNullOrWhiteSpace(cliente.Email))
            {
                throw new Exception("Preencha o campo Email");
            }

            cliente.CPF = cliente.CPF.Replace(".", "");
            cliente.Usuario = UserId();
            var clienteInserido = repositorioDeCliente.Inserir(cliente);
            return GetPorId(clienteInserido);
        }

        [HttpPut]
        [Authorize]
        public IActionResult AlterarCliente(Cliente cliente)
        {
            cliente.CPF = cliente.CPF.Replace(".", "");
            repositorioDeCliente.Alterar(cliente);
            return Ok(cliente);
        }

        [HttpDelete]
        [Authorize]
        public IActionResult DeletarCliente(Cliente cliente)
        {
            repositorioDeCliente.Deletar(cliente);
            return Ok(cliente);
        }

        [HttpGet("numeroDeClientes")]
        [Authorize]
        public IActionResult GetQuantidadeDeClientes()
        {
            List<Cliente> clientes = new List<Cliente>();
            clientes = repositorioDeCliente.ObterClientes(UserId());
            var cont = clientes.Count;
            return Ok(cont);
        }

        [HttpGet("pesquizar/{nome}")]
        [Authorize]
        public IActionResult OpterPorNome(string nome)
        {
            List<Cliente> clientesLista = repositorioDeCliente.ObterPorNome(nome);
            if (clientesLista.Count >= 1)
            {
                return Ok(clientesLista);
            }
            return NotFound();
        }
    }
}
