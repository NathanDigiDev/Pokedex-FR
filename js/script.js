const pokemonCarte = document.querySelector(".card-pokemon");
const pokemonNom = document.querySelector(".pokemon-nom");
const pokemonImage = document.querySelector(".card-image");
const pokemonImageContainer = document.querySelector(".card-image-container");
const pokemonId = document.querySelector(".pokemon-id");
const pokemonType = document.querySelector(".pokemon-type");
const pokemonStats = document.querySelector(".pokemon-stats");
const errorElement = document.querySelector(".errorElement");
const inputPokemon = document.querySelector(".input-pokemon");
const API = "https://tyradex.vercel.app/api/v1/pokemon/";

const recherchePokemon = async (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;

  // Vérification que l'entrée utilisateur n'est pas vide et a un format valide
  if (!value) {
    showError("Veuillez entrer un nom de Pokémon.");
    return;
  }

  // Vérification simple du format (par exemple, pas de caractères spéciaux)
  const validFormat = /^[a-zA-Z]+$/.test(value);
  if (!validFormat) {
    showError("Nom de Pokémon invalide. Utilisez uniquement des lettres.");
    return;
  }

  try {
    const response = await fetch(`${API}${value.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Pokemon introuvable.");
    }

    const data = await response.json();
    afficherPokemon(data);
    localStorage.setItem("pokemonData", JSON.stringify(data));
  } catch (error) {
    showError(error.message);
  }
};

const afficherPokemon = (data) => {
  const { name, sprites, pokedex_id, stats, types } = data;

  pokemonNom.textContent = name.fr;
  pokemonImage.setAttribute("src", sprites.regular);
  pokemonImage.setAttribute("alt", `Image de ${name.fr}`);
  pokemonImage.setAttribute("title", `Image de ${name.fr}`);

  pokemonImage.addEventListener("click", () => {
    pokemonImage.setAttribute("src", sprites.shiny);
  });

  pokemonId.textContent = `N°${pokedex_id}`;

  afficherTypes(types);
  afficherStats(stats);
};

const afficherTypes = (types) => {
  pokemonType.innerHTML = "";

  types.forEach((type) => {
    const typeImage = document.createElement("img");
    typeImage.setAttribute("src", type.image);
    typeImage.setAttribute("alt", `Type: ${type.name}`);
    typeImage.setAttribute("title", `Type: ${type.name}`);
    pokemonType.appendChild(typeImage);
  });
};

const afficherStats = (stats) => {
  pokemonStats.innerHTML = `
    <p>HP: ${stats.hp}</p>
    <p>Attaque: ${stats.atk}</p>
    <p>Défense: ${stats.def}</p>
    <p>Sp. Attaque: ${stats.spe_atk}</p>
    <p>Sp. Défense: ${stats.spe_def}</p>
    <p>Vitesse: ${stats.vit}</p>
  `;
};

const showError = (message) => {
  inputPokemon.classList.add("errorElement");
  errorElement.textContent = message;
  setTimeout(() => {
    errorElement.textContent = "";
    inputPokemon.classList.remove("errorElement");
  }, 2000);
};
