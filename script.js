const main = document.getElementById("main");
const character = document.querySelector(".character");
const searchInput = document.getElementById("search");

let characterArray = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  characterArray.forEach((character) => {
    const isVisible = character.name.toLowerCase().includes(value);
    character.element.classList.toggle("hide", !isVisible);
  });
});

getCharacters();

function getCharacters() {
  fetch("https://harrypotter-backend-api-workshop.onrender.com/characters")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showCharacters(data);
    });
}

function showCharacters(data) {
  main.innerHTML = "";

  characterArray = data.map((character) => {
    const { name, image } = character;

    const characterEl = document.createElement("div");
    characterEl.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const characterFront = document.createElement("div");
    characterFront.classList.add("front");
    characterFront.innerHTML = `
     <img src="${image}" alt="${name}" onerror="handleError(this);"/>
     <div class="character-info">
     <h3>${name}</h3>
     </div>
     `;

    const characterBack = document.createElement("div");
    characterBack.classList.add("back");
    characterBack.innerHTML = `
     <h1>Back of the card</h1>`;

    cardInner.appendChild(characterFront);
    cardInner.appendChild(characterBack);

    characterEl.appendChild(cardInner);

    main.appendChild(characterEl);
    return { name: character.name, element: characterEl };
  });
}

function handleError(imgElement) {
  imgElement.src = "images/wizard-icon.jpeg";
}
