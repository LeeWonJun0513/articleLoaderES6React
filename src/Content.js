import React from 'react';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articleTitle: "Article title",
            articleBody: "Article Body"
        }
    }

    setArticle = (article) => {
//        console.log("setArticle being called");
        this.setState({
            articleTitle: article.articleTitle,
            articleBody: article.articleBody
        });
//        console.log(this.state);
    }

    loadJSON(articleId) {
        self=this;
//        console.log("loadJSON being called");
        var data_file = "./data/" + articleId + ".json";
        var http_request = new XMLHttpRequest();

        http_request.onreadystatechange = function () {

            if (http_request.readyState == 4) {
                // Javascript function JSON.parse to parse JSON data
                var jsonObj = JSON.parse(http_request.responseText);
                //console.log(jsonObj);
                self.setArticle(jsonObj);
            }
        }
        http_request.open("GET", data_file, true);
        http_request.send();
    }

    render() {
        return <div id = "container" >
                    < div id = "article" >
                        < h2 id = "articleTitle" >{this.state.articleTitle}< /h2> 
                        < p id = "articleBody" >{ this.state.articleBody} < /p> 
                    < /div> 
                    < div id = "footer" >
                        < p > Copyright &copy; Article Loader Inc. < /p> 
                    < /div> 
                < /div>;
    }
}

module.exports = {
    Content: Content,
};
