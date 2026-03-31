

// const url = "https://api.themoviedb.org/3/movie/popular?api_key=d554bc05fa984acfb76c0c85154a0b47";

// fetch(url)
//     .then(resposta => resposta.json())
//     .then(data => {
//         // console.log(data);

//         const container = document.getElementById("container");
//         // container.appendChild(div);

//         data.results.forEach((filme) => {
//             const div = document.createElement("div"); //teste create element

//             const titulo = document.createElement("h2");
//             titulo.innerHTML = filme.title;

//             const img = document.createElement("img");
//             // img.src = url + filme.poster_path;
//             img.src = "https://image.tmdb.org/t/p/w500" + filme.poster_path;

//             div.appendChild(titulo);
//             div.appendChild(img);
//             container.appendChild(div);

//             filme.genre_ids.forEach(id => {
//                 const genero = genres.find(g => g.id === id);
//             });
//         });

//     });



// const url = "https://api.themoviedb.org/3/movie/popular?api_key=d554bc05fa984acfb76c0c85154a0b47";
const chave = "d554bc05fa984acfb76c0c85154a0b47";

// teazendo os generos
async function generos() {
    const resposta = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${chave}&language=pt-BR`);
    const dados = await resposta.json();

    const mapa = {};
    dados.genres.forEach(g => {
        mapa[g.id] = g.name;
    });

    return mapa;
}

// buscando od filmes
async function filmes() {

    const resposta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${chave}&language=pt-BR`);
    const dados = await resposta.json();
    
    return dados.results.slice(0, 10); // só 10 filmes
}

// de para de idiomas
const idiomas = {
    en: "Inglês",
    pt: "Português",
    es: "Espanhol",
    fr: "Francês",
    ja: "Japonês",
    ko: "Coreano",
    it: "Italiano",
    de: "Alemão",
    zh: "Chinês",
    ru: "Russo" //add russo
};


// renderiza a logica
async function renderiza() {
    const generosMapeados = await generos();
    const listarFilmes = await filmes();

    listarFilmes.forEach(filme => { //tentei com find mas ñ responde bem
        const div = document.createElement("div");
        div.classList.add("filme"); //classlist > add adiciona classe ao elemento lá no css, bem legal

        // ids dos generos
        const generos = filme.genre_ids
            .map(id => generosMapeados[id])
            .join(", ");


        // traduzindo idioma
        const idioma = idiomas[filme.original_language] || filme.original_language;

        // escrevendo no html
        div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}">
        <h3>${filme.title}</h3>
        <p><strong>Nota:</strong> ${filme.vote_average}</p>
        <p><strong>Data:</strong> ${filme.release_date}</p>
        <p><strong>Gêneros:</strong> ${generos}</p>
        <p><strong>Idioma:</strong> ${idioma}</p>
        `;

        // pega o container e add divs nele
        const container = document.getElementById("catalogo");
        container.appendChild(div);
    });
}

renderiza();