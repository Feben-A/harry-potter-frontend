const name = document.querySelector(".name");
const main = document.querySelector("main");
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
  fetch("https://potterhead-api.vercel.app/api/characters")
    .then((res) => res.json())
    .then((data) => {
      showCharacters(data);
    });
}

function showCharacters(data) {
  main.innerHTML = "";

  characterArray = data.map((character) => {
    const { name, image } = character;
    const characterEl = document.createElement("div");
    characterEl.classList.add("character", "front");

    characterEl.innerHTML = `<img src= "${image}" alt="${name}" onerror="handleError(this)";/>
    <div class='character-info'>
    <h3>${name}</h3></div>`;

    const characterBack = document.createElement("div");
    characterBack.classList.add("character", "back");
    main.appendChild(characterEl);
    characterBack.innerHTML = "<h1>Back of the card</h1>";

    main.appendChild(characterEl);
    main.appendChild(characterBack);

    return { name: character.name, element: characterEl };
  });
}

function handleError(imgElement) {
  imgElement.src = "src/wizard-icon.jpeg";
}
