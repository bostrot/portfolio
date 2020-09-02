  // Lambda sort factory function
  const sortOnKey = (key, desc) => {
      return (a, b) => {
          a = a[key];
          b = b[key];
          return desc ? b - a : a - b;
      }
  };

  const style = `
    .stargazers {
        padding-right: .5em;
    }
    .stars {
        padding-right: 1em;
    }
    #github_projects .card {
        text-align: left;
    }
    #github_projects .card a {
        color: #ffffff;
    }
  `;
  fetch("https://api.github.com/users/bostrot/repos")
      .then(response => response.json())
      .then(projects => {
          // Sort
          projects = projects.sort(sortOnKey("stargazers_count", true));
          // Inserting
          let projectsDiv = document.getElementById("github_projects");
          // Empty div
          projectsDiv.innerHTML = "";
          projectsDiv.classList = "";
          for (let i = 0; i < 4; i++) {
              let projectDiv = document.createElement("div");
              projectDiv.classList = "card";
              let project = projects[i];
              if (project != undefined) {
                  if (project.description == null)
                      project.description = "No description.";
                  projectDiv.innerHTML = `
                    <div class="media text-muted pt-3">
                        <p class="media-body pb-3 mb-0 lh-125">
                            <a href="${project.html_url}">
                                <strong class="d-block text-gray-dark">${project.name}</strong>
                            </a>
                            <a>${project.description}</a>
                        </p>
                        <div class="stars">
                            ${project.language}
                            <i class="far fa-star stargazers"></i>${project.stargazers_count}
                        </div>
                    </div>
                    `;
                  projectDiv.style = style;
                  projectsDiv.appendChild(projectDiv);
                  projectsDiv.innerHTML += "<style>" + style + "</style>"
              }
          }
      });