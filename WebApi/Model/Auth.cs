using Microsoft.IdentityModel.Tokens;

namespace WebApi.Model
{
    public static class Auth
    {
        public static SymmetricSecurityKey Key { get; set; }
        public static string Issuer { get; set; }
        public static string Audience { get; set; }
    }

    public class LoginParams
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
