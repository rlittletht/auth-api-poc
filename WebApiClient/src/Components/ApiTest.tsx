
import React from 'react';
import { DefaultButton, Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react';
import * as CSS from "csstype";
import WeatherResults from "./WeatherResults";
import { WeatherApi } from "../Controller/WeatherApi";
import { WeatherModel } from "../Model/WeatherModel";
import Cookies from "js-cookie";
import { AuthModel } from "../Model/AuthModel";
import { IAppContext } from "../Controller/AppContext";

export interface ApiTestProps
{
    appContext: IAppContext;
}

export interface ApiTestState
{
    items: WeatherModel[];
}

export default class ApiTest extends React.Component<ApiTestProps, ApiTestState>
{
    m_api: WeatherApi = new WeatherApi("https://thetasofttestapi.azurewebsites.net");
//    m_api: WeatherApi = new WeatherApi("https://localhost:7008");

    constructor(props: ApiTestProps)
    {
        super(props);

        this.state =
        {
            items: []
        }

        this.setResults = this.setResults.bind(this);
    }

    async componentDidMount()
    {
    }

    async getOpenWeatherReport()
    {
        this.setResults(await this.m_api.GetOpenWeatherReport());
    }

    async getWeatherReport()
    {
        try
        {
            this.setResults(await this.m_api.GetWeatherReport());
        }
        catch (e)
        {
            this.props.appContext.logError(`Error caught: ${e}`, 5000);
        }
    }

    async login()
    {
        try
        {
            if (this.m_api.isAuthenticated)
            {
                this.props.appContext.logTimeout("already logged in...", 2000);
                return;
            }

            if (Cookies.get("jwt-token"))
            {
                this.m_api.setAuth(Cookies.get("jws-token")!);
                this.props.appContext.logTimeout("logged in from cookie...", 2000);
                return;
            }

            const auth: AuthModel = await this.m_api.Login();
            this.m_api.setAuth(auth.token);
            Cookies.set("jwt-token", auth.token);
        }
        catch (e)
        {
            this.props.appContext.logError(`Error caught: ${e}`, 5000);
        }
        this.props.appContext.logTimeout("Logged in...", 2000);
    }

    async loginPost()
    {
        try
        {
            if (this.m_api.isAuthenticated)
            {
                this.props.appContext.logTimeout("already logged in...", 2000);
                return;
            }

            if (Cookies.get("jwt-token"))
            {
                this.m_api.setAuth(Cookies.get("jws-token")!);
                this.props.appContext.logTimeout("logged in from cookie...", 2000);
                return;
            }

            const auth: AuthModel = await this.m_api.LoginPost();
            this.m_api.setAuth(auth.token);
            Cookies.set("jwt-token", auth.token);
        }
        catch (e)
        {
            this.props.appContext.logError(`Error caught: ${e}`, 5000);
        }
        this.props.appContext.logTimeout("Logged in...", 2000);
    }

    logout()
    {
        Cookies.remove("jwt-token");
        this.m_api.removeAuth();
    }

    async setResults(newResults: WeatherModel[])
    {
        this.setState({ items: newResults });
    }

    render()
    {
        const stackStyles: IStackStyles =
        {
            root:
            {
            }
        }

        const stackItemStyles: IStackStyles =
        {
            root:
            {
                selectors:
                {
                    ':hover':
                    {
                    }
                },
                padding: 10,
                background: "#cccccc",
                border: "solid 1pt black",
            }
        }

        const forecastItemStyles: IStackStyles =
        {
            root:
            {
                selectors:
                {
                    ':hover':
                    {
                    }
                },
                padding: 10,
                width: 720,
                textAlign: 'start'
            }
        }

        return (
            <Stack styles={stackStyles}>
                <Stack.Item>
                    <Stack horizontal styles={stackStyles}>
                        <Stack.Item styles={stackItemStyles}>
                            <DefaultButton text="Test Login" onClick={this.login.bind(this)}/>
                        </Stack.Item>
                        <Stack.Item styles={stackItemStyles}>
                            <DefaultButton text="Test Login Post" onClick={this.loginPost.bind(this)}/>
                        </Stack.Item>
                        <Stack.Item styles={stackItemStyles}>
                            <DefaultButton text="Test Logout" onClick={this.logout.bind(this)}/>
                        </Stack.Item>
                        <Stack.Item styles={stackItemStyles}>
                            <DefaultButton text="Call Open Api" onClick={this.getOpenWeatherReport.bind(this)}/>
                        </Stack.Item>
                        <Stack.Item styles={stackItemStyles}>
                            <DefaultButton text="Call Authorized Api" onClick={this.getWeatherReport.bind(this)}/>
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item styles={forecastItemStyles} grow>
                    <WeatherResults items={this.state.items}/>
                </Stack.Item>
            </Stack>
        );
    }
}