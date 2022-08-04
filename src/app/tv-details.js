import { domCard, clearCart } from "./shared-code.js";
import "../styles/main.scss";

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

tvShowID = location.hash.substring(1);

getShowDetails().then((item) => {
  domCard(item, "show");
});

clearCart();

document.querySelector("#website-redirector").addEventListener("click", (e) => {
  location.assign("./tv-shows.html");
});
