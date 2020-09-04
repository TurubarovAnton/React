using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
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
            /*JwtSecurityToken jwt = new JwtSecurityToken(claims: new Claim[]
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, name),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "Мамин ебарь"),
            }, signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Security:Secret"])), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);*/

            return (new JwtBuilder())
                .AddClaim(ClaimsIdentity.DefaultNameClaimType, name)
                .AddClaim(ClaimsIdentity.DefaultRoleClaimType, "Мамин ебарь")
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret((new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Security:Secret"]))).Key)
                //.DoNotVerifySignature()
                .Encode();
        }


        [Route("api/login")]
        [HttpPost]
        public object Login(string login, string password)
        {
            Response.Cookies.Delete("access_token");
            Response.Cookies.Append("access_token", generateToken(login));

            return new
            {
                id = Guid.NewGuid().ToString(),
                login = login,
                name = login
            };
        }
    }
}
