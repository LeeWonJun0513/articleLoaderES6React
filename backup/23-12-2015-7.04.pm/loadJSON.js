function loadJSON(articleId) {

     var data_file = "./data/"+articleId+".json";
     var http_request = new XMLHttpRequest();
    
     http_request.onreadystatechange = function() {

         if (http_request.readyState == 4) {
             var jsonObj = JSON.parse(http_request.responseText);
             document.getElementById("articleTitle").innerHTML = jsonObj.articleTitle;
             document.getElementById("articleBody").innerHTML = jsonObj.articleBody;
         }
     }

     http_request.open("GET", data_file, true);
     http_request.send();
 }

module.exports={
    loadJSON: loadJSON,
};