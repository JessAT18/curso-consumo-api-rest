console.log('Holi');

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=b4da4f38-1d3b-497c-b1d0-e7905889d5f';

async function reload() {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data);
    const img1 = document.getElementById('imgKitten1');
    const img2 = document.getElementById('imgKitten2');
    const img3 = document.getElementById('imgKitten3');
    
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

reload();