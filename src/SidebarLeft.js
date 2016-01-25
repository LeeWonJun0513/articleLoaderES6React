import React from 'react';
import Immutable from 'immutable';

class SidebarLeft extends React.Component
{   

    constructor(props)
    {      
        super(props); 
        this.i=0;
        this.state = {
            articleList : 
                 Immutable.fromJS({
                    articles :[     
                    {
                     articleId:"article1",
                     articleName:"Oliver Twist"
                    }  
                    ]
                })            
        }
//        this.loadArticleList=this.loadArticleList.bind(this);
        this.loadArticleList();
        
   }
   


    setArticleList = (articleList)=>
    {
//        console.log("arg in setArticleList:", articleList);
        this.setState( {articleList : Immutable.fromJS(articleList) } );
        console.log("state set");
    }

//    loadArticleList(callback)
    loadArticleList()
    {           
        
             var self = this;
             var data_file = "./data/articleList.json";
             var http_request =  new XMLHttpRequest();
             http_request.onreadystatechange = function() 
             {
                 if (http_request.readyState == 4) 
                 {
                     var jsonObj = JSON.parse(http_request.responseText);
//                             console.log(jsonObj);
                     self.setArticleList(jsonObj);
                 }
             }
             http_request.open("GET", data_file, true);
             http_request.send();
   }

    
    render()
    {     
        console.log("articleList from state: ",this.state.articleList.get('articles'));
        return (
            <div id="sidebarLeft">
                <h2>Select Article</h2>
                <ul>
                {
                   this.state.articleList.get('articles').map(
                    (article)=>{
                        return(
                            <li className="menuItem" 
                            data-articlefilename={article.get('articleId')} 
                            id={article.get('articleId')} 
                            key={article.get('articleId')} 
                            onClick={this.props.onclick}>
                            {article.get('articleName')}
                            </li> 
                        ) ; 
                    })
                }
                            <li className="clearSessionStorageButton"  
                            onClick={this.props.clearsession}>
                                Clear Session
                            </li>
                </ul>
            </div>
        );
    }

}

module.exports={
    SidebarLeft: SidebarLeft,
};