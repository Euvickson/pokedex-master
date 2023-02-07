const ul = document.querySelector('[data-js="pokedex"]')
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const pokemonList = [];

const botaoPrimeiraGeracao = document.querySelector('[data-button="1"]');

botaoPrimeiraGeracao.addEventListener("click", () => {
    console.log("Estou aqui")
})

async function fetchPokemon () {

    for(let i = 1; i <= 1008; i++) {
        const pokemon = await (await fetch(getPokemonUrl(i))).json();

        if(i <= 151) {
            pokemonList.push(pokemon);
            const lisPokemons = generatePokemonHtml(pokemonList);        
            ul.innerHTML = lisPokemons;
        } else {
            pokemonList.push(pokemon);
        }
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

fetchPokemon();

