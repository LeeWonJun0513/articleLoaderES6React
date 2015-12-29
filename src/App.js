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
    }
    
    updateChildrenStates(e)
    {
        this.refs.refContent.loadJSON(e.target.getAttribute('data-articlefilename'));
    }
    
    render() {      
        return (
            <div>           
                 <div id="header">
                    <h1>Article Loader</h1>
                </div>
                <SidebarLeft onclick={this.updateChildrenStates} />
                <Content ref="refContent" />
            </div>
        );
    }
}

module.exports={
	App: App,
};