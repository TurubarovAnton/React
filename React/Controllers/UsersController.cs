using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using JWT.Builder;
using JWT.Algorithms;

namespace React.Controllers
{
    public class UsersController : Controller
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string generateToken(string name)
        {
            JwtSecurityToken jwt = new JwtSecurityToken(claims: new Claim[]
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, name),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "Мамин ебарь"),
            }, signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Security:Secret"])), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


        [Route("api/login")]
        [HttpPost]
        public async Task<object> Login(string login, string password)
        {
            ClaimsPrincipal principal = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "Мамин ебарь")
            }, CookieAuthenticationDefaults.AuthenticationScheme));

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return new
            {
                id = Guid.NewGuid().ToString(),
                login = login,
                name = login
            };
        }
    }
}