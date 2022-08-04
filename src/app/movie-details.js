import { domCard, clearCart } from "./shared-code.js";
import "../styles/main.scss";

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
movieID = location.hash.substring(1);

getMovieDetails().then((item) => {
  domCard(item, "movie");
});

clearCart();

document.querySelector("#website-redirector").addEventListener("click", (e) => {
  location.assign("./movies.html");
});
