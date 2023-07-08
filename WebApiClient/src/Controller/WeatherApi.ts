import { WebApiInterop } from "./WebApiInterop";
import { WeatherModel } from "../Model/WeatherModel";
import { AuthModel } from "../Model/AuthModel";

export class WeatherApi
{
    private webApiInterop: WebApiInterop;

    constructor(sApiRoot: string)
    {
        this.webApiInterop = new WebApiInterop(sApiRoot);
    }

    async GetOpenWeatherReport(): Promise<WeatherModel[]>
    {
        const results = this.webApiInterop.Fetch<WeatherModel[]>(
            "GetOpenWeatherForecast",
            []);

        return results;
    }

    async GetWeatherReport(): Promise<WeatherModel[]>
    {
        const results = this.webApiInterop.Fetch<WeatherModel[]>(
            "GetWeatherForecast",
            []);

        return results;
    }

    async Login(): Promise<AuthModel>
    {
        const results = this.webApiInterop.Fetch<AuthModel>(
            "Login",
            [
                { 'Username': 'john@doe.com' },
                { 'Password': 'Foo' }
            ]);

        return results;
    }

    removeAuth()
    {
        this.webApiInterop.removeAuth();
    }

    setAuth(token: string)
    {
        this.webApiInterop.setAuth(token);
    }

    get isAuthenticated(): boolean { return this.webApiInterop.isAuthenticated }
}