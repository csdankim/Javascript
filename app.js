// Create Dino Constructor
function Dino(species, weight, height, diet, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.facts = fact;
  this.image = "images/" + species.toLowerCase() + ".png";
}

// Create Dino Compare Method 1.
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (weight) {
  let fact;
  if (this.weight > weight) {
    fact = "I am heavier";
  } else if (this.weight < weight) {
    fact = "I am lighter";
  } else {
    fact = "Our weights are the same.";
  }
  this.facts.push(fact);
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (height) {
  let fact;
  if (this.height > height) {
    fact = "I am taller";
  } else if (this.height < height) {
    fact = "I am shorter";
  } else {
    fact = "Our heights are the same";
  }
  this.facts.push(fact);
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (diet) {
  let fact;
  if (this.diet == diet) {
    fact = `We are both ${diet}`;
  } else {
    fact = `I am ${this.diet}`;
  }
  this.facts.push(fact);
};

// creater Human object by inheriting Dino
function Human(name, weight, height, diet) {
  Dino.call(this, "human", weight, height, diet, [`I am a human and ${diet}`]);
  this.name = name;
}
// construct inheritance based on prototype
Human.prototype = Object.create(Dino.prototype);
Human.prototype.constructor = Human;

var dinos = [];

fetch("dino.json")
  .then((x) => x.json())
  .then(
    (json) =>
      (dinos = json.Dinos.map(
        (dino) =>
          new Dino(
            dino.species,
            parseInt(dino.weight, 10),
            parseInt(dino.height, 10),
            dino.diet,
            [dino.fact, `I lived in ${dino.where} during ${dino.when}.`]
          )
      ))
  );

// Use IIFE to get human data from form
function getHuman() {
  return (() => {
    let name = document.getElementById("name").value;
    let heightFeet = parseFloat(document.getElementById("feet").value);
    let heightInches = parseFloat(document.getElementById("inches").value);
    let height = heightFeet * 12 + heightInches;
    let weight = document.getElementById("weight").value;
    let diet = document.getElementById("diet").value.toLowerCase();

    return new Human(name, weight, height, diet);
  })();
}

/***** DOM manipulation *****/

// Generate Tiles for each Dino in Array
function generateDinoTiles(species, image, fact) {
  // Add tiles to DOM
  /*
  <div class="grid-item">
    <h3>species or name</h3>
    <img>image</img>
    <p>fact1</p>
  </div>
  */

  // <div class="grid-item">
  let gridTileDiv = document.createElement("div");
  gridTileDiv.className = "grid-item";

  // <h3>species or name</h3>
  let speciesH3 = document.createElement("h3");
  speciesH3.innerText = species;
  gridTileDiv.appendChild(speciesH3);

  // <img>image</img>
  let imageImg = document.createElement("img");
  imageImg.src = image;
  gridTileDiv.appendChild(imageImg);

  // <p>fact1</p>
  let factP = document.createElement("p");
  factP.innerText = fact;
  gridTileDiv.appendChild(factP);
  
  return gridTileDiv;
}

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", () => {
  // compare dino and human
  const human = getHuman();
  dinos.forEach((dino) => {
    dino.compareWeight(human.weight);
    dino.compareHeight(human.height);
    dino.compareDiet(human.diet);
  });

  // Remove form from screen
  document.getElementById("dino-compare").remove();

  // Generate Tiles for each Dino in Array
  for (let idx in dinos) {
    let dino = dinos[idx];

    // random fact in fracts array
    let randomIdx = Math.floor(Math.random() * 10) % dino.facts.length;
    let fact = dino.facts[randomIdx];
    
    // if bird
    if (dino.weight < 1) {
      fact = dino.facts[0];  // "All birds are living dinosaurs."
    }

    let dinoTile = generateDinoTiles(dino.species, dino.image, fact);

    // display
    document.getElementById("grid").appendChild(dinoTile);

    /* center must be a human: 3 by 3 grid so... 0 to 8.
    012
    345
    678
    Thus center idx must be after 3 if we count left-top to right-bottom */
    if (idx == 3) {
      let humanTile = generateDinoTiles(human.name, human.image, human.facts[0]);
      document.getElementById("grid").appendChild(humanTile);
    }
  }
});
