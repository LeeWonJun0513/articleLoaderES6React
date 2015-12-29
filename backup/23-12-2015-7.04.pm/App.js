"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {SidebarLeft} from './SidebarLeft.js';
import {Content} from './Content.js';


class App extends React.Component
{
    render() {      
        return <div>           
                 <div id="header">
                    <h1>Article Loader</h1>
                </div>
                <SidebarLeft />
                <Content />
              </div>;
    }
}

module.exports={
	App: App,
};