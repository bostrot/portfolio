var slideIndex = 0;
carousel();

function carousel() {
    var items = [];
    var bioContainer = document.getElementsByClassName("bio")[0];
    bioContainer.style = "display: grid !important;";
    document.getElementsByClassName("js-reminder")[0].style = "display: none !important;";
    var rawListItems = bioContainer.getElementsByTagName("div");
    for (var i = 1; i < rawListItems.length; i++) {
        rawListItems[i].style = "display: none;";
    }
    slideIndex++;
    if (slideIndex > rawListItems.length || slideIndex == 1) {
        slideIndex = 2
    }
    rawListItems[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 1000);
}