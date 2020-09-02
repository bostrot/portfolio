fetch("https://api.github.com/users/bostrot/events")
    .then(response => response.json())
    .then(events => {
        // inserting
        let updates = document.getElementById("commits");
        // empty div
        updates.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            let singleCommit = document.createElement("div");
            let commit = events[i].payload.commits[0];
            if (commit != undefined) {
                commit.sha = commit.sha.substr(0, 8);
                singleCommit.innerHTML =
                    `<div class="media text-muted pt-3">
                <p class="media-body pb-3 mb-0 small lh-125">
                    <a href="${commit.url}">
                        <strong class="d-block text-gray-dark">${commit.sha}</strong>
                    </a>
                    <a>${commit.message}</a>
                </p>
            </div>`;
                updates.appendChild(singleCommit);
            }
        }
    });