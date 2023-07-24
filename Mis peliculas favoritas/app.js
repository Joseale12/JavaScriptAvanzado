//
const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=Naruto';
const secondUrl = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=Rapido%20y%20Furioso';
//URL One piece
//'https://online-movie-database.p.rapidapi.com/auto-complete?q=One%20piece';
//URL Rapido y Furioso
//'https://online-movie-database.p.rapidapi.com/auto-complete?q=Rapido%20y%20Furioso';
//URL Transformers
//'https://online-movie-database.p.rapidapi.com/auto-complete?q=transformers';

const myMovies = [];
const container = document.querySelector("#container");
const searchInput = document.querySelector('#search-input');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '159cfc0387msh0c8371de1e14554p1e6973jsncc96814198c1',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
};

const cleanView = () => {
    container.innerHTML = '';
};


searchInput.addEventListener('keyup', () => {
    const inputText = searchInput.value.trim().toLowerCase();
    console.log(inputText);
});

async function movies() {
    try {
        const response = await fetch(url, options);
        const resultJson = await response.json();
        const resultMovies = resultJson.d;
        resultMovies.map((element) => {
            const title = element.l;
            const image = element.i.imageUrl;
            const protagonist = element.s;
            const id = element.id;
            const poster = `
        <div>
        <img src="${image}">
        <h2>${title}</h2>
        <small>${protagonist}</small>hr
        <p>Id: ${id}</p>
        </div>
        `
            container.innerHTML += poster;
            myMovies.push(title, image);
        })
        // console.log(resultMovies);
    } catch (error) {
        console.error(error);
    };
};

async function otherMovies() {
    try {
        const responseOther = await fetch(secondUrl, options);
        const jsonResult = await responseOther.json();
        const moviesResult = jsonResult.d;
        moviesResult.map((element) => {
            const titleOther = element.l;
            const imageOther = element.i.imageUrl;
            const protagonistOther = element.s;
            const id = element.id;
            const posterOther = `
        <div>
        <img src="${imageOther}">
        <h2>${titleOther}</h2>
        <small>${protagonistOther}</small>hr
        <p>Id: ${id}</p>
        </div>
        `
            container.innerHTML += posterOther;
            myMovies.push(titleOther, imageOther);
        })
        // console.log(resultMovies);
    } catch (error) {
        console.error(error);
    };
};

console.log(myMovies);

(async () => {
    await movies();
    await otherMovies();
})();
