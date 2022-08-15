const API_KEY = 'b4da4f38-1d3b-497c-b1d0-e7905889d5fa';
const API_BASE_URL = 'https://api.thecatapi.com/v1'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'x-api-key': API_KEY
    }
});

const API_RANDOM = `${API_BASE_URL}/images/search?limit=3`;
const API_FAV = `${API_BASE_URL}/favourites`;
const API_NO_FAV = (id) => `${API_BASE_URL}/favourites/${id}`;
const API_IMG = `${API_BASE_URL}/images/upload`;

const spanError = document.getElementById('error');

function showError(name, responseStatus, dataMessage = '') {
    spanError.innerHTML = `Hubo un error en ${name}: ${responseStatus} ${dataMessage}`;
}

async function loadRandomMichis() {
    const response = await fetch(API_RANDOM);
    const data = await response.json();

    if (response.status !== 200) {
        showError('random', response.status, data.message);
    } else {
        const img1 = document.getElementById('imgKitten1');
        const img2 = document.getElementById('imgKitten2');
        const img3 = document.getElementById('imgKitten3');

        const btnFav1 = document.getElementById('btnFav1');
        const btnFav2 = document.getElementById('btnFav2');
        const btnFav3 = document.getElementById('btnFav3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btnFav1.onclick = () => saveFavoriteMichi(data[0].id); //Debe ponerse en una arrow function para evitar que
        btnFav2.onclick = () => saveFavoriteMichi(data[1].id); //onclick se llame directamente
        btnFav3.onclick = () => saveFavoriteMichi(data[2].id);
    }
}

async function loadFavoriteMichis() {
    const response = await fetch(API_FAV, {
        method: 'GET',
        headers: {
            'x-api-key': API_KEY
        }
    });
    const data = await response.json();
    console.log(data);

    if (response.status !== 200) {
        showError('fav', response.status, data.message);
    } else {
        const section = document.getElementById('favoriteKittensContainer');
        section.innerHTML = '';
        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('♡');

            article.className = 'michiBox';
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id);
            img.src = michi.image.url;
            img.width = 200;
            img.height = 300;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavoriteMichi(id) {
    // const response = await fetch(API_FAV, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': API_KEY
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });

    // const data = await response.json();

    const {data, status} = await api.post( '/favourites', {
        image_id: id
    });

    if (status !== 200) {
        showError('dar fav', status, data);
    } else {
        console.log('Michi guardado');
        loadFavoriteMichis();
    }
}

async function deleteFavoriteMichi(id) {
    const response = await fetch(API_NO_FAV(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY
        },
    });

    const data = await response.json();
    if (response.status !== 200) {
        showError('dar fav', response.status, data.message);
    } else {
        console.log('Michi eliminado');
        loadFavoriteMichis();
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const response = await fetch(API_IMG, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-api-key': API_KEY
        },
        body: formData
    });
    const data = await response.json();

    if (response.status !== 201) {
        showError('subir imagen', response.status, data.message);
        console.log({data});
    } else {
        console.log('Tu michi esta en la nube OwO');
        console.log({data});
        console.log(data.url);
        saveFavoriteMichi(data.id);
    }
}

const imageUp = document.getElementById('file');
const michiUp = document.getElementById('preview-image');
imageUp.onchange = evt => {
    const [file] = imageUp.files
    if (file) {
        michiUp.src = URL.createObjectURL(file);
    }
}

loadRandomMichis();
loadFavoriteMichis();