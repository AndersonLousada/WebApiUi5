using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiUi5.Model;

namespace WebApiUi5.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : Controller
    {
        [HttpGet]
        public ProdutoModel Get()
        {
            var produtoModel = new ProdutoModel();
            produtoModel.Nome = "Tv";
            return produtoModel;
        }
        [HttpPost]
        public IActionResult IserirProduro(ProdutoModel produtoModel)
        {
            return Ok(produtoModel);
        }

    }
}
