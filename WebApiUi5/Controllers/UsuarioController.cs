using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApiUi5.Infra;
using WebApiUi5.Model;
using System;

namespace WebApiUi5.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        RepositorioDeUsuario repositorioDeUsuario = new RepositorioDeUsuario();

        [HttpGet("{UserName}")]
        [Authorize]
        public IActionResult GetPorUserName(string UserName)
        {
            var usuario = repositorioDeUsuario.ObterPorUserName(UserName);
            return Ok(usuario);
        }

        [HttpPost]
        public IActionResult InserirUsuario(Usuario usuario)
        {
            try
            {
                var user = repositorioDeUsuario.ObterPorUserName(usuario.UserName);

                if (user != null)
                {
                    throw new Exception("Nome Usuário não é permitido. Tente novamente");
                }
                if (string.IsNullOrWhiteSpace(usuario.Nome))
                {
                    throw new Exception("Preencha o campo Nome");
                }
                if (string.IsNullOrWhiteSpace(usuario.UserName))
                {
                    throw new Exception("Preencha o campo UserName");
                }
                if (string.IsNullOrWhiteSpace(usuario.Senha))
                {
                    throw new Exception("Preencha o campo Senha");
                }
                if (string.IsNullOrWhiteSpace(usuario.Senha))
                {
                    throw new Exception("Preencha o campo Confirmação de Senha");
                }

                repositorioDeUsuario.Inserir(usuario);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, stackTrace = ex.StackTrace });
            }

        }

    }
}
