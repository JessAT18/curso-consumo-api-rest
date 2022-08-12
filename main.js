console.log('Holi');

const API_URL = 'https://api.thecatapi.com/v1/images/search';

async function reload() {
    fetch(API_URL)
    .then(response => response.json()) //Convertir respuesta a json
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });    
}

fetch(API_URL)
    .then(response => response.json()) //Convertir respuesta a json
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    });