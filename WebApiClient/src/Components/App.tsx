import React from 'react';
import logo from './logo.svg';
import '../App.css';
import ApiTest from "./ApiTest";
import { StatusBox } from "./StatusBox";
import { AppContext } from "../Controller/AppContext";

export default class App extends React.Component
{
    m_appContext: AppContext = new AppContext();

    render()
    {
        return (
            <div className="App">
                <ApiTest appContext={this.m_appContext} />
                <StatusBox appContext={this.m_appContext}/>
            </div>
        );
    }
}

