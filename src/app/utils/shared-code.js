

//Getting Renting Cart
const getRentingCart = () => {
  const rentingCartJSON = localStorage.getItem("renting-cart");
  if (rentingCartJSON !== null) {
    return JSON.parse(rentingCartJSON);
  } else {
    return [];
  }
};
let rentingCart = getRentingCart();

//Saving Renting Cart to Local Storage
const saveRentingCart = (cart) => {
  localStorage.setItem("renting-cart", JSON.stringify(cart));
};

//Cart Checkout
const cartCheckoutDOM = (cart) => {
  const cartEl = document.getElementById("current-cart"); //Renting Cart
  cartEl.textContent = `Checkout: (${cart.length})items`; //Renting Checkout Message
  if (!localStorage.getItem("renting-cart")) {
    cartEl.textContent = "Checkout: (0)items";
  }
};
cartCheckoutDOM(rentingCart);
//Adding new movies to the renting cart

//Event listener for clearing cart
const clearCartDOM = () => {
  document.querySelector("#clear-cart").addEventListener("click", () => {
    localStorage.removeItem("renting-cart");
    rentingCart = [];
    cartCheckoutDOM(rentingCart);
  });
};

clearCartDOM();
//Item Toast Alert renderer
const toastRenderer = (state) => {
  document.getElementById("toast-div").innerHTML = "";
  const bodyDiv = document.getElementById("toast-div");

  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("id", "container-div");
  containerDiv.classList.add(
    "toast-container",
    "position-fixed",
    "bottom-0",
    "end-0",
    "p-3",
  );
  bodyDiv.appendChild(containerDiv);

  const toastDiv = document.createElement("div");
  toastDiv.classList.add("toast");
  toastDiv.setAttribute("id", "liveToast");
  toastDiv.setAttribute('aria-live','assertive')
  toastDiv.setAttribute('aria-atomic','true')
  toastDiv.setAttribute("role", "alert");
  containerDiv.appendChild(toastDiv);
  

  const toastContentDiv = document.createElement('div')
  toastContentDiv.classList.add("toast-header");
  toastDiv.appendChild(toastContentDiv)

  const toastBodyEl = document.createElement("span");
  if (state === "adding") {
    toastBodyEl.textContent = "Item added to cart";
  }
  if (state === "added") {
    toastBodyEl.textContent = "Already in cart";
  }

  toastContentDiv.appendChild(toastBodyEl);

  const closingBtn = document.createElement("button");
  closingBtn.classList.add("btn-close","me-1","m-auto");
  closingBtn.setAttribute("id", "closing-button");
  closingBtn.setAttribute("type", "button");
  closingBtn.setAttribute("data-bs-dismiss", "toast");
  closingBtn.setAttribute('aria-label','close')
  toastContentDiv.appendChild(closingBtn);


  const toastLiveExample = document.getElementById("liveToast");
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
};
//Pushing item onto cart
const cartPushing = (movie) => {
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
    console.log("item already in cart");
  }
};


