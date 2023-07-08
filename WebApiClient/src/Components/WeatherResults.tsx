
import * as React from "react";
import { DefaultButton, Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react';
import * as CSS from "csstype";
import { WeatherModel } from "../Model/WeatherModel";
import { WeatherApi } from "../Controller/WeatherApi";
import WeatherItem from "./WeatherItem";

export interface WeatherResultsProps
{
    items: WeatherModel[];
}

export interface WeatherResultsState
{
}

export default class WeatherResults extends React.Component<WeatherResultsProps, WeatherResultsState>
{
    constructor(props: WeatherResultsProps)
    {
        super(props);

        this.state =
        {
            items: []
        }
    }

    render()
    {
        const items = this.props.items.map(
            (_item, index) =>
            (
                <WeatherItem model={_item} key={index}/>
            ));
        return (
            <div>
                <b><ul>Weather Reports</ul></b><br/>
                { items }
            </div>
        );
    }
}