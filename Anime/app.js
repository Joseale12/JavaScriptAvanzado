const url = 'https://api.jikan.moe/v4/anime';

let myAnimes = [];
const container = document.querySelector("#container");
const searchInput = document.querySelector('#search-input');

const cleanView = () => {
    container.innerHTML = '';
};

const renderAnimes = (animes) => {
    cleanView();
    for (const anime of animes) {
        const poster = `
            <div>
                <img src="${anime.img}">
                <h2>${anime.name}</h2>
            </div>
        `;
        container.innerHTML += poster;
    }
};

searchInput.addEventListener('keyup', () => {
    const inputText = searchInput.value.trim();
    const myList = searchByName(inputText);
    renderAnimes(myList);
});


const searchByName = (searchingParameter) => {
    const filteredAnime = myAnimes.filter((anime) => {
        return anime.name.toLowerCase().includes(searchingParameter.toLowerCase());
    });
    return filteredAnime;
};


async function fetchAnimes() {
    try {
        const response = await fetch(url);
        const resultJson = await response.json();
        const resultAnime = resultJson.data;

        for (let i = 0; i < resultAnime.length; i++) {
            const animeList = resultAnime[i];
            const animeUrl = animeList.images["jpg"].image_url;
            const nameAnime = animeList.titles["0"].title;

            const globalAnime = {
                name: nameAnime,
                img: animeUrl,
            };
            const poster = `
            <div>
            <img src="${animeUrl}">
             <h2>${nameAnime}</h2>
            </div>
            `
            //Insercion de poster al HTML
            container.innerHTML += poster;
            //Aqui insertamos el objecto al arraya
            myAnimes.push(globalAnime);
            // normalizeAnime();
            //console.log(animeList);
        }
    } catch (error) {
        console.error(error);
    };
};

(async () => {
    await fetchAnimes();
})();