let moviePageNumber = 1;
const getMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=360102dcfe47ebec07cd40463cf86c02&count=10&page=${moviePageNumber}`
    );
    const { results } = await response.json();
    return results;
  } catch (err) {
    console.log(err);
  }
};

let movieID = 0;
const getMovieDetails = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=360102dcfe47ebec07cd40463cf86c02`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

let tvShowPageNumber = 1;
const getShows = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=360102dcfe47ebec07cd40463cf86c02&page=${tvShowPageNumber}`
    );
    const { results } = await response.json();
    return results;
  } catch (err) {
    console.log(err);
  }
};

let tvShowID = 0;
const getShowDetails = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvShowID}?api_key=360102dcfe47ebec07cd40463cf86c02`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
