using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Authorize]
    public class WeatherForecast : ControllerBase
    {
        private static readonly string[] Summaries = new[]
                                                     {
                                                         "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm",
                                                         "Balmy", "Hot", "Sweltering", "Scorching"
                                                     };

        [AllowAnonymous]
        [HttpGet]
        [Route("GetOpenWeatherForecast")]
        public IEnumerable<Model.WeatherForecast> GetOpen()
        {
            return Enumerable.Range(1, 5)
               .Select(
                    index => new Model.WeatherForecast
                             {
                                 Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                                 TemperatureC = Random.Shared.Next(-20, 55),
                                 Summary = $"[{GetClaimValue(ClaimTypes.Email)}]: {Summaries[Random.Shared.Next(Summaries.Length)]}"
                             })
               .ToArray();
        }

        string GetClaimValue(string claimReq)
        {
            foreach (Claim claim in HttpContext.User.Claims)
            {
                if (claim.Type == claimReq)
                    return claim.Value;
            }

            return string.Empty;
        }

        [HttpGet]
        [Route("GetWeatherForecast")]
        public IEnumerable<Model.WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5)
               .Select(
                    index => new Model.WeatherForecast
                    {
                                 Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                                 TemperatureC = Random.Shared.Next(-20, 55),
                                 Summary =
                                     $"[{GetClaimValue(ClaimTypes.Email)}]: {Summaries[Random.Shared.Next(Summaries.Length)]}"
                             })
               .ToArray();
        }
    }
}