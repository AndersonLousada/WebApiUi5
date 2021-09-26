using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApiUi5.Controllers
{
    public class BaseController : ControllerBase
    {
        protected string UserId()
        {
            var claimsIdentity = this.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            return userId;
        }
    }
}
