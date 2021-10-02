var currentIndex = 11;
var initialScreenSize;
var initialScreenSizeHeight;

/// WINDOWS
var about = document.getElementById("about");
var aboutWebsite = document.getElementById("aboutWebsite");

// Projects
var camagotchi = document.getElementById("camagotchi");
var vlocchain = document.getElementById("vlocchain");
var quotebot = document.getElementById("quotebot");
var pixelArtWatchOs = document.getElementById("pixelArtWatchOs");

// Work Experience
var intuitCoop = document.getElementById("intuitCoop");
var intuitIntern = document.getElementById("intuitIntern");
var chessHealth = document.getElementById("chessHealth");
var sandbox = document.getElementById("sandbox");

var allWindows = [about, camagotchi, vlocchain, quotebot, pixelArtWatchOs, aboutWebsite, intuitCoop, intuitIntern, chessHealth, sandbox];
var projects = [camagotchi, vlocchain, quotebot, pixelArtWatchOs];
var workExperience = [intuitCoop, intuitIntern, chessHealth, sandbox];
var c;
var isMobile = false;
if (window.innerWidth > 500) {
    filesListWidth = 216;
} else {
    filesListWidth = 0;
    isMobile = true;
}

window.onorientationchange = function () {
    if (window.innerWidth > 500) {
        filesListWidth = 216;
    } else {
        filesListWidth = 0;
    }
    checkAllWindows();
}

window.onload = function () {
    initialScreenSize = window.innerWidth;
    initialScreenSizeHeight = window.innerHeight;

    about.style.left = filesListWidth + 10 + "px";
    about.style.top = "26px";
    camagotchi.style.left = about.getBoundingClientRect().right + 42 + "px";
    camagotchi.style.top = 16 + "px";
    vlocchain.style.left = about.getBoundingClientRect().left + 50 + "px";
    vlocchain.style.top = about.getBoundingClientRect().bottom + 15 + "px";
    quotebot.style.left = vlocchain.getBoundingClientRect().right + 15 + "px";
    quotebot.style.top = about.getBoundingClientRect().bottom + 100 + "px";
    pixelArtWatchOs.style.left = vlocchain.getBoundingClientRect().right + 15 + "px";
    pixelArtWatchOs.style.top = 50 + "px";
    aboutWebsite.style.left = filesListWidth + 10 + "px";
    aboutWebsite.style.bottom = 10 + "px";
};

function closeWindow(id) {
    document.getElementById(id).style.visibility = "hidden";
}

function openWindow(id) {
    document.getElementById(id).style.visibility = "visible";
    bringToFront(id);
}

function bringToFront(id) {
    document.getElementById(id).style.zIndex = currentIndex;
    currentIndex += 1;
}

function bringElementToFront(elmnt) {
    elmnt.style.zIndex = currentIndex;
    currentIndex += 1;
}

function sortBySize(x, y) {
    if ((x.offsetWidth * x.offsetHeight) < (y.offsetWidth * y.offsetHeight)) {
        return 1;
    }
    if ((x.offsetWidth * x.offsetHeight) > (y.offsetWidth * y.offsetHeight)) {
        return -1;
    }
    return 0;
}

function showAll() {
    allWindows.sort(sortBySize);
    for (const elm of allWindows) {
        elm.style.zIndex = currentIndex;
        elm.style.visibility = "visible"
        currentIndex += 1;
    }
}

function hideAll() {
    for (const elm of allWindows) {
        elm.style.visibility = "hidden"
    }
}

function showProjects() {
    projects.sort(sortBySize);
    for (const elm of projects) {
        elm.style.zIndex = currentIndex;
        elm.style.visibility = "visible"
        currentIndex += 1;
    }
}

function showWorkExperiences() {
    workExperience.sort(sortBySize);
    for (const elm of workExperience) {
        elm.style.zIndex = currentIndex;
        elm.style.visibility = "visible"
        currentIndex += 1;
    }
}

function getBoundries(x, y, element) {
    var end = window.innerWidth;
    var height = window.innerHeight;
    return { left: filesListWidth, right: end, top: 0, bottom: height }
}

interact('.draggable')
    .draggable({
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: getBoundries,
                elementRect: { left: 0, right: 0.5, top: 0, bottom: 0.5 },
                endOnly: false
            })
        ],
        autoScroll: false,

        listeners: {
            move: dragMoveListener,
            end(event) {
                if (isMobile) {
                    document.getElementById('files-container').style.opacity = 1;
                }
            }
        }
    })
    .styleCursor(false)
    .on('tap', function (event) {
        bringElementToFront(event.currentTarget)
        event.preventDefault()
    })

function dragMoveListener(event) {
    var target = event.target
    bringElementToFront(target)
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
    if (isMobile) {
        document.getElementById('files-container').style.opacity = 0.25;
    }
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

window.dragMoveListener = dragMoveListener

function prevDefault(event) {
    event.preventDefault()
}

interact('.click-projects')
    .on('tap', function (event) {
        event.preventDefault()
    })
    .on('doubletap', function (event) {
        showProjects()
        event.preventDefault()
    })
    .on('hold', function (event) {

    })

interact('.click-work-experiences')
    .on('tap', function (event) {
        event.preventDefault()
    })
    .on('doubletap', function (event) {
        showWorkExperiences()
        event.preventDefault()
    })
    .on('hold', function (event) {

    })

interact('.window-title')
    .on('tap', function (event) {
        openWindow(event.currentTarget.dataset.windowid);
        event.preventDefault();
    })
    .on('doubletap', function (event) {
        reposition(event.currentTarget.dataset.windowid);
        event.preventDefault();
    })
    .on('hold', function (event) {

    })

function reposition(id) {
    document.getElementById(id).style.transform = "translate(0px, 0px)";
    document.getElementById(id).dataset.x = 0;
    document.getElementById(id).dataset.y = 0;
    document.getElementById(id).style.left = filesListWidth + "px";
    document.getElementById(id).style.top = 0 + "px";
    document.getElementById(id).style.right = "auto"
    document.getElementById(id).style.bottom = "auto"
}

function repositionElement(element) {
    element.style.transform = "translate(0px, 0px)";
    element.dataset.x = 0;
    element.dataset.y = 0;
    element.style.left = filesListWidth + "px";
    element.style.top = 0 + "px";
    element.style.right = "auto"
    element.style.bottom = "auto"
}

function checkAllWindows() {
    for (const elm of allWindows) {
        if ((elm.style.left > window.innerWidth) || (elm.style.bottom > window.innerHeight)) {
            repositionElement(elm);
        }
    }
}

window.onresize = checkCollision;
function checkCollision() {
    var t = document.getElementById('lastTreeViewElement').getBoundingClientRect();
    var s = document.getElementById('social-bar').getBoundingClientRect();
    if (s.top < t.bottom) {
        document.getElementById('social-bar').style.visibility = "hidden";
    } else {
        document.getElementById('social-bar').style.visibility = "visible";
    }
}

var filesOffScreen = true;

interact('#image-arrow')
    .on('tap', function (event) {
        document.getElementById('files-container').style.left = 0 + "px";
        if (filesOffScreen) {
            document.getElementById('files-container').style.left = 0 + "px";
            filesOffScreen = false;
        } else {
            document.getElementById('files-container').style.left = -116 + "px";
            filesOffScreen = true;
        }
        event.preventDefault()
    });
