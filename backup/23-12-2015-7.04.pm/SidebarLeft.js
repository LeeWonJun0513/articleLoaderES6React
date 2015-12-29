import React from 'react';
import {loadJSON} from './loadJSON.js';

class SidebarLeft extends React.Component
{   

    constructor(props)
    {      
        super(props); 
        this.i=0;
        this.state = {
            articleList : 
                {
                    articles : [     
                    {
                     articleId:"article1",
                     articleName:"Oliver Twist"
                    }  
                    ]
                }            
        }
        this.loadArticleList(this.setArticleList);
   }
   


    setArticleList = (articleList)=>
    {
        this.setState( {articleList : articleList } );
    }

    loadArticleList(callback)
    {           
             var data_file = "./data/articleList.json";
             var http_request =  new XMLHttpRequest();
             http_request.onreadystatechange = function() 
             {
                 if (http_request.readyState == 4) 
                 {
                     var jsonObj = JSON.parse(http_request.responseText);
                     callback(jsonObj);
                 }
             }
             http_request.open("GET", data_file, true);
             http_request.send();
   }

    
    render()
    {     
        return (
            <div id="sidebarLeft">
                <h2>Select Article</h2>
                <ul>{
                this.state.articleList.articles.map(
                (article)=>{
                    return <li className="menuItem" key={article.articleId} onClick={()=>{loadJSON(article.articleId)}}> {article.articleName}</li>; 
                })
                    }   
                </ul>
            </div>
        );
    }

}

module.exports={
    SidebarLeft: SidebarLeft,
};