
import React from 'react';
import { DefaultButton, Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react';
import * as CSS from "csstype";
import { WeatherModel } from "../Model/WeatherModel";

export interface WeatherItemProps
{
    model: WeatherModel;
}

export interface WeatherItemState
{
}

export default class WeatherItem extends React.Component<WeatherItemProps, WeatherItemState>
{
    constructor(props: WeatherItemProps)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <b>Date:</b> {this.props.model.date.toString()}<br/>
                <b>Temperature:</b> {this.props.model.temperatureF}F/{this.props.model.temperatureC}C<br/>
                <b>Summary:</b> {this.props.model.summary}<br /><br/>
            </div>
        );
    }
}