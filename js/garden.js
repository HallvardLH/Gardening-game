let indoorPlants = {};
let soils = {};
let seeds = {};

class Soil {
    constructor(name) {
        const data = soilData[name];
        this.drainage = data.drainage;
        this.nutrients = data.nutrients;
        this.description = data.description;

        this.amount = 1;
    }
}

class Seed {
    constructor(name) {
        const data = plantData[name];
        this.description = getFirstSection(data.description);
        this.name = name;
        this.amount = 1;
    }
}

class Garden {
    constructor(name) {
        this.data = {
            "Medium terracotta pot": {
                size: 1,
            }
        }

        const gardenData = this.data[name];
        this.size = gardenData.size;

        this.name = name;
        this.occupants = 0;
    }
}

function statsOpen(id) {
    if(currentlyInspecting != "none" && currentlyInspecting == id && sideMenuState == "plant") {
        return true
    } else {
        return false
    }
}

let statuses = {
    thirst: {
        status: false,
        message: "Your plant is thirsty and needs water"
    },
    health: {
        status: false,
        message: "Your plant has low health, give it water and let it heal"
    },

}

function statusMessage() {
    let HTMLstring = "<ul>"
    for(key in statuses) {
        let state = statuses[key];
        if(state.status) {
            HTMLstring += `<li>${state.message}</li>`;
        }
    }
    HTMLstring += "</ul>";
    document.getElementById("status-messages").innerHTML = HTMLstring;
}

function addSoil(name) {
    let formatName = replaceSpaces(name);
    // If the player has unlocked this soil, simply add another to the existing object
    if(soils[formatName] != undefined) {
        soils[formatName].amount += 1;
    } else {
        let newSoil = new Soil(name);
        newSoil.name = name;
        soils[formatName] = newSoil;
    }
}

function addSeed(name) {
    // let formatName = replaceSpaces(name);
    let formatName = name;
    // If the player has unlocked this seed, simply add another to the existing object
    if(seeds[formatName] != undefined) {
        seeds[formatName].amount += 1;
    } else {
        let newSeed = new Seed(name);
        newSeed.name = name;
        seeds[formatName] = newSeed;
    }
}

let growingSpaceId = 0;
function addPlant(name) {
    let newPlant = new Plant(name);
    newPlant.id = growingSpaceId;
    growingSpaceId++;
    indoorPlants[`plant-${newPlant.id}`] = newPlant;
    toggleSideMenu(true);
    createGrowingSpaceList();
}

function createGrowingSpaceList() {
    let plants;
    if(userLocation = "indoor") {
        plants = indoorPlants;
    }
    let HTMLstring = '';
    for(let key in plants) {
        let plant = plants[key];

        HTMLstring += `
        <div class="growing-space boxed" onclick="inspectGarden(${plant.id})">
            <div class="plant-image-container">
                <img class="plant" src="images/${replaceSpacesDash(plant.image)}.png" alt="" draggable="false"/>
                <img class="pot" src="images/${replaceSpacesDash(plant.soil)}.png"/ alt="" draggable="false">
            </div>
            <div onclick="editGardenName(${plant.id})" style="display:flex">
                <p id="garden-name-${plant.id}" class="font-medium">${plant.name}</p>
                <!-- <i class="material-icons">edit</i> -->
            </div>
            <div id="progress-bar-with-timer-${plant.id}" class="progress-bar-with-timer hidden">
                <div class="progress-bar-container">
                    <div id="progress-bar-${plant.id}" class="progress-bar"></div>
                </div>
                <p id="time-left-${plant.id}" class="font-small" style="text-align: center;"></p>
            </div>
            <p class="font-small">Bottom text</p>
        </div>
        `
    }
    // ${obj.occupants}/${obj.size} spaces occupied
    document.getElementById("growing-spaces-container").innerHTML = HTMLstring;
}

let currentlyInspecting = "none";
function inspectGarden(id) {
    currentlyInspecting = id;
    switchGameMenu("plant-container");
    toggleSideMenu(false, "plant");
    let plant = indoorPlants[`plant-${id}`];
    document.getElementById("plant-image").src = `images/${replaceSpacesDash(plant.image)}.png`;
    document.getElementById("pot-image").src = `images/${replaceSpacesDash(plant.soil)}.png`;
    document.getElementById("plant-name").innerHTML = plant.name;

    if(plant.hasPlant && plant.growth != plant.time) {
        show(`progress-bar-with-timer`);

        document.getElementById(`progress-bar`).style.width = growthPercentage(plant.growth, plant.time) + "%";
        document.getElementById(`time-left`).innerHTML = `${formatMinutes(expectedGrowthTime(plant.growthRate, plant.time - plant.growth))}`;
    } else {
        hide(`progress-bar-with-timer`);
    }
}

function editGardenName(id) {
    elem = document.getElementById(`garden-name-${id}`)
    if(elem.disabled) {
        elem.disabled = false;
    }
}

let gameSpeed = 1000; // Default game speed (1 second)
let lastUpdate = Date.now();
let gamePaused = false;

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        gamePaused = true;
    } else {
        const now = Date.now();
        const dt = now - lastUpdate;

        // Calculate how many update steps have been missed
        const missedSteps = Math.floor(dt / gameSpeed);

        if (missedSteps > 0) {
            show("loading-screen");

            for(let i = 0; i < missedSteps; i++) {
                updateGame();

                document.getElementById("loading-progress-bar").style.width = ((i + 1) / missedSteps) * 100 + "%";
            }

            hide("loading-screen");
        }

        gamePaused = false;
        lastUpdate = now;
    }
});

function updateGame() {
    for(let key in indoorPlants) {
        const plant = indoorPlants[key];
        if(plant.health > 0) {
            plant.increaseThirst();
            plant.drink();
            plant.evaporate();
            plant.grow();
            plant.rot();
            plant.determineMood();
            plant.determineMoisture();
        } else {
            // plant.death();
        }

        if(currentlyInspecting == "none" && plant.hasPlant && plant.growth != plant.time) {
            show(`progress-bar-with-timer-${plant.id}`);;
            document.getElementById(`progress-bar${plant.id}`);

            document.getElementById(`progress-bar-${plant.id}`).style.width = growthPercentage(plant.growth, plant.time) + "%";
            document.getElementById(`time-left-${plant.id}`).innerHTML = `${formatMinutes(expectedGrowthTime(plant.growthRate, plant.time - plant.growth))}`;
        } else {
            hide(`progress-bar-with-timer-${plant.id}`);
        }

        statusMessage();
    }
}

function gameLoop() {
    if (!gamePaused) {
        updateGame();
        lastUpdate = Date.now();
    }
    
    // Call gameLoop again after a delay based on the current gameSpeed value
    setTimeout(gameLoop, gameSpeed);
}

// Start the loop
gameLoop();


addPlant("Empty pot");
addSoil("All-purpose potting soil")
addSoil("All-purpose potting soil")
addSoil("Clay soil");
addSeed("Zamioculcas");
addSeed("Monstera");
addSeed("Spider Plant");
createGrowingSpaceList();