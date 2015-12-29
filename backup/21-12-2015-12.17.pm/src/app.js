"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {SidebarLeft} from './sidebarLeft.js';



var ArticleLoader = React.createClass({
    render: function() {      
        return <div>           
             <div id="header">
                <h1>Article Loader</h1>
            </div>
                <SidebarLeft />
            <div id="article">
            <h2 id="articleTitle">Article Title</h2>
            <p id="articleBody">Article content paragraph.</p>
            </div>
            <div id="footer">
                <p>Copyright &copy; Article Loader Inc.</p>
            </div> 
        </div>;
    }
}); 
ReactDOM.render( < ArticleLoader / > , document.getElementById("container"));