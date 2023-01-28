let bioBtn = document.getElementById('short-desc');
let bioModel = document.getElementsByClassName('bio-text')[0];
let leftArrow = document.getElementById("left-arrow");
let rightArrow = document.getElementById("right-arrow");
let hidden = true;
bioBtn.onclick = function () {
    if (hidden) {
        bioModel.classList.remove("hidden");
        leftArrow.classList.remove("fa-arrow-right");
        leftArrow.classList.add("fa-arrow-down");
        rightArrow.classList.remove("fa-arrow-left");
        rightArrow.classList.add("fa-arrow-down");
        leftArrow.style.position = "initial";
        rightArrow.style.position = "initial";
        unfade(bioModel);
    } else {
        bioModel.classList.add("hidden");
        leftArrow.classList.remove("fa-arrow-down");
        leftArrow.classList.add("fa-arrow-right");
        rightArrow.classList.remove("fa-arrow-down");
        rightArrow.classList.add("fa-arrow-left");
        leftArrow.style.position = "relative";
        rightArrow.style.position = "relative";
        fade(bioModel);
    }
    hidden = !hidden;
};

bioModel.onclick = function (evt) {
    if (evt.target == bioModel) {
        bioModel.classList.add("hidden");
        document.body.style.opacity = 1;
    }
};

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 5);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 5);
}