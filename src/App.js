"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {SidebarLeft} from './SidebarLeft.js';
import {Content} from './Content.js';


class App extends React.Component
{
    constructor()
    {
        super();
        this.updateChildrenStates=this.updateChildrenStates.bind(this);
        this.clearSession=this.clearSession.bind(this);
    }
    
    updateChildrenStates(e)
    {
        this.refs.refContent.loadJSON(e.target.getAttribute('data-articlefilename'));
    }
    
    clearSession()
    {
        this.refs.refContent.clearSessionStorage();
    }
    
    render() {      
        return (
            <div>           
                <div id="header">
                    <h1>Article Loader</h1>
                </div>
                <SidebarLeft onclick={this.updateChildrenStates} clearsession={this.clearSession}/>
                <Content ref="refContent" />
                < div id = "footer" >
                    < p > Copyright &copy; Article Loader Inc. < /p> 
                < /div>           
            </div>
        );
    }
}

module.exports={
	App: App,
};