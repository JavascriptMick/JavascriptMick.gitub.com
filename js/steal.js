/**
 * Created by michael on 3/11/14.
 */
Reveal.initialize({
    controls: true,
    progress: false,
    history: true,
    center: true,
    overview: true,
    theme: 'simpler',
    transition: 'linear',
    loop: 'true',
    transitionSpeed: 'fast',
    rollingLinks: false,
});

Reveal.addEventListener('slidechanged', function(event) {
    slide(event);
});

Reveal.addEventListener('ready', function(event) {
    slide(event);
});

var lookup;
var icons;
var player;
var lastIcon;
var lastPageButton;

function hidePlayer() {
    if (player) {
        player.parentElement.removeChild(player);
        player = null;
    }
}

function playVideo(video) {
    hidePlayer();
    player = document.createElement("div");
    player.className = "player";
    player.innerHTML = "<iframe src=" + video + " frameborder=1 allowfullscreen></iframe>";
    player.setAttribute("onclick", "hidePlayer()");
    document.getElementById('playerLayer').appendChild(player);
}

function slide(event) {
    var x = event.indexh;
    var y = event.indexv;
    hidePlayer();
    if (lastIcon) {
        lastIcon.className = "container";
    }
    if (lastPageButton) {
        lastPageButton.className = "";
    }
    var icon = lookup[x];
    icon.className = "selected";
    lastIcon = icon;
    var pageButton = document.getElementById("page_" + x + "_" + y);
    pageButton.className = "selected";
    lastPageButton = pageButton;
    var newX = -icon.offsetLeft;
    icons.style.left = newX + "px";
}

window.addEventListener('DOMContentLoaded', function() {
    var sections = document.getElementById('mySlides').children;
    icons = document.getElementById("icons");
    lookup = [];
    if (document.body.clientHeight < 500) {
        document.getElementById("menu").style.zoom = .5;
    }
    for (var copy = 0; copy < 2; copy++) {
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if (section.tagName != "SECTION") continue;
            var div = document.createElement("div");
            div.className = "container";
            var a = document.createElement("a");
            a.className = "icon";
            a.href = "#/" + section.id;
            var img = document.createElement("img");
            img.src = "img/" + section.id + "_icon.jpg";
            a.appendChild(img);
            div.appendChild(a);
            var infoDiv = document.createElement("div");
            infoDiv.className = "info";
            div.appendChild(infoDiv);
            infoDiv.innerHTML += section.getAttribute("data-display");
            infoDiv.innerHTML += "<b>" + section.getAttribute("data-year") + "</b>";
            var pagesDiv = document.createElement("div");
            pagesDiv.className = "pages";
            infoDiv.appendChild(pagesDiv);
            var subpages = section.children;
            for (var s = 0; s < subpages.length; s++) {
                var subA = document.createElement("a");
                subA.className = "pageNumber";
                subA.id = "page_" + i + "_" + s;
                subA.href = "#/" + i + "/" + s;
                subA.innerHTML = (s + 1);
                pagesDiv.appendChild(subA);
            }
            icons.appendChild(div);
            if (!lookup[i]) lookup[i] = div;
        }
    }
    lookup[sections.length - 1].id = "lastIcon";
});