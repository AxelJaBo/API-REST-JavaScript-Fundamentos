const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_c6qF7KRLYeMBs86s5nSAS2tpm3TDH7SGU4qswN5elHTrzk0KsKYFrmMdQcv7l0ph'

const API_URL = "https://api.thecatapi.com/v1/"
const API_URL_FAVOURITES_DELETE = (id) => API_URL+`favourites/${id}`;
const APIKEY = 'live_c6qF7KRLYeMBs86s5nSAS2tpm3TDH7SGU4qswN5elHTrzk0KsKYFrmMdQcv7l0ph';

const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const res = await fetch(API_URL+"images/search?limit=2", {
        method: 'GET',
        headers: {
            'X-API-KEY': APIKEY,
        }
    });
    const data = await res.json();
    console.log("Random")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status;
    } else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
}

async function loadFavouritesMichis() {
    const res = await fetch(API_URL+"favourites", {
        method: 'GET',
        headers: {
            'X-API-KEY': APIKEY,
        }
    });
    const data = await res.json();
    console.log("Favorites")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status + data.message;
    } else {
        const section = document.getElementById('favoriteMichis');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Michis favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi =>{
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');
            
            btn.onclick = () => deleteFavouriteMichi(michi.id);
            btn.appendChild(btnText);
            img.src = michi.image.url;
            img.width = 150;
            img.height = 150;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

async function saveFavouriteMichi(id){
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });
    // const res = await fetch(API_URL+"favourites", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': APIKEY,
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });
    // const data = await res.json();
    console.log('save');

    if (status !== 200){
        spanError.innerHTML="Hubo un error: "+status + data.message;
    } else {
        console.log('Michi guardado en favoritos');
        loadFavouritesMichis();
    }
}

async function deleteFavouriteMichi(id){
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': APIKEY,
        }
    });
    const data = await res.json();
    console.log('delete');
    console.log(res);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status + data.message;
    } else {
        console.log('Michi eliminado de favoritos');
        loadFavouritesMichis();
    }
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_URL+"images/upload", {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/formdata',
            'X-API-KEY': APIKEY,
        },
        body: formData,
    });
    const data = await res.json();
    console.log('subido');
    console.log(res);
    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavouriteMichi(data.id) //para agregar el michi cargado a favoritos.
    }
}

loadRandomMichis();
loadFavouritesMichis();