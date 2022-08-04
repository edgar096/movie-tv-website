//import * as bootstrap from "bootstrap";
import { Toast } from "bootstrap";
//Website Filters
export const filters = {
  searchText: "",
};

//Getting Renting Cart
export const getRentingCart = () => {
  const rentingCartJSON = localStorage.getItem("renting-cart");
  if (rentingCartJSON !== null) {
    return JSON.parse(rentingCartJSON);
  } else {
    return [];
  }
};
export let rentingCart = getRentingCart();

//Saving Renting Cart to Local Storage
export const saveRentingCart = (cart) => {
  localStorage.setItem("renting-cart", JSON.stringify(cart));
};

//Cart Checkout (NO DEPENDENCY)
export const cartCheckoutDOM = (cart) => {
  const cartEl = document.getElementById("current-cart"); //Renting Cart
  cartEl.textContent = `Checkout: (${cart.length})items`; //Renting Checkout Message
  if (!localStorage.getItem("renting-cart")) {
    cartEl.textContent = "Checkout: (0)items";
  }
};
cartCheckoutDOM(rentingCart);
//Adding new movies to the renting cart

//Event listener for clearing cart (NO DEPENDENCY)
export const clearCartDOM = () => {
  document.querySelector("#clear-cart").addEventListener("click", () => {
    localStorage.removeItem("renting-cart");
    rentingCart = [];
    cartCheckoutDOM(rentingCart);
  });
};

clearCartDOM();

//Item Toast Alert renderer (NO DEPENDENCY)
export const toastRenderer = (state) => {
  document.getElementById("toast-div").innerHTML = "";
  const bodyDiv = document.getElementById("toast-div");

  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("id", "container-div");
  containerDiv.classList.add(
    "toast-container",
    "position-fixed",
    "bottom-0",
    "end-0",
    "p-3"
  );
  bodyDiv.appendChild(containerDiv);

  const toastDiv = document.createElement("div");
  toastDiv.classList.add("toast");
  toastDiv.setAttribute("id", "liveToast");
  toastDiv.setAttribute("aria-live", "assertive");
  toastDiv.setAttribute("aria-atomic", "true");
  toastDiv.setAttribute("role", "alert");
  containerDiv.appendChild(toastDiv);

  const toastContentDiv = document.createElement("div");
  toastContentDiv.classList.add("toast-header");
  toastDiv.appendChild(toastContentDiv);

  const toastBodyEl = document.createElement("span");
  if (state === "adding") {
    toastBodyEl.textContent = "Item added to cart";
  }
  if (state === "added") {
    toastBodyEl.textContent = "Already in cart";
  }

  toastContentDiv.appendChild(toastBodyEl);

  const closingBtn = document.createElement("button");
  closingBtn.classList.add("btn-close", "me-1", "m-auto");
  closingBtn.setAttribute("id", "closing-button");
  closingBtn.setAttribute("type", "button");
  closingBtn.setAttribute("data-bs-dismiss", "toast");
  closingBtn.setAttribute("aria-label", "close");
  toastContentDiv.appendChild(closingBtn);

  const toastLiveExample = document.getElementById("liveToast");
  const toast = new Toast(toastLiveExample);
  toast.show();
};
//Pushing item onto cart (NO DEPENDENCY)
export const cartPushing = (movie) => {
  const id = movie.id;
  const idCheck = rentingCart.some((movie) => {
    return movie.id === id;
  });
  if (!idCheck) {
    toastRenderer("adding");
    rentingCart.push({
      id: movie.id,
      title: movie.title,
      value: 5,
    });
  }
  if (idCheck) {
    toastRenderer("added");
  }
};

export const domCard = (item, type) => {
  const wrapperDiv = document.getElementById("wrapper-div");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "mb-3");
  cardDiv.setAttribute("id", "card-div");
  wrapperDiv.appendChild(cardDiv);

  const cardDivWrapper = document.createElement("div");
  cardDivWrapper.classList.add("row", "g-0");
  cardDiv.appendChild(cardDivWrapper);

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("col-md-4");
  cardDivWrapper.appendChild(imgDiv);

  const imgEl = document.createElement("img");
  imgEl.classList.add("img-fluid", "rounded", "mx-auto");
  imgEl.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
  imgDiv.appendChild(imgEl);

  const cardBodyWrapper = document.createElement("div");
  cardBodyWrapper.classList.add("col-md-8", "my-auto");
  cardDivWrapper.appendChild(cardBodyWrapper);

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");
  cardBodyWrapper.appendChild(cardBodyDiv);

  const cardTitleEl = document.createElement("h1");
  cardTitleEl.classList.add("card-tile");
  if (type == "movie") {
    cardTitleEl.textContent = item.title;
  } else {
    cardTitleEl.textContent = item.name;
  }
  cardBodyDiv.appendChild(cardTitleEl);

  const cardDetails = document.createElement("p");
  cardDetails.classList.add("card-text");
  cardDetails.textContent = item.overview;
  cardBodyDiv.appendChild(cardDetails);

  if (type == "movie") {
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "text-muted", "d-grid", "gap-2");
    cardDivWrapper.appendChild(cardFooter);

    const rentingEl = document.createElement("button");
    rentingEl.classList.add(
      "btn",
      "btn-block",
      "btn-primary",
      "align-self-start"
    );
    rentingEl.textContent = "Rent!";
    cardFooter.appendChild(rentingEl);

    rentingEl.addEventListener("click", () => {
      //Renting Cart
      cartPushing(item);
      saveRentingCart(rentingCart);
      cartCheckoutDOM(rentingCart);
    });
  }
  return wrapperDiv;
};

export const clearCart = () => {
  document.querySelector("#clear-cart").addEventListener("click", () => {
    localStorage.removeItem("renting-cart");
    rentingCart = [];
    cartCheckoutDOM(rentingCart);
  });
};

export const renderItemDOM = (item, type) => {
  const renderingDiv = document.getElementById("item-div");

  const elementDiv = document.createElement("div");
  elementDiv.classList.add("col", "d-flex", "align-items-stretch", "mt-3");
  renderingDiv.appendChild(elementDiv);

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.setAttribute("style", "width: 18rem");
  elementDiv.appendChild(cardDiv);

  //Card Elements
  const posterEl = document.createElement("IMG");
  posterEl.setAttribute("id", "poster");
  posterEl.classList.add("card-img-top");
  posterEl.src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
  cardDiv.appendChild(posterEl);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("card-body", "d-flex", "flex-column");
  cardDiv.appendChild(contentDiv);

  const titleEl = document.createElement("h5");
  titleEl.classList.add("card-title");

  contentDiv.appendChild(titleEl);

  const releaseEl = document.createElement("p");
  releaseEl.classList.add("card-text");
  contentDiv.appendChild(releaseEl);

  if (type == "movie") {
    titleEl.textContent = item.title;
    releaseEl.textContent = `Release date: ${item.release_date}`;
  } else if (type === "show") {
    titleEl.textContent = item.name;
    releaseEl.textContent = `First Aired: ${item.first_air_date}`;
  }

  const ratingEl = document.createElement("p");
  ratingEl.classList.add("card-text");
  ratingEl.textContent = `Rating: ${item.vote_average}`;
  contentDiv.appendChild(ratingEl);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("d-grid", "gap-2", "col-12", "mx-auto", "mt-auto");
  contentDiv.appendChild(buttonDiv);

  const detailEl = document.createElement("a");
  detailEl.classList.add("btn", "btn-primary", "mt-auto", "align-self-start");
  detailEl.textContent = "More Information";
  buttonDiv.appendChild(detailEl);

  if (type == "movie") {
    const rentingEl = document.createElement("a");
    rentingEl.classList.add("liveToastBtn");
    rentingEl.classList.add(
      "btn",
      "btn-primary",
      "mt-auto",
      "align-self-start"
    );
    rentingEl.textContent = "Rent!";
    buttonDiv.appendChild(rentingEl);
    rentingEl.addEventListener("click", () => {
      cartPushing(item);
      saveRentingCart(rentingCart);
      cartCheckoutDOM(rentingCart);
    });
    detailEl.addEventListener("click", () => {
      location.assign(`movie-details.html#${item.id}`);
    });
  } else if (type === "show") {
    detailEl.addEventListener("click", () => {
      location.assign(`tv-shows-details.html#${item.id}`);
    });
  }
  return renderingDiv;
};

//10-0
export const ratingSorting = (items) => {
  items.sort((a, b) => a.vote_average - b.vote_average).reverse();
};

//0-10
export const reverseRatingSorting = (items) => {
  items.sort((a, b) => a.vote_average - b.vote_average);
};
