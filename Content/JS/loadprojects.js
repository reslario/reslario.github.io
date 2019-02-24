var templateHtml;
var projects;
var category;

function loadProjects(category) {
    this.category = category;
    fetchTemplate();
    fetchProjects();
}

function buildProjects() {
    var parent = document.getElementsByClassName("projects")[0];
    for (var i = 0; i < projects.length; i++) {
        var div = document.createElement("div");
        div.classList.add("project");
        var projectHtml = templateHtml
                            .replace("$title", projects[i].title)
                            .replace("$image", projects[i].image)
                            .replace("$specs", projects[i].specs)
                            .replace("$category", category)
                            .replace("$short", projects[i].short);
        div.innerHTML = projectHtml;
        parent.appendChild(div);
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
    request.open("GET", "../shared/project.html", true); 
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
    if (templateHtml != null && projects != null) {
        buildProjects();
        templateHtml = null;
        projects = null;
    }
        
}