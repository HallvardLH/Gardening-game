function replaceSpaces(str) {
    return str.replace(/ /g, '_');
}

function replaceSpacesDash(str) {
    return str.replace(/ /g, '-');
}

function spacesToBr(str) {
    return str.replace(/\n/g, '<br />');
}

function replaceUnderscores(str) {
    return str.replace(/_/g, ' ');
}

function getFirstSection(text) {
    let sections = text.split("\n");
    return sections[0];
}

function calculatePercentage(value, total) {
    return (value / total) * 100;
}

function roundTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function roundThree(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hide(id) {
    document.getElementById(id).classList.add("hidden");
}

function show(id) {
    document.getElementById(id).classList.remove("hidden");
}

function rollDice(chance) {
    let randomNum = randInt(1, 100);
    // console.log("Dice rolled with a success chance of: " + chance + ". " + "Results are: " + randomNum + " vs " + (100 - chance))
    return randomNum > (100 - chance)
}

function getPercentage(value, percentage) {
    return (value * percentage) / 100;
}

function growthPercentage(currentGrowth, fullGrowth) {
    // Ensure that fullGrowth is not zero to avoid division by zero
    if (fullGrowth === 0) {
        throw new Error("Full growth cannot be zero.");
    }
    
    let percentage = (currentGrowth / fullGrowth) * 100;
    return percentage.toFixed(2);  // Returns the percentage to two decimal places
}

function expectedGrowthTime(x, y) {
    // x is the percent chance the plant will grow each second
    // y is the growth needed for the plant to be fully grown
    return (y / (x / 100)) / 60;
}

function formatMinutes(minutes) {
    // Convert minutes to seconds
    let totalSeconds = minutes * 60;

    // Calculate the number of days
    let days = Math.floor(totalSeconds / (60 * 60 * 24));

    // Calculate the number of hours excluding the days
    let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));

    // Calculate the number of minutes excluding the hours
    let remainingMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);

    // Calculate the remaining seconds
    let remainingSeconds = Math.floor(totalSeconds % 60);

    // Initialize an empty string for the result
    let result = '';

    // Add the days to the result, if any
    if (days > 0) {
        result += `${days} day(s), `;
    }

    // Add the hours to the result, if any
    if (hours > 0 || days > 0) {
        result += `${hours} hour(s), `;
    }

    // Add the minutes to the result, if any
    if (remainingMinutes > 0 || hours > 0 || days > 0) {
        result += `${remainingMinutes} minute(s), `;
    }

    // Add the seconds to the result
    result += `${remainingSeconds} second(s)`;

    return result;
}