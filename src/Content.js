import React from 'react';
import Immutable from 'immutable';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            article: Immutable.fromJS({
            articleId: "defaultarticleid",
            articleTitle: "Article title",
            articleBody: "Article Body",
            articleView: "saved"
            })
        }
        this.saveArticle = this.saveArticle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.cancelEditArticle = this.cancelEditArticle.bind(this);
        this.writeArticleToSessionStorage = this.writeArticleToSessionStorage.bind(this);
        this.clearSessionStorage = this.clearSessionStorage.bind(this);
   }

    setArticle = (article) => {
//        console.log("setArticle being called");
            console.log("incoming article to setArticle:",article);

        this.setState({
            article: this.state.article.set('articleId',article.articleId)
                                        .set('articleTitle',article.articleTitle)
                                        .set('articleBody', article.articleBody)
        });
//        console.log("state:",this.state);
        console.log("state:",this.state.article.toJS());
        this.writeArticleToSessionStorage(article.articleId, article);
//        console.log(this.state);
    }


    
    loadJSON(articleId) 
    {         
        console.log("loadjson calling id: ",articleId)
        self=this;
        var responseText;
        
        if(responseText=sessionStorage.getItem(articleId))
        {
            console.log("serving from SessionStorage");
           let jsonObj=JSON.parse(responseText);
            self.setArticle(jsonObj); 
       }
        else
        {
             console.log("serving from JSON file");
       //        console.log("loadJSON being called");
                var data_file = "./data/" + articleId + ".json";
                var http_request = new XMLHttpRequest();

                http_request.onreadystatechange = function () {

                    if (http_request.readyState == 4) 
                    {
                        var jsonObj = JSON.parse(http_request.responseText);
                        self.setArticle(jsonObj);
                    }
                }
                http_request.open("GET", data_file, true);
                http_request.send();
        }
    }

    componentDidUpdate(prevProps,prevState){
        console.log("The current state after update", this.state.article.toJS()) ;
    }

    writeArticleToSessionStorage(key, value)
    {
        console.log("inwrite: ",value);
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    clearSessionStorage()
    {
        for( let x in sessionStorage)
        { 
            sessionStorage.removeItem(x)
        };
        this.loadJSON(this.state.articleId);
    }

    editArticle()
    {
        this.setState({ article : this.state.article.set("articleView", "edit") });
    }
    
    saveArticle()
    {     
        //          this.setArticle(
        //            this.state.article.set("articleBody", this.refs.articleBodyEditorTextArea.value).toJS()         
        //          );          
        this.setState({article: this.state.article.set("articleView", "saved").set("articleBody", this.refs.articleBodyEditorTextArea.value) });
        this.writeArticleToSessionStorage(this.state.article.get("articleId"),  this.state.article.set("articleView", "saved").set("articleBody", this.refs.articleBodyEditorTextArea.value).toJS() );
       
    }

    cancelEditArticle()
    {
         this.setState({ article : this.state.article.set("articleView", "saved") });       
    }

    render() {
//        localStorage.removeItem("check");
//        console.log(localStorage.getItem("check"));
        return <div id = "content" >
                    < div id = "article" >
                        < h2 id = "articleTitle" >{this.state.article.get('articleTitle')}< /h2> 
                        < p id = "articleBody" >{ this.state.article.get('articleBody')} < /p> 
                        { 
                            this.state.article.get('articleView')!= "edit" ? 
                            <input type="button" value="edit" onClick={this.editArticle}/>  
                                :
                            <div>
                                <textarea 
                                    ref="articleBodyEditorTextArea" 
                                    className="articleBodyEditorTextArea" 
                                    rows="10" cols="100" >
                                    {this.state.article.get('articleBody')}   
                                </textarea>
                                <br/>
                                <input type="button" value="save" onClick={this.saveArticle}/>
                                <input type="button" value="cancel" onClick={this.cancelEditArticle}/>
                            </div>
                        }
                    < /div>
                < /div>;
    }
}

module.exports = {
    Content: Content,
};
