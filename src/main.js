
const API_KEY = 'b4da4f38-1d3b-497c-b1d0-e7905889d5fa';
const API_BASE_URL = 'https://api.thecatapi.com/v1'
const API_RANDOM = `${API_BASE_URL}/images/search?limit=3&api_key=${API_KEY}`;
const API_FAV = `${API_BASE_URL}/favourites/search?limit=3&api_key=${API_KEY}`;

const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const response = await fetch(API_RANDOM);
    const data = await response.json();

    if (response.status !== 200){
        spanError.innerHTML = `Hubo un error en random: ${response.status} ${data.message}`;
    } else {
        const img1 = document.getElementById('imgKitten1');
        const img2 = document.getElementById('imgKitten2');
        const img3 = document.getElementById('imgKitten3');
        
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
    }
}

async function loadFavoriteMichis() {
    const response = await fetch(API_FAV);
    const data = await response.json();
    console.log(data);

    if (response.status !== 200){
        spanError.innerHTML = `Hubo un error en fav: ${response.status}`;
    }
}

loadRandomMichis();
loadFavoriteMichis();