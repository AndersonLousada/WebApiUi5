using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebApiUi5.Infra;
using WebApiUi5.Model;

namespace WebApiUi5.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : Controller
    {
        RepositorioCliente repositorioCliente = new RepositorioCliente();

        [HttpGet]
        public IActionResult ObterListaDeCliente()
        {
            var clienteModel = new List<ClienteModel>();
            try
            {
                clienteModel = repositorioCliente.ObterClientes();
                return Ok(clienteModel);
            }
            catch (Exception)
            {

                throw new Exception("Erro no banco de dados!!!");
            }
        }

        [HttpGet("numeroDeClientes")]
        public IActionResult GetQuantidadeDeClientes()
        {
            List<ClienteModel> clientes = new List<ClienteModel>();
            clientes = repositorioCliente.ObterClientes();
            var cont = clientes.Count;
            return Ok(cont);
        }

        [HttpGet("{id}")]
        public IActionResult ObterClientePorId(int id)
        {
            var clienteModel = new ClienteModel();
            clienteModel = repositorioCliente.ObterPorId(id);
            return Ok(clienteModel);
        }

        [HttpPost]
        public int InserirCliente(ClienteModel clienteModel)
        {
            var id = repositorioCliente.Inserir(clienteModel);
            return id;
        }

        [HttpPut]
        public IActionResult AlterarCliente(ClienteModel clienteModel)
        {
            repositorioCliente.Alterar(clienteModel);
            return Ok(clienteModel);
        }

        public IActionResult DeletarCliente(ClienteModel clienteModel)
        {
            repositorioCliente.Deletar(clienteModel);
            return Ok(clienteModel);
        }
    }
}
