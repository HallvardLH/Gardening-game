let sideMenuState = "closed"
function toggleSideMenu(close, content) {
    const sideMenuContainer =  document.getElementById("side-menu");
    const sideMenu =  document.getElementById("side-menu-content");
    const gameContainer = document.getElementById("game-container");
    sideMenuContainer.style.left = "-425px";
    document.getElementById("side-menu-exit").style.left = "-425px";
    document.getElementById("back-button").style.left = "50px";
    gameContainer.style.marginLeft = "0px";
    sideMenuState = "closed";
    if(!close) {
        sideMenuContainer.style.left = "0px";
        document.getElementById("side-menu-exit").style.left = "10px";
        document.getElementById("back-button").style.left = "400px";
        gameContainer.style.marginLeft = "400px";
        sideMenuState = content;
    }

    switch(content) {
        case "storage":
            sideMenu.innerHTML = infoMenuStorageHTML();
            break;
        case "plant":
            sideMenu.innerHTML = sideMenuPlantHTML();
            break;
        case "soil":
            sideMenu.innerHTML = sideMenuSoilHTML();
            break;
        case "seed":
            sideMenu.innerHTML = sideMenuSeedHTML();
            break;
        case "read":
            sideMenu.innerHTML = sideMenuReadHTML();
            break;
    }
}

let userLocation = "indoor";

let indoorPots = {
    mediumTerracotta: {
        amount: 1,
        name: "Medium terracotta pot",
        objname: "Empty pot",
        image: "pot.png"
    }
};

function infoMenuStorageHTML() {
    let HTMLstring = "<div><h1>Choose what to plant in<h1>";
    if(userLocation == "indoor") {
        for(key in indoorPots) {
            obj = indoorPots[key];
            HTMLstring += `
            <div class="item-section boxed" onclick="addPlant('${obj.objname}')">
                <img class="growing-space-image" src="./images/${obj.image}" alt=""/>
                <div>
                    <p class="font-medium">${obj.name}</p>
                    <p class="font-small">You have: ${obj.amount}</p>
                </div>
            </div>
            `
        }
    }
    HTMLstring += "</div>";

    return HTMLstring
}

function sideMenuPlantHTML() {
    let plant = indoorPlants[`plant-${currentlyInspecting}`];
    let HTMLstring = ""
    HTMLstring += `
    <h1 class="font-large side-menu-header">Stats</h1>
    <div class="header-separator" aria-hidden="true"></div>
    <!-- <h2 class="font-medium side-menu-header">Wellbeing</h2> -->
    <div class="icon-with-text-container">
        <!-- <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Happiness</p>
            <i class="material-icons">sentiment_satisfied</i>
            <p id="happiness" class="font-small">${plant.happiness}</p>
        </div>
        <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Health</p>
            <i style="color: #C64949" class="material-icons">favorite</i>
            <p id="health" class="font-small">${plant.health}</p>
        </div> -->
        <div id="inspect-rotten" class="icon-with-text icon-with-text-small boxed hidden">
            <p class="font-small">Root rot</p>
            <i style="color: #588A46" class="material-icons">coronavirus</i>
            <p id="health" class="font-small">Repot needed</p>
        </div>
    </div>
    <h2 class="font-medium side-menu-header">Water</h2>
    <div class="icon-with-text-container">
        <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Thirst</p>
            <i style="color: #1D869D" class="material-icons">local_drink</i>
            <p class="font-small"><span id="thirst">${plant.thirst}</span>/100</p>
        </div>
        <!-- <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Water in soil</p>
            <i style="color: #1D869D" class="material-icons">water_drop</i>
            <p class="font-small"><span id="water-level">${Math.round(plant.waterLevel)}</span>/100</p>
        </div> -->
        <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Stored water</p>
            <i style="color: #1D869D" class="material-icons">opacity</i>
            <p class="font-small"><span id="stored-water">${Math.round(plant.storedWater)}</span>/<span id="water-capacity">${plant.waterCapacity}</span></p>
        </div>
    </div>
    <h2 class="font-medium side-menu-header">Soil</h2>
    <div class="icon-with-text-container">
        <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Evaporation</p>
            <i style="color: white" class="material-icons">thunderstorm</i>
            <p id="evaporation" class="font-small">${soilData[plant.soil].drainage}/s</p>
        </div>
        <div class="icon-with-text icon-with-text-small boxed">
            <p class="font-small">Soil moisture</p>
            <i style="color: white" class="material-icons">water</i>
            <p id="moisture" class="font-small"></p>
        </div>
    </div>
    `

    return HTMLstring
}

function sideMenuSoilHTML() {
    let HTMLstring = `
    <h1 class="font-large side-menu-header">Choose soil</h1>
    <div style="width: 8rem" class="header-separator" aria-hidden="true"></div>
    `
    for(key in soils) {
        let soil = soils[key];
        HTMLstring += `
        <div class="item-section boxed ${soil.amount ? "" : "boxed-disabled"}" onclick="fillPot('${key}')">
            <img class="growing-space-image" src="./images/${soil.image}" alt=""/>
            <div>
                <p class="font-medium">${soil.name}</p>
                <p class="font-small">You have: ${soil.amount}</p>
            </div>
            <p style="grid-column: span 2" class="font-small">${soil.description}</p>
        </div>
        `
    }

    HTMLstring += "</div>";

    return HTMLstring
}

function sideMenuSeedHTML() {
    let HTMLstring = `
    <h1 class="font-large side-menu-header">Choose seed</h1>
    <div style="width: 8rem" class="header-separator" aria-hidden="true"></div>
    `
    for(key in seeds) {
        let seed = seeds[key];
        HTMLstring += `
        <div class="item-section boxed" onclick="sowPlant('${key}')">
            <img class="growing-space-image" src="./images/${seed.image}" alt=""/>
            <div>
                <p class="font-medium">${seed.name}</p>
                <p class="font-small">You have: ${seed.amount}</p>
            </div>
            <p style="grid-column: span 2" class="font-small">${seed.description}</p>
        </div>
        `
    }

    HTMLstring += "</div>";

    return HTMLstring
}

function sideMenuReadHTML() {
    let about = indoorPlants[`plant-${currentlyInspecting}`];
    console.log(about.determineMoisture(about.wetnessThreshold))
    let HTMLstring = `
    <h1 class="font-large side-menu-header">${about.name}</h1>
    <div style="width: 8rem" class="header-separator" aria-hidden="true"></div>
    ${about.hasPlant ? `
    <h2 class="font-medium">Preferences<h2>
    <ul>
        <li class="font-small">Prefers soil moisture to be <span class="highlight-text">${about.determineMoisture(about.wetnessThreshold)}</span> or below. If the moisture is higher than this, the plant is succeptible to rot.</li>
    </ul>`
    : ""}
    <p style="font-size: 1rem; line-height: 1.5rem">${spacesToBr(about.description)}</p>
    `

    return HTMLstring
}