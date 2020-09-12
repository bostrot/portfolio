  // Lambda sort factory function
  const sortOnKey = (key, desc) => {
      return (a, b) => {
          a = a[key];
          b = b[key];
          return desc ? b - a : a - b;
      }
  };

  String.prototype.replaceAt = function (index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }
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
                  project.name = project.name.replaceAll('_', ' ').replaceAll('-', ' ');
                  projectDiv.innerHTML = `
                    <div class="media pt-3">
                        <div class="media-body pb-3 mb-0 lh-125">
                            <a href="${project.html_url}" onclick="plausible('${project.name}')" target="_blank">
                                <strong class="d-block text-gray-dark">${project.name}</strong>
                            </a>
                            <div class="stars" style="float:right;">
                                ${project.language}
                                <i class="far fa-star stargazers"></i>${project.stargazers_count}
                            </div>
                        </div>
                        <p>${project.description}</p>
                    </div>
                    `;
                  projectsDiv.appendChild(projectDiv);
              }
          }
      });