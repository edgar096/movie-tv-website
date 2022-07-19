//Bootstrap Code
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


//Website Filters
const filters = {
  searchText: "",
  //ratingRange: 0,
};

//Movie Rendering Function
const renderItems = (items, filters) => {
  const filteredItems = items.filter((item) => {
    return (
      item.title.toLowerCase().includes(filters.searchText.toLowerCase()) /*&& //Search Filter
      movie.vote_average >= filters.ratingRange //Rating Filter*/
    );
  });

  document.getElementById("movie-div").innerHTML = "";

  filteredItems.forEach((item) => {
    //Run the DOM Generating Function for each item in the API response
    renderItemDOM(item);
  });
};

//Movie API Request
const movieRequest = () => {
  getMovies().then((items) => {
    renderItems(items, filters);
  });
};
movieRequest();

cartCheckoutDOM(rentingCart);

//Generate Movie DOM Elements

const renderItemDOM = (item) => {
  const renderingDiv = document.getElementById("movie-div");

  const elementDiv = document.createElement("div");
  elementDiv.classList.add("col", "d-flex", "align-items-stretch", "mt-3");
  renderingDiv.appendChild(elementDiv);

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.setAttribute("style", "width: 18rem");
  elementDiv.appendChild(cardDiv);

  //Card Elements
  const posterEl = document.createElement("IMG");
  posterEl.setAttribute("id", "movie-poster");
  posterEl.classList.add("card-img-top");
  posterEl.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
  cardDiv.appendChild(posterEl);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("card-body", "d-flex", "flex-column");
  cardDiv.appendChild(contentDiv);

  const titleEl = document.createElement("h5");
  titleEl.classList.add("card-title");
  titleEl.textContent = item.title;
  contentDiv.appendChild(titleEl);

  const releaseEl = document.createElement("p");
  releaseEl.classList.add("card-text");
  releaseEl.textContent = `Release date: ${item.release_date}`;
  contentDiv.appendChild(releaseEl);

  const ratingEl = document.createElement("p");
  ratingEl.classList.add("card-text");
  ratingEl.textContent = `Rating: ${item.vote_average}`;
  contentDiv.appendChild(ratingEl);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("d-grid", "gap-2", "col-12", "mx-auto", "mt-auto");
  contentDiv.appendChild(buttonDiv);

  const rentingEl = document.createElement("a");
  rentingEl.classList.add("liveToastBtn");
  rentingEl.classList.add("btn", "btn-primary", "mt-auto", "align-self-start");
  rentingEl.textContent = "Rent!";
  buttonDiv.appendChild(rentingEl);

  const detailEl = document.createElement("a");
  detailEl.classList.add("btn", "btn-primary", "mt-auto", "align-self-start");
  detailEl.textContent = "More Information";
  buttonDiv.appendChild(detailEl);

  rentingEl.addEventListener("click", () => {
    cartPushing(item);
    saveRentingCart(rentingCart);
    cartCheckoutDOM(rentingCart);
  });
  detailEl.addEventListener("click", () => {
    location.assign(`movie-details.html#${item.id}`);
  });

  return renderingDiv;
};

//Title sorting function (normal = a-z // reverse = z-a)
const titleSorting = (items, order = "normal") => {
  if (order === "normal") {
    items.sort((a, b) => {
      return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
    });
  }
  if (order === "reverse") {
    items.sort((a, b) => {
      return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
    });
  }
};

//10-0
const ratingSorting = (items) => {
  items.sort((a, b) => a.vote_average - b.vote_average).reverse();
};

//0-10
const reverseRatingSorting = (items) => {
  items.sort((a, b) => a.vote_average - b.vote_average);
};

//Sorting Choice Event Listener
document.querySelector("#movie-sorting").addEventListener("click", (e) => {
  let sortState = e.target.id.toLowerCase()
  if (sortState === "alphabetical") {
    getMovies().then((items) => {
      //alphabeticalSorting(movies)
      titleSorting(items, "normal");
      renderItems(items, filters);
    });
  } else if (sortState === "rating") {
    getMovies().then((items) => {
      ratingSorting(items);
      renderItems(items, filters);
    });
  } else if (sortState === "alphabetical-reverse") {
    getMovies().then((items) => {
      titleSorting(items, "reverse");
      renderItems(items, filters);
    });
  } else if (sortState === "rating-reverse") {
    getMovies().then((items) => {
      reverseRatingSorting(items);
      renderItems(items, filters);
    });
  }
});

//Filtering Movies
document.querySelector("#search-movies").addEventListener("input", (e) => {
  e.preventDefault();
  filters.searchText = e.target.value;
  movieRequest();
});



//Event listener for clearing cart
clearCartDOM();

//Previous Page in the API Call
document.querySelector("#previous-page").addEventListener("click", () => {
  moviePageNumber--;
  movieRequest();
});

//Next Page in the API Call
document.querySelector("#next-page").addEventListener("click", () => {
  moviePageNumber++;
  movieRequest();
});

