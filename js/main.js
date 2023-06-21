function switchGameMenu(menu) {
    switch(menu) {
        case "garden-container":
            currentlyInspecting = "none";
            createGrowingSpaceList();
            break;
        case "plant-container":
            let plant = indoorPlants[`plant-${currentlyInspecting}`];
            if(plant.soil != "No soil") {
                hide("action-fill");
            } else {
                show("action-fill");
            }
            if(plant.hasPlant || plant.soil == "No soil") {
                hide("action-seed");
            } else {
                show("action-seed");
            }
            if(!plant.attemptedSave && plant.health == 0) {
                show("action-save");
            } else {
                hide("action-save");
            }
            break
    }
    toggleSideMenu(true);
    hide("garden-container");
    hide("plant-container");
    show(menu);
}

function animateValue(id, value, duration) {
    let obj = document.getElementById(id);
    let start = parseInt(obj.innerHTML);
    let end = Math.round(value);

    if(start == end) {
        return
    }

    if(typeof start != "number") {
        start = end;
    }
    
    if(!duration) {
        duration = 100;
    }
    let range = end - start;
    let minTimer = 50; // minimum timer interval, in ms
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    let current = start;
    let step = start < end ? 1 : -1;

    let timer = setInterval(function() {
        current += step;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// switchGameMenu("plant-container")