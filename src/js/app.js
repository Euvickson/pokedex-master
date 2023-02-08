const ul = document.querySelector('[data-js="pokedex"]')
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const pokemonList = [];
let value = 0;
const buttons = document.querySelectorAll('[data-button]');

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const previousGenerationValue = button.dataset.gen - 1;
        const dataSetValue = parseInt(button.dataset.button);
        if(previousGenerationValue == 0) {
            const dataSetValue = parseInt(button.dataset.button);
            fetchPokemon(0, dataSetValue);
        } else {
            const previousButtonGenerationValue = document.querySelector(`[data-gen="${previousGenerationValue}"]`);
            const previousGenDataValue = parseInt(previousButtonGenerationValue.dataset.button);
            fetchPokemon(previousGenDataValue, dataSetValue);
        }
        value = dataSetValue
    })
})

async function fetchPokemon (previousGenDataValue, dataSetValue) {
    for(let i = previousGenDataValue + 1; i <= dataSetValue; i++) {        
        const pokemon = await (await fetch(getPokemonUrl(i))).json();
            pokemonList.push(pokemon);
            const lisPokemons = generatePokemonHtml(pokemonList);        
            ul.innerHTML = lisPokemons;    
    }

}

function generatePokemonHtml () {
    const lisPokemons = pokemonList.reduce((acumulator, { name, id, types }) => {
        const typesList = types.map(typeInfo => typeInfo.type.name);

        acumulator += `
        <li class="card ${typesList[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
            <h2 class="card-title">${id} ${name}</h2>
            <p class="card-subtitle">${typesList.join(' | ')}</p>
        </li>
        `
        return acumulator;
    }, '');
    return lisPokemons;
}

fetchPokemon(0, 20);

