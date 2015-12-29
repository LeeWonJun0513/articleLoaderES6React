import React from 'react';
import {loadJSON} from './loadJSON.js';

class SidebarLeft extends React.Component
{   
    i=0;

    
    constructor(props)
    {
        super(props);
        this.state={
            articleList: {
        "testarticle1": "Test Article 1",
        "testarticle2": "Test Article 2"
            }
        }

//        console.log('in constr before ldartclelist', ++this.i);
        this.loadArticleList(this.setArticleList);
//        console.log('in constr after ldartclelist', ++this.i);
//        console.log(this);
//        console.log('in constr',this.articleList);
  }
   
//    setArticleList(articleList)
//    {
//        //this.articleList=articleList;
//        //console.log(this);
//        console.log(articleList);
//    }

    setArticleList = (articleList)=>
    {
        this.setState( {articleList : articleList } );

//                 console.log('in setArticllist ', ++this.i);       
//        console.log('Context of setArticleList', this);
//        console.log('in setArticleList',articleList);
        
    }

    loadArticleList(callback)
    {           
        //console.log(this);
             var data_file = "./data/articleList.json";
             var http_request = null;
             try {
                 // Opera 8.0+, Firefox, Chrome, Safari
                 http_request = new XMLHttpRequest();
             } catch (e) {
                 // Internet Explorer Browsers
                 try {
                     http_request = new ActiveXObject("Msxml2.XMLHTTP");

                 } catch (e) {

                     try {
                         http_request = new ActiveXObject("Microsoft.XMLHTTP");
                     } catch (e) {
                         // Something went wrong
                         alert("Your browser broke!");
                         return false;
                     }

                 }
             }

             http_request.onreadystatechange = function() 
             {

                 if (http_request.readyState == 4) 
                 {
                     // Javascript function JSON.parse to parse JSON data
                     var jsonObj = JSON.parse(http_request.responseText);
                     callback(jsonObj);
                     //console.log(jsonObj);
                     //this.articleList=jsonObj.articleList;
                     //console.log(this.articleList);
                     //console.log(this);
                 }
                     //console.log(this.articleList);

             }
//                 console.log('in loadArticllist before ajax req', ++this.i);       

             http_request.open("GET", data_file, true);
             http_request.send();
             //console.log(this.articleList);
             //console.log('in loadArticllist after ajax req', ++this.i);       
  }

    
    render()
    {
//        console.log('in render ', ++this.i);       
//        console.log(this.articleList);
        return (
            <div id="sidebarLeft">
                <h2>Select Article</h2>
                <ul>
                    {
                        Object.keys(this.state.articleList).map( (articleId, index)=>
                            { 
                                return <li className="menuItem" key={articleId} id={articleId} onClick={ loadJSON }>
                                        { this.state.articleList[articleId] }
                                        </li>
                            }
                        )
                    }
                </ul>
            </div>
        );
    }

}

module.exports={
    SidebarLeft: SidebarLeft,
};