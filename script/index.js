const KEY = "d8124942-c7bf-427e-89e2-c42a9ec29dee";
const API = "https://kinopoiskapiunofficial.tech/";
const ALL_FILMS = API + "api/v2.2/films/";
const FILTER_BY_NAME = API + "api/v2.1/films/search-by-keyword?keyword=";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const DETAIL_FILM = API + "api/v2.2/films/";

const form = document.querySelector("form");
const input = document.getElementById("inp");
const output = document.getElementById("output");
const btn = document.getElementById("btn");

const getFilms = async () => {
  const request = await fetch(ALL_FILMS, {
    method: "GET",
    headers: {
      "X-API-KEY": KEY,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  renderFilms(response.items);
  // console.log(response.items);
};

const getByName = async () => {
  const request = await fetch(FILTER_BY_NAME + input.value, {
    method: "GET",
    headers: {
      "X-API-KEY": KEY,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  renderFilms(response.films);
  // console.log(response.films);
};

const getById = async (id) => {
  const request = await fetch(DETAIL_FILM + id, {
    method: "GET",
    headers: {
      "X-API-KEY": KEY,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  renderDetail(response);
};

const getPopular = async (pop) => {
  const request = await fetch(API_URL_POPULAR, {
    method: "GET",
    headers: {
      "X-API-KEY": KEY,
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  renderFilms(response.films);
};

btn.addEventListener("click", () => {
  getPopular();
});

const renderDetail = (film) => {
  output.innerHTML = "";
  // console.log(film);
  const card = document.createElement("div");
  const poster = document.createElement("img");
  const title = document.createElement("h2");
  const desc = document.createElement("p");
  poster.style.width = "400px";
  poster.src = film.posterUrl;
  title.textContent = film.nameOriginal || film.nameRu;
  desc.textContent = film.description;
  card.append(poster, title, desc);
  output.append(card);
};

const renderFilms = (movis) => {
  output.innerHTML = "";
  movis.map((el) => {
    // console.log(el);
    const card = document.createElement("div");
    const poster = document.createElement("img");
    const title = document.createElement("h2");
    poster.src = el.posterUrl;
    poster.style.width = "80%";
    poster.style.height = "400px";
    poster.style.margin = "0 30px";
    title.textContent = el.nameOriginal || el.nameRu;
    title.style.width = "150px";
    // title.style.margin = "0 60px";

    card.addEventListener("click", () => {
      getById(el.kinopoiskId || el.filmId);
    });

    output.append(card);
    card.append(poster, title);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getByName();
});
getFilms();
