let templateHtml, projects;

function loadProjects(category) {
    this.category = category;
    fetchTemplate();
    fetchProjects();
}

function buildProjects() {
    let parent = document.getElementsByClassName("projects")[0];
    projects.forEach(p => {
        let div = document.createElement("div");
        div.classList.add("project");
        div.innerHTML = templateHtml
                            .replace("$title", p.title)
                            .replace("$image", p.image)
                            .replace("$specs", p.specs)
                            .replace("$category", category)
                            .replace("$short", p.short);
        parent.appendChild(div);
    });
}

function fetchTemplate() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            templateHtml = this.responseText;
            fetchedResource();
        }
    }
    request.open("GET", "/shared/project.html", true); 
    request.send();
}

function fetchProjects() {
    let request = new XMLHttpRequest(); 
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            projects = JSON.parse(this.responseText);
            fetchedResource();
        }
    }
    request.open("GET", this.category + ".json", true); 
    request.send();
}

function fetchedResource() {
    if (templateHtml && projects) {
        buildProjects();
        templateHtml = null;
        projects = null;
    }
        
}