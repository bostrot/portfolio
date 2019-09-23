var headDiv = document.getElementsByTagName("head")[0];
var styleDiv = document.createElement("style");
var scriptDiv0 = document.createElement("script");
scriptDiv0.setAttribute("src", "https://cdn.jsdelivr.net/npm/moment@2.22.2/min/moment.min.js");
var scriptDiv1 = document.createElement("script");
scriptDiv1.setAttribute("src", "https://cdn.jsdelivr.net/npm/marked/marked.min.js");
styleDiv.innerHTML = `
              img {
            max-width: 100%;
            max-width: 100%;
              }
              a:active,
              a:hover {
            color: #19B698;
              }
              .comment > a {
            color: #788187;
            font-size: 92%;
            text-decoration: none;
              }
              iframe {
                overflow: auto;
                max-width: 100%;
                width: 100%;
              }
              .comment_userpic {
            width: 48px;
            height: 48px;
            display: inline-block;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            border-radius: 50%;
            margin-right: 0.6rem;
            position: relative;
            float: left;
              }
              .comment {
                overflow: auto;
            width: 100%;
            float: right !important;
            position: relative;
            clear: both;
            margin-bottom: 2.4rem;
            margin-top: 2em;
              }
              .comment_header {
            margin-left: 62px;
              }
              .comment_body {
            margin-top: 0.1em;
            margin-left: 62px;
              }
              .comment_footer {
            margin-top: 0.1em;
            margin-left: 62px;
            color: #788187;
            font-size: 92%;
              }
              .comment_date {
            color: #788187;
            font-size: 92%;
              }`;
headDiv.appendChild(styleDiv);
headDiv.appendChild(scriptDiv0);
headDiv.appendChild(scriptDiv1);
var loadComments = function (data, offset, commentId) {
    var l = data.length;
    if (data.length === undefined) {
        l = 1;
    }
    for (var i = 0; i < l; i++) {
        commentData = data[i];
        // userpic
        var userpic = document.createElement('div');
        userpic.style.backgroundImage = "url(" + commentData.user.avatar_url + ")";
        userpic.className = 'comment_userpic';
        // header
        var header = document.createElement('div');
        header.className = 'comment_header';
        header.innerHTML = '<strong>' + commentData.user.login + ' · </strong><i class="comment_date">' + moment(
            commentData.created_at).fromNow() +
            '<a style="float: right;" href="#"><i class="fa fa-flag"></i></a></p>';
        userpic.className = 'comment_userpic';
        // body
        var body = document.createElement('div');
        body.className = 'comment_body';
        body.innerHTML = marked(commentData.body);
        // footer
        var footer = document.createElement('div');
        footer.className = 'comment_footer';
        //footer.innerHTML = ("<a href=\"#\" class=\"fa fa-chevron-circle-up\"></a> $" + (commentData.reactions["+1"]));
        // comment div
        var comment = document.createElement('div');
        comment.id = commentData.number;
        comment.className = 'comment';
        comment.appendChild(userpic);
        comment.appendChild(header);
        comment.appendChild(body);
        comment.appendChild(footer);
        if (offset > 90) {
            comment.style.width = '90%';
        }
        else {
            comment.style.width = (100 - offset) + '%';
        }
        if (commentId !== undefined) {
            document.getElementById(commentId).appendChild(comment)
        } else {
            document.getElementById("comments").appendChild(comment)
        }
    }
}
if (window.fetch) {
    var fetchUrl = "https://afternoon-citadel-61886.herokuapp.com/comments?q=/repos/"+github+"/"+page
    var url = fetchUrl + "/issues";
    subComments(issue)
}
function subComments(id) {
    window
        .fetch(fetchUrl + "/issues/" + id + "/comments", { Accept: "application/vnd.github.v3.html+json" })
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            if (json.length && json.message !== "Not Found") {
                console.log(json)
                loadComments(json, 0)
            } else {
            }
        })
}