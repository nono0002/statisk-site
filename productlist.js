const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const container = document.querySelector(".produkt_liste");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    let markup = "";

    data.forEach((product) => {
      markup += `
        <article class="produkt_kort">
          <a href="productdetails.html?id=${product.id}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp">
            <h2>${product.productdisplayname}</h2>
          </a>
          <p>${product.price} kr</p>
        </article>
      `;
    });

    container.innerHTML = markup;
  });
