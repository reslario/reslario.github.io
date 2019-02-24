var templateHtml;
var projects;
var category;

function loadProjects(category) {
    this.category = category;
    fetchTemplate();
    fetchProjects();
}

function buildProjects() {
    var template = document.createElement("template"); 
    template.content = templateHtml;
    for (var i = 0; i < projects.length; i++) {
        var element = template.cloneNode(true); 
        element.childNodes[1].textContent.replace("title", projects[i].title);
        element.childNodes[2].src.replace("pbg.jpg", projects[i].image);
        element.childNodes[3].textContent.replace("specs", projects[i].specs);
        element.childNodes[4].href.replace("category", category).replace("short", projects[i].short);
        document.getElementsByClassName("projects")[0].appendChild(element);
    }
}

function fetchTemplate() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            templateHtml = this.responseText;
            fetchedResource();
        }
    }
    request.open("GET", "project.html", true); 
    request.send();
}

function fetchProjects() {
    var request = new XMLHttpRequest(); 
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            projects = JSON.parse(this.responseText);
            fetchedResource();
        }
    }
    request.open("GET", category + ".json", true); 
    request.send();
}

function fetchedResource() {
    if (templateHtml != null && projects != null)
        buildProjects();
}