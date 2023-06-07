const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_c6qF7KRLYeMBs86s5nSAS2tpm3TDH7SGU4qswN5elHTrzk0KsKYFrmMdQcv7l0ph";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_c6qF7KRLYeMBs86s5nSAS2tpm3TDH7SGU4qswN5elHTrzk0KsKYFrmMdQcv7l0ph";



const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("Random")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status;
    } else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
}

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log("Favorites")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status + data.message;
    }
}

async function saveFavouriteMichis(){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: '12'
        }),
    });
    const data = await res.json();
    console.log('save');
    console.log(res);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status + data.message;
    }
}

loadRandomMichis();
loadFavouritesMichis();