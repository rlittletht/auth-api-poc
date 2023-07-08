using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using WebApi.Model;

namespace WebApi.Controllers
{
    public class AuthController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        [Route("Login")]
        public IActionResult Login(string Username, string Password)
        {
            Claim[] claims =
                new[]
                {
                    new Claim(ClaimTypes.Name, "John Doe"),
                    new Claim(ClaimTypes.Email, Username)
                };

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            SecurityTokenDescriptor tokenDescriptor =
                new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        Auth.Key,
                        SecurityAlgorithms.HmacSha256Signature),
                    Audience = Auth.Audience,
                    Issuer = Auth.Issuer
                };

            SecurityToken token = handler.CreateToken(tokenDescriptor);
            string jwt = handler.WriteToken(token);

            return Ok(new { Token = jwt });
        }
    }

}