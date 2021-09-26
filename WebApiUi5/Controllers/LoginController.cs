using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiUi5.Infra;
using WebApiUi5.Model;
using WebApiUi5.Services;
using Microsoft.AspNetCore.Authorization;

namespace WebApiUi5.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly RepositorioDeLogin repositorioDeLogin;
        public LoginController(RepositorioDeLogin repositorioDeLogin)
        {
            this.repositorioDeLogin = repositorioDeLogin;
        }

        [HttpPost]
        public async Task<ActionResult<dynamic>> Authenticate(Login senha)
        {
            if (string.IsNullOrWhiteSpace(senha.UserName))
            {
                throw new Exception("Preencha o campo Usuário");
            }
            if (string.IsNullOrWhiteSpace(senha.Senha))
            {
                throw new Exception("Preencha o campo Senha");
            }

            var autentiado = repositorioDeLogin.Authenticate(senha.UserName, senha.Senha);

            if (!autentiado)
            {
                return BadRequest(new { Message = "Usuario ou senha inválida" });
            }

            var token = TokenService.GenerateToken(senha);

            RepositorioDeUsuario repositorioDeUsuario = new RepositorioDeUsuario();

            var usuario = repositorioDeUsuario.ObterPorUserName(senha.UserName);

            return new { message = "Sucesso!", token = token, user = usuario };
        }
    }
}
