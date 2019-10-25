const addMovieModal = document.getElementById("add-movie-modal");

async function getMoviesFromApı() {
  const response = await fetch(
    "https://shrouded-badlands-02501.herokuapp.com/movies"
  );

  const movies = await response.json();

  movies.forEach(movie => {
    let markup = `
         
          <div class="card-body">
            <h5 class="card-title">${movie.name}</h5>
            <p class="card-text">${movie.description}</p>
            <button class="btn btn-danger delete-movie" data-movieid="${
              movie._id
            }">Delete</button>
            <div class="card-footer">
            ${movie.genre
              .map(
                genre =>
                  `<span class="badge badge-pill badge-primary m-1">${genre}</span>`
              )
              .join("")}
          </div>
          `;

    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "300px";
    card.innerHTML = markup;
    document.getElementById("Movies").appendChild(card);
  });
}

async function postMovieToApi(event) {
  event.preventDefault();
  const movieName = document.getElementById("movie-name").value;
  const movieDesciription = document.getElementById("movie-disciription").value;
  const movieRelased = document.getElementById("movie-relased").value;
  const movieGenres = document.getElementById("movie-genres").value;

  const genreArray = movieGenres.split(",").map(genre => genre.trim());

  const requestBody = {
    name: movieName,
    description: movieDesciription,
    relased: movieRelased,
    genre: genreArray
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  };

  const response = await fetch(
    "https://shrouded-badlands-02501.herokuapp.com/movies",
    options
  );
  const responseJson = await response.json();

  $("#add-movie-modal").modal("toggle");
  $("#Movies").html("");
  getMoviesFromApı();
}

async function deleteMovieFromAPI() {
  const movieId = $(this).data("movieid");
  await fetch(
    `https://shrouded-badlands-02501.herokuapp.com/movies/${movieId}`,
    {
      method: "DELETE"
    }
  );
  $("#Movies").html("");
  getMoviesFromApı();
}

getMoviesFromApı();
const addMovieForm = document.getElementById("add-movie-form");
addMovieForm.addEventListener("submit", postMovieToApi);

$("#Movies").on("click", ".delete-movie", deleteMovieFromAPI);
