// Explanations:
// time: When this number is reached, the plant is fully grown. Growth has a growthRate% chance of increasing by 1 every second
// thirstRate: The rate at which the thirst of the plant increases. Each second, there is a thirstRate% chance of thirst increasing by 1
// waterCapacity: the amount of water the plant can store

const plantData = {
    "Empty pot": {
        time: undefined,
        thirstRate: 0,
        growthRate: 0,
        waterCapacity: 0,
        image: "No plant",
        description: "You have an empty pot.",
    },
    "Pot with soil": {
        time: undefined,
        thirstRate: 0,
        growthRate: 0,
        waterCapacity: 0,
        image: "No plant",
        description: "You have a pot filled with soil",
    },
    "Zamioculcas": {
        time: 200,
        thirstRate: 10,
        growthRate: 5, // of 100
        droughtResistance: 90,
        wetnessThreshold: 50,
        waterCapacity: 100,
        image: "No plant",
        description: `Hailing from the eastern regions of Africa, the Zamioculcas Zamiifolia, also known as the "ZZ Plant," is an impressive houseplant that flourishes in varying environments. It's an ideal companion for your green sanctuary, showcasing thick, rubbery leaves that evoke a prehistoric ambiance and add a dash of lush, glossy green to any setting.

        Your ZZ Plant doesn't ask for much - it actually thrives on neglect! While it adores water, it prefers to dry out completely between drinks. Overwatering leads to a sorrowful ZZ, causing its roots to rot and leaves to yellow. So remember, when in doubt, keep the water spout out.
        
        The ZZ Plant is quite hardy when it comes to temperature too. It's content with a range from 65°F to 75°F (18°C - 24°C), although it can tolerate slightly chillier or warmer conditions. Sudden cold snaps or extreme heat, however, will have it pouting in a corner.
        
        What makes this plant truly joyful is bright, indirect light, although it will tolerate low-light conditions like a champ. But steer clear of direct sunlight as this can scorch its attractive leaves, causing them to turn a sad brown.
        
        As for what it loves? ZZ Plant is a fan of well-draining soil and a room with moderate humidity. But beware of curious pets or children - this plant can be toxic if ingested.
        
        In the end, the ZZ Plant is a symbol of resilience and adaptability. It's a testimony to life's enduring, patient nature, teaching players to appreciate the beauty of growth, even at a slower pace.`,
    },
    "Monstera": {
        time: 100,
        thirstRate: 20,
        growthRate: 25,
        droughtResistance: 70,
        wetnessThreshold: 75,
        waterCapacity: 80,
        image: "No plant",
        description: `Native to tropical forests of southern Mexico, the Monstera, also known as the "Swiss Cheese Plant," is a favorite among indoor plant enthusiasts. Its large, glossy leaves with unique perforations provide a dramatic, tropical flair to your indoor spaces.

        The Monstera plant likes to be kept on the slightly moist side but doesn't like to sit in overly wet soil. Water your Monstera when the top inch of the soil is dry. Overwatering can cause root rot.

        These plants enjoy a warm climate away from direct sunlight. A little bit of morning or evening sun would be welcome, but they can adapt to lower light levels as well. Ideally, they prefer a spot with indirect light and high humidity, such as a bathroom.

        This plant is toxic if ingested, so keep it out of reach from pets and children.`,
    },
    "Spider Plant": {
        time: 50,
        thirstRate: 20,
        growthRate: 45,
        droughtResistance: 30,
        wetnessThreshold: 75,
        waterCapacity: 50,
        image: "No plant",
        description: `Spider Plants are named for their spider-like leaves which dangle down from the mother plant like spider's legs. Known for its speed of growth, it's a great choice if you're looking for quick results.

        Spider Plants are very adaptable and can withstand a fair amount of neglect. They like well-drained soil and prefer to dry out between watering. 

        They are great for beginners because they can tolerate a wide range of light conditions, including artificial light. However, they'll grow best with bright, indirect light.

        One of the benefits of Spider Plants is that they are non-toxic and safe for children and pets. Moreover, they are excellent plants for purifying the air.`
    },
};

const soilData = {
    "No soil": {
        drainage: 0,
        nutrients: 0,
        description: "There's no soil."
    },
    "All-purpose potting soil": {
        drainage: 0.008,
        nutrients: 6,
        description: "A balanced blend suitable for most common houseplants. This soil provides decent drainage and a moderate level of nutrients, making it an ideal choice for beginners or those who wish for an easy-care experience."
    },
    "Succulent mix": {
        drainage: 0.01,
        nutrients: 4,
        description: "A gritty, fast-draining mix specifically designed for succulents and cacti. While it doesn't retain many nutrients, its exceptional drainage prevents water-logging and promotes healthy root growth, which is crucial for succulent plants."
    },
    "Clay soil": {
        drainage: 0.004,
        nutrients: 10,
        description: "This soil type is dense and heavy, with slow drainage but high in nutrient content. Ideal for water-loving plants that need a high nutrient diet. However, it can be challenging for plants that require well-draining soil as it can lead to water-logging."
    }
}