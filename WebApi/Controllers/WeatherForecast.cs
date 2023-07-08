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
                                 Summary = $"[{HttpContext.User.Claims.FirstOrDefault()?.Value}]: {Summaries[Random.Shared.Next(Summaries.Length)]}"
                             })
               .ToArray();
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
                                     $"[{HttpContext.User.Claims.FirstOrDefault()?.Value}]: {Summaries[Random.Shared.Next(Summaries.Length)]}"
                             })
               .ToArray();
        }
    }
}