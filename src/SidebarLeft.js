import React from 'react';

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
//        this.loadArticleList=this.loadArticleList.bind(this);
        this.loadArticleList();
        
   }
   


    setArticleList = (articleList)=>
    {
        this.setState( {articleList : articleList } );
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
                     self.setArticleList(jsonObj);
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
                <ul>
                {
                    this.state.articleList.articles.map(
                    (article)=>{
                        return(
                            <li className="menuItem" 
                            data-articlefilename={article.articleId} 
                            id={article.articleId} 
                            key={article.articleId} 
                            onClick={this.props.onclick}>
                            {article.articleName}
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