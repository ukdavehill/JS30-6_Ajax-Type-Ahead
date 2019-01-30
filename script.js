const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

var x = fetch(endpoint);

// Create array with each item a place object
fetch(endpoint)
    .then(blob => blob.json())
    .then(arr => {
        cities.push(...arr);
    });

// Filter array to include only ones that match word entered
function findMatches(wordToMatch, cities){
    
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

// From stack overflow
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Call findMatches and display results with the part of the word typed highlighted
function displayMatches(){
        const matchArray = findMatches(this.value, cities);
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
            const population = numberWithCommas(place.population);
            return `
                <li>
                   <span class="name"> ${cityName}, ${stateName}</span>
                   <span class="population">${population}</span>
                </li>
            `
        }).join('');
        suggestions.innerHTML = html;
    }

// Select items from DOM and add event listener
const searchItem = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchItem.addEventListener('change', displayMatches);
searchItem.addEventListener('keyup', displayMatches);

