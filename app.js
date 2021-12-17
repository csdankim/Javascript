    // Create Dino Constructor, inherited from animal
function Dino(species, weight, height, diet, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.facts = fact;
    this.image = "images/" + species.toLowerCase() + ".png";
}

    // Create Dino Object

    // Create Human Object
    // inherited from dino
function Human(species, weight, height, diet, fact) {
    Dino.call(this, species, weight, height, diet, fact);
}
// construct inheritance based on prototype
Human.prototype = Object.create(Dino.prototype);
Human.prototype.constructor = Human;

    // Create Dino Compare Method 1.
    // NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function(weight) {
    let fact;
    if (this.weight > weight) {
        fact = "I am heavier than you.";
    }else if (this.weight < weight) {
        fact = "You are heavier than me.";
    }else {
        fact = "Our weights are the same.";
    }
    this.facts.push(fact);
}
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function(height) {
    let fact;
    if (this.height > height) {
        fact = "I am taller than you.";
    }else if (this.height < height) {
        fact = "You are taller than me.";
    }else {
        fact = "Our heights are the same.";
    }
    this.facts.push(fact);
};
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function(diet) {
    let fact;
    if (this.diet == diet) {
        fact = `We are both ${this.diet}.`;
    } else {
        fact = `I am ${this.diet}, but you are ${diet}.`;
    }
    this.facts.push(fact);
};

// creater Human object by inheriting Dino
function Human(name, weight, height) {
    Dino.call(this, "human", weight, height, "Omnibore", []);
    this.name = name; 
}
// construct inheritance based on prototype
Human.prototype = Object.create(Dino.prototype);
Human.prototype.constructor = Human;

// Use IIFE to get human data from form    
const getHuman = (() => {
    let name = document.getElementById("name").value;
    let heightFeet = parseFloat(document.getElementById("feet").value).toFixed(2);
    let heightInches = parseFloat(document.getElementById("inches").value).toFixed(2);
    let weight = document.getElementById("weight").value;

    return new Human(name, weight, heightFeet * 12 + heightInches);
})();
// fs.readfile() and make dinos[] and add each dino objects. 
// to do this 

var dinos = [];

fetch("dino.json")
    .then(x => x.json())
    .then(json => dinos = json.Dinos.map(dino => new Dino(dino.species, dino.weight, )))

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
