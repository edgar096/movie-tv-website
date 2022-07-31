// Rendering Function
const renderItems = (items, filters) => {
  const filteredItems = items.filter((item) => {
    return item.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.getElementById("item-div").innerHTML = "";

  filteredItems.forEach((item) => {
    //Run the DOM Generating Function for each item in the API response
    renderItemDOM(item, "movie");
  });
};

//Movie API Request
const movieRequest = () => {
  getMovies().then((items) => {
    renderItems(items, filters);
  });
};
movieRequest();

//Sorting Choice Event Listener
document.querySelector("#item-sorting").addEventListener("click", (e) => {
  let sortState = e.target.id.toLowerCase();
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
