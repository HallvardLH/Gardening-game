let tooltip = document.getElementById("tooltip");

let tooltipActive = false;
function showTooltip(content) {
    createTooltipContent(content)
    tooltipActive = true;
    show("tooltip");
}

function hideTooltip() {
    tooltipActive = false;
    hide("tooltip");
}


// Thanks to https://nerdparadise.com/programming/javascriptmouseposition
let xpos;
let ypos;
function findDocumentCoords(mouseEvent) { 
    if (mouseEvent) {
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    } else { // IE
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
    }
}

document.getElementsByTagName("BODY")[0].onmousemove = findDocumentCoords;

document.onmousemove = function(e) {
    findDocumentCoords(e);
    if(tooltipActive) {
        updateTooltipPosition();
    }
}

function updateTooltipPosition() {
    // Calculate tooltip dimensions
    let tooltipWidth = tooltip.offsetWidth;
    let tooltipHeight = tooltip.offsetHeight;

    // Calculate proposed positions
    let proposedXPosition = xpos + 20;
    let proposedYPosition = ypos + 20;

    // Check if tooltip would go out of bounds and adjust if necessary
    if (proposedXPosition + tooltipWidth > window.innerWidth) {
        proposedXPosition = window.innerWidth - tooltipWidth - 20;
    }

    if (proposedYPosition + tooltipHeight > window.innerHeight) {
        proposedYPosition = window.innerHeight - tooltipHeight;
    }

    // If the mouse is too close to the top of the screen, show the tooltip below the cursor instead
    if (ypos < tooltipHeight) {
        proposedYPosition = ypos + 20;
    }

    // Apply calculated positions
    tooltip.style.left = proposedXPosition + 'px';
    tooltip.style.top = proposedYPosition + 'px';
}

let tooltips = {
    addPlant: {
        title: "Add a new pot"
    },
    test: {
        title: "Lorem ipsum dolor sit amet",
        text: "The quick fox ran across the river, but the fox could not run on water, nor could he swin. The quick fox drowned."
    }
}

function createTooltipContent(data) {
    let content = tooltips[data];
    let HTMLstring = "";
    if(content.title) {
        HTMLstring += `<div class="font-medium">${content.title}</div>`;
    }

    if(content.text) {
        HTMLstring += `<div class="font-small">${content.text}</div>`;
    }

    tooltip.innerHTML = HTMLstring;
}