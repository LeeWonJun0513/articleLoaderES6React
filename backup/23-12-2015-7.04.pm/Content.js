import React from 'react';
import {loadJSON} from './loadJSON.js';

class Content extends React.Component
{         
    
    constructor(props)
    {
        super(props);
        this.state ={
            articleTitle: "Article title",
            articleBody:"Article Body"
        }
    }
    
    setArticle(article)
    {
        this.setState( {article : article } );
    }
    
     loadJSON(articleId) {

    //     console.log(event.target);
         var data_file = "./data/"+articleId+".json";
         var http_request = new XMLHttpRequest();
         try {
             // Opera 8.0+, Firefox, Chrome, Safari
             http_request = new XMLHttpRequest();
         } catch (e) {
                     // Something went wrong
                     alert("Your browser broke!");
                     return false;
                 }



         http_request.onreadystatechange = function( ) {

             if (http_request.readyState == 4) {
                 // Javascript function JSON.parse to parse JSON data
                 var jsonObj = JSON.parse(http_request.responseText);
                    //console.log(jsonObj);
                 setArticle(jsonObj);
             }
         }

         http_request.open("GET", data_file, true);
         http_request.send();
     }

    render()
    {
        return <div id="container">
            <div id="article">
            <h2 id="articleTitle">Article Title</h2>
            <p id="articleBody">Article content paragraph.</p>
            </div>
            <div id="footer">
            <p>Copyright &copy; Article Loader Inc.</p>;
            </div>;
        </div>
    }
}

module.exports={
    Content: Content,
};