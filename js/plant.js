class Plant {
    constructor(name) {
        console.log(name)
        const data = plantData[name];
        this.time = data.time;
        this.image = data.image;
        this.description = data.description;
        this.thirstRate = data.thirstRate;
        this.growthRate = data.growthRate;
        this.droughtResistance = data.droughtResistance;
        this.wetnessThreshold = data.wetnessThreshold;
        this.waterCapacity = data.waterCapacity;

        this.name = name;
        this.health = 100;
        this.maturity = 0;
        this.happiness = 100;
        this.health = 100;
        this.thirst = 0;
        this.soil = "No soil";
        this.waterLevel = 0
        this.hasPlant = false;
        this.growth = 0;
        this.rotted = false;
        this.rotChance = 0;
        this.growthRateMultiplier = 1;
        this.storedWater = 0;
        this.droughtTimer = this.droughtResistance * 10;
        this.wetnessTimer = this.wetnessThreshold * 10;
        this.moodThirst = 100;
        this.attemptedSave = false;
    }

    hurt(amount) {
        if(this.health - amount > 0) {
            this.health -= amount;
        } else {
            // Kill
            this.health = 0;
            if(!this.attemptedSave) {
                show("action-save");
            }
        }

        if(statsOpen(this.id)) {
            animateValue("health", this.health);
        }
    }
    heal(amount) {
        if(this.health + amount <= 100) {
            this.health += amount;
        } else {
            this.health = 100;
        }

        if(statsOpen(this.id)) {
            animateValue("health", this.health);
        }
    }
    save() {
        console.log(this.health)
        if(rollDice(100)) {
            this.heal(50);
            this.droughtTimer = this.droughtResistance * 10;
            this.waterLevel += 10;
            console.log(this.health)
        }
        hide("action-save");
    }
    grow() {
        let remainingGrowthNeeded = this.time - this.growth;
        if(this.health >= 50 && this.thirst <= 20 && rollDice(this.growthRate) && this.growth < this.time) {
            this.growth += 1;

            if(this.growth == this.time) {
                this.image = this.name;
                hide("progress-bar-with-timer");
            } else if(calculatePercentage(this.growth, this.time) >= 75) {
                this.image = "Maturing";
            } else if(calculatePercentage(this.growth, this.time) >= 50) {
                this.image = "Budding";
            } else if(calculatePercentage(this.growth, this.time) >= 25) {
                this.image = "Sprout";
            }
        }
        if(statsOpen(this.id) && this.hasPlant) {
            show("progress-bar-with-timer");
            document.getElementById("plant-image").src = `images/${replaceSpacesDash(this.image)}.png`;

            document.getElementById("progress-bar").style.width = growthPercentage(this.growth, this.time) + "%";
            if(this.thirst > 20) {
                document.getElementById("time-left").innerHTML = "Not enough water to grow!";
            } else {
                document.getElementById("time-left").innerHTML = `Approximate time remaining until fully grown:<br />${formatMinutes(expectedGrowthTime(this.growthRate, remainingGrowthNeeded))}`;
            }

            if(this.growth = this.time) {
                hide("progress-bar-with-timer");
            }
        }
    }
    rot() {
        // If water level is higher than the wetness threshold,
        if(this.waterLevel > this.wetnessThreshold) {
            if(this.wetnessTimer == 0) {
                // roll dice with 50% of wetness threshold chance of increasing rot chance
                if(rollDice(Math.round(this.wetnessThreshold / 2)) && this.rotChance < 100) {
                    if(rollDice(Math.round(this.waterLevel - this.wetnessThreshold))) {
                        this.rotChance += 0.1;
                        this.rotChance = roundTwo(this.rotChance);
                    }
                }
            } else {
                this.wetnessTimer -= 1;
            }
        } else {
            // roll dice with 50% of wetness threshold chance of decreasing rot chance
            if(rollDice(Math.round(this.wetnessThreshold / 2)) && this.rotChance > 0) {
                this.rotChance -= 0.1;
                this.rotChance = roundTwo(this.rotChance);
                // 1% chance of plant curing itself
                if(rollDice(1)) {
                    this.rotted = false;
                    document.getElementById("inspect-rotten").classList.add("hidden");
                }
            }

            if(this.wetnessTimer < this.wetnessThreshold * 10) {
                this.wetnessTimer += 1;
            }
        }
        if(rollDice(Math.round(this.rotChance))) {
            // Chance to resist rot based on plant heatlh, minus 10 percent,
            // These 10 percent ensures there's always a chance the plant will rot,
            // even at full health
            if(rollDice(100 - (this.health - Math.floor(this.health / 10)))) {
                this.rotted = true;
                document.getElementById("inspect-rotten").classList.remove("hidden");
                console.log("Plant is rotten");
            }
        }
    }
    increaseThirst() {
        if(rollDice(this.thirstRate) && this.thirstRate != 0) {
            if(this.thirst < 100) {
                this.thirst += 1;
                if(statsOpen(this.id)) {
                    animateValue("thirst", this.thirst);
                }
            }
        }

        if(this.thirst >= 15) {
            if(this.droughtTimer > 0) {
                this.droughtTimer -= 1;
            }
        } else {
            if(this.droughtTimer < this.droughtResistance * 10) {
                this.droughtTimer += 1;
            }
        }

        if(this.waterLevel <= 5 && this.storedWater <= 5 && this.hasPlant) {
            if(statsOpen(this.id)) {
                show("waterLevel-notif");
            }
        } else {
            if(statsOpen(this.id)) {
                hide("waterLevel-notif");
            }
        }
    }
    drink() {
        let drinkChance = randInt(0, this.thirst);
        let storeChance = randInt(0, (125 - this.storedWater));
        let sipSize = randInt(1, 5);
        if(drinkChance > randInt(1, 100) || this.thirst >= 10) {
            if(this.waterLevel >= roundTwo(sipSize / 4) && this.waterLevel > 0) {
                if(this.thirst - sipSize < 100 && this.thirst - sipSize > 0) {
                    // console.log("Drank " + roundTwo(sipSize / 4))
                    this.thirst -= sipSize;
                }
                this.waterLevel -= roundTwo(sipSize / 4);
                this.heal(randInt(0, 1));
            } else if(this.storedWater >= roundTwo(sipSize / 4) && this.storedWater > 0) {
                if(this.thirst - sipSize < 100 && this.thirst - sipSize > 0) {
                    this.thirst -= sipSize;
                }
                this.storedWater -= roundTwo(sipSize / 4);
                this.heal(randInt(0, 1));
                statuses.thirst.status = false;
            }
            else {
                statuses.thirst.status = true;
                if(this.thirst >= 75) {
                    if(this.droughtTimer == 0) {
                        if(rollDice(this.droughtResistance)) {
                            this.hurt(randInt(0, 1));
                        } else {
                            console.log("Resisted drought!");
                        }
                    }
                }
            }

            if(statsOpen(this.id)) {
                animateValue("thirst", this.thirst);
                animateValue("water-level", this.waterLevel);
                animateValue("stored-water", this.storedWater);
                // animateValue("water-capacity", this.waterCapacity);
            }
        } else if(this.thirst < 25 && storeChance > randInt(1, 50)) {
            if(this.waterLevel >= roundTwo(sipSize / 4) && this.waterLevel > 0) {
                if(this.storedWater + roundTwo(sipSize / 4) < this.waterCapacity) {
                    this.storedWater += roundTwo(sipSize / 4);
                    this.waterLevel -= roundTwo(sipSize / 4);
                } else {
                    this.storedWater = this.waterCapacity;
                    this.waterLevel -= roundTwo((sipSize - ((this.storedWater + sipSize) - this.waterCapacity)) / 4)
                }
            }

            if(statsOpen(this.id)) {
                animateValue("water-level", this.waterLevel);
                animateValue("stored-water", this.storedWater);
            }
        }
    }
    water() {
        if(this.health > 0) {
            let pourSize = randInt(2, 7);
            if(this.waterLevel + pourSize <= 100) {
                this.waterLevel += pourSize;
            } else {
                this.waterLevel = 100;
            }
            
            if(statsOpen(this.id)) {
                animateValue("water-level", this.waterLevel);
            }
        }
    }
    evaporate() {
        let evaporation = soilData[this.soil].drainage;
        let oldWaterLevel = this.waterLevel;
        if(roundThree(this.waterLevel - evaporation) > 0) {
            this.waterLevel -= evaporation;
            this.waterLevel = roundThree(this.waterLevel);
        } else {
            this.waterLevel = 0;
        }
        if(statsOpen(this.id)) {
            if(Math.round(oldWaterLevel) != Math.round(this.waterLevel)) { // To avoid unnecessary UI updates
                animateValue("water-level", this.waterLevel);
            }
        }
    }
    determineMood() {
        // Thirst = 20%
        // Health = 40%
        // Rot = 40%

        // If thirst is 20 or less, happiness is unaffected
        let thirst = 100 - this.thirst;
        if(thirst > 80) {
            thirst = 100;
        }

        let rotten = 100;
        if(this.rotted) {
            rotten = 0;
        } else {
            rotten = 100;
        }
        this.happiness = Math.floor(getPercentage(thirst, 20)) + Math.floor(getPercentage(this.health, 40)) + Math.floor(getPercentage(rotten, 40));

        if(statsOpen(this.id)) {
            animateValue("happiness", this.happiness);
        }
    }
    determineMoisture(query) {
        if(statsOpen(this.id) || query != undefined) {
            let moisture;
            let waterLevel = this.waterLevel;
            if(query != undefined) { waterLevel = query };
            if(waterLevel >= 80) {
                moisture = "Soaked";
            } else if(waterLevel >= 60) {
                moisture = "Very wet";
            } else if(waterLevel >= 40) {
                moisture = "Moderately wet";
            } else if(waterLevel >= 20) {
                moisture = "Dry";
            } else if(waterLevel >= 1) {
                moisture = "Very dry";
            }
            else if(waterLevel >= 0) {
                moisture = "No moisture";
            }
            
            document.getElementById("moisture").innerHTML = moisture;
            return moisture
        }
    }
}


function replacePlant(id, name) {
    let newPlant = new Plant(name);
    newPlant.id = id;
    indoorPlants[`plant-${newPlant.id}`] = newPlant;
}

function fillPot(soil) {
    replacePlant(currentlyInspecting, "Pot with soil");
    soils[soil].amount -= 1;
    indoorPlants[`plant-${currentlyInspecting}`].soil = replaceUnderscores(soil);
    inspectGarden(currentlyInspecting);
}

function sowPlant(seed) {
    let plantSoil = indoorPlants[`plant-${currentlyInspecting}`].soil;
    replacePlant(currentlyInspecting, seed);
    indoorPlants[`plant-${currentlyInspecting}`].soil = plantSoil;
    indoorPlants[`plant-${currentlyInspecting}`].hasPlant = true;
    indoorPlants[`plant-${currentlyInspecting}`].thirst = 60;
    indoorPlants[`plant-${currentlyInspecting}`].droughtTimer = 0;
    inspectGarden(currentlyInspecting);
}

function savePlant() {
    indoorPlants[`plant-${currentlyInspecting}`].save();
}

function waterPlant() {
    indoorPlants[`plant-${currentlyInspecting}`].water();
}