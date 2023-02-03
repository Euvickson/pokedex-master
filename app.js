const ul = document.querySelector('[data-js="pokedex"]')
console.log(ul)

async function fetchPokemon () {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonList = [];

    for(let i = 1; i <= 151; i++) {
        const pokemon = await (await fetch(getPokemonUrl(i))).json();
        pokemonList.push(pokemon)
    }

    const lisPokemons = pokemonList.reduce((acumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        acumulator += `
        <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"/>
            <h2 class="card-title">${pokemon.id} ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
        </li>
        `
        return acumulator
    }, '')

    ul.innerHTML = lisPokemons
    console.log(lisPokemons)
}

fetchPokemon();

