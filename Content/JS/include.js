function includeHTML() {
  let file, request;
  document.querySelectorAll("div[include-html]").forEach(e => {
      file = e.getAttribute("include-html");
      request = new XMLHttpRequest();
      request.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200)
              e.outerHTML = this.responseText;
          }
      }
      request.open("GET", file, true);
      request.send();
  });
}