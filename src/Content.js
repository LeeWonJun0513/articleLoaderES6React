import React from 'react';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articleId: "defaultarticleid",
            articleTitle: "Article title",
            articleBody: "Article Body",
            articleView: "saved"
        }
        this.saveArticle = this.saveArticle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.cancelEditArticle = this.cancelEditArticle.bind(this);
        this.writeArticleToSessionStorage = this.writeArticleToSessionStorage.bind(this);
        this.clearSessionStorage = this.clearSessionStorage.bind(this);
   }

    setArticle = (article) => {
//        console.log("setArticle being called");
        this.setState({
            articleId: article.articleId,
            articleTitle: article.articleTitle,
            articleBody: article.articleBody
        });
        console.log("state:",this.state);
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
        this.setState({ articleView: "edit" });
    }
    
    saveArticle()
    {     
          let tempState=this.state;
          tempState.articleView="saved";
          tempState.articleBody=this.refs.articleBodyEditorTextArea.value;
          this.setArticle(tempState);
    }

    cancelEditArticle()
    {
         this.setState({ articleView: "saved" });       
    }

    render() {
//        localStorage.removeItem("check");
//        console.log(localStorage.getItem("check"));
        return <div id = "content" >
                    < div id = "article" >
                        < h2 id = "articleTitle" >{this.state.articleTitle}< /h2> 
                        < p id = "articleBody" >{ this.state.articleBody} < /p> 
                        { 
                            this.state.articleView != "edit" ? 
                            <input type="button" value="edit" onClick={this.editArticle}/>  
                                :
                            <div>
                                <textarea 
                                    ref="articleBodyEditorTextArea" 
                                    className="articleBodyEditorTextArea" 
                                    rows="10" cols="100" >
                                    {this.state.articleBody}   
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
